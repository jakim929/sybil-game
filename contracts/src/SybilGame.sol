// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { ByteHasher } from "./helpers/ByteHasher.sol";
import { IWorldID } from "./interfaces/IWorldID.sol";
import { StoreRead } from "@latticexyz/store/src/StoreRead.sol";
import { StoreCore } from "@latticexyz/store/src/StoreCore.sol";
import { Players, PlayersCount, RoundIndex, GameState, Rounds, CommitDuration, RevealDuration, RoundCount, Commitments } from "./codegen/index.sol";
import { GameStateType, RoundStateType } from  "./codegen/common.sol";

import { Owned } from "solmate/auth/Owned.sol";

contract SybilGame is Owned, StoreRead {
    using ByteHasher for bytes;
    

    // struct Round {
    //     RoundState state;
    //     uint256 deadline;
    //     string question;
    //     string answer;
    // }
    
    // enum GameState { NotStarted, InProgress, Completed }
    // enum RoundState { Commit, Reveal }


    // uint256 immutable public commitDuration;
    // uint256 immutable public revealDuration;


    // event PlayerRegisteredForRound(uint256 round, address indexed playerAddress);

    // /// @dev The World ID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;

    // /// @dev The contract's external nullifier hash
    uint256 internal immutable externalNullifier;

    // /// @dev The World ID group ID (always 1)
    uint256 internal immutable groupId = 1;

    // /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    mapping(uint256 => bool) internal nullifierHashes;

    // uint256 immutable numRounds;

    // GameState public gameState = GameState.NotStarted;

    // uint256 public currentRoundIndex;
    // mapping(uint256 => Round) public rounds;

    string public appId;
    string public actionId;


    // mapping(uint256 => mapping (address => bool)) public roundRegisteredPlayers;
    // mapping(uint256 => uint256) public roundRegisteredPlayersCount;

    // mapping(uint256 => mapping (address => bytes32)) public roundPlayerCommitments;


    /// @param _owner Owner address
    /// @param _worldId The WorldID instance that will verify the proofs
    /// @param _appId The World ID app ID
    /// @param _actionId The World ID action ID
    constructor(
        address _owner,
        IWorldID _worldId,
        string memory _appId,
        string memory _actionId,
        uint32 _numRounds,
        uint256 _commitDuration,
        uint256 _revealDuration
    ) Owned(_owner) {
        StoreCore.initialize();
        StoreCore.registerCoreTables();


        worldId = _worldId;
        appId = _appId;
        actionId = _actionId;
        externalNullifier = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();

        RoundIndex.register();

        Rounds.register();

        Players.register();

        PlayersCount.register();

        Commitments.register();

        GameState.register();

        CommitDuration.register();

        RevealDuration.register();

        RoundCount.register();


        RoundCount.set(_numRounds);
        CommitDuration.set(_commitDuration);
        RevealDuration.set(_revealDuration);
    }

    function signUp(
        address playerAddress,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external requireGameState(GameStateType.NOT_STARTED) {


    require(Players.get(0, playerAddress) == false, "SybilGame: Already registered");

        _verifyPlayerUniqueness(playerAddress, root, nullifierHash, proof);

        _registerPlayerForRound(playerAddress, 0);
    }

  function startGame(string memory question) external onlyOwner requireGameState(GameStateType.NOT_STARTED) {
    _startGame(question);
  }

 function progressToNextRound(string memory question) external onlyOwner requireGameState(GameStateType.IN_PROGRESS) requireRoundState(RoundStateType.REVEAL) {
    uint32 currentRoundIndex = RoundIndex.get();

    uint256 deadline = Rounds.getDeadline(currentRoundIndex);

    require(block.timestamp > deadline, "SybilGame: Previous stage is still active");

    if (currentRoundIndex == RoundCount.get() - 1) {
        _endGame();
        return;
    }

    RoundIndex.set(currentRoundIndex + 1);
    _setupNewRound(question);
}
    
  function progressRoundToRevealStage(string memory answer) external onlyOwner requireGameState(GameStateType.IN_PROGRESS) requireRoundState(RoundStateType.COMMIT) {
    uint32 currentRoundIndex = RoundIndex.get();
    uint256 deadline = Rounds.getDeadline(currentRoundIndex);

    require(block.timestamp > deadline, "SybilGame: Commit stage is still active");

    Rounds.setRoundState(currentRoundIndex, RoundStateType.REVEAL);
    Rounds.setDeadline(currentRoundIndex, block.timestamp + RevealDuration.get());  // Set deadline for reveal
    Rounds.setAnswer(currentRoundIndex, answer);
  }


  function commitAnswer(bytes32 _commitment) external requireGameState(GameStateType.IN_PROGRESS) requireRoundState(RoundStateType.COMMIT) {
      uint32 currentRoundIndex = RoundIndex.get();
      RoundStateType roundState = Rounds.getRoundState(currentRoundIndex);
      uint256 deadline = Rounds.getDeadline(currentRoundIndex);

      require(Players.getIsRegistered(currentRoundIndex, msg.sender) == true, "SybilGame: Not registered for round");
      require(roundState == RoundStateType.COMMIT, "SybilGame: Needs to be in commit stage to progress");
      require(block.timestamp < deadline, "SybilGame: Commit stage is over");
      
      Commitments.set(currentRoundIndex, msg.sender, _commitment);
  }


  function revealAnswer(string memory _answer, bytes32 _nonce) external requireGameState(GameStateType.IN_PROGRESS) requireRoundState(RoundStateType.REVEAL) {
    uint32 currentRoundIndex = RoundIndex.get();
    uint256 deadline = Rounds.getDeadline(currentRoundIndex);
    string memory answer = Rounds.getAnswer(currentRoundIndex);
    bytes32 existingCommitment = Commitments.getCommitment(currentRoundIndex, msg.sender);

    require(Players.getIsRegistered(currentRoundIndex, msg.sender) == true, "SybilGame: Not registered for round");
    require(block.timestamp < deadline, "SybilGame: Reveal stage is over");
    require(keccak256(abi.encode(_answer)) == keccak256(abi.encode(answer)), "SybilGame: Invalid answer");

    bytes32 commitment = keccak256(abi.encode(_answer, _nonce));
    require(commitment == existingCommitment, "SybilGame: No matching commitment");

    _registerPlayerForRound(msg.sender, currentRoundIndex + 1);
  }



  function _startGame(string memory _question) internal {
    GameState.set(GameStateType.IN_PROGRESS);
    _setupNewRound(_question);
  }

  function _endGame() internal {
      GameState.set(GameStateType.FINISHED);
  }

  function _setupNewRound(string memory _question) internal {
      Rounds.set(RoundIndex.get(), RoundStateType.COMMIT, block.timestamp + CommitDuration.get(), _question, "");
  }


  function _registerPlayerForRound(address playerAddress, uint32 round) internal {
    Players.set(round, playerAddress, true);
    PlayersCount.set(round, PlayersCount.get(round) + 1);
  }


    /// @param playerAddress user's wallet address (check README for further details)
    /// @param root The root of the Merkle tree (returned by the JS widget).
    /// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
    /// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
    function _verifyPlayerUniqueness(
        address playerAddress,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) internal {
        // First, we make sure this person hasn't done this before
        require(nullifierHashes[nullifierHash] == false, "SybilGame: Invalid nullifier");

        // We now verify the provided proof is valid and the user is verified by World ID
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(playerAddress).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        );

        // We now record the user has done this, so they can't do it again (proof of uniqueness)
        nullifierHashes[nullifierHash] = true;
    }

    modifier requireGameState(GameStateType _gameState) virtual {
        require(GameState.get() == _gameState, "SybilGame: Incorrect game state");
        _;
    }

    modifier requireRoundState(RoundStateType _roundState) virtual {
        uint32 currentRoundIndex = RoundIndex.get();
        require(Rounds.getRoundState(currentRoundIndex) == _roundState, "SybilGame: Incorrect round state");
        _;
    }
}
