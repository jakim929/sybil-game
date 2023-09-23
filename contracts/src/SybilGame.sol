// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { ByteHasher } from "./helpers/ByteHasher.sol";
import { IWorldID } from "./interfaces/IWorldID.sol";

import { Owned } from "solmate/auth/Owned.sol";

contract SybilGame is Owned {
    using ByteHasher for bytes;
    

    struct Round {
        RoundState state;
        uint256 deadline;
        string question;
        string answer;
    }
    
    enum GameState { NotStarted, InProgress, Completed }
    enum RoundState { Commit, Reveal }


    uint256 constant public COMMIT_DURATION = 30 seconds;
    uint256 constant public REVEAL_DURATION = 30 seconds;


    event PlayerRegisteredForRound(uint256 round, address indexed playerAddress);

    /// @dev The World ID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;

    /// @dev The contract's external nullifier hash
    uint256 internal immutable externalNullifier;

    /// @dev The World ID group ID (always 1)
    uint256 internal immutable groupId = 1;

    /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    mapping(uint256 => bool) internal nullifierHashes;

    uint256 immutable numRounds;

    GameState public gameState = GameState.NotStarted;

    uint256 public currentRoundIndex;
    mapping(uint256 => Round) public rounds;

    string public appId;
    string public actionId;


    mapping(uint256 => mapping (address => bool)) public roundRegisteredPlayers;
    mapping(uint256 => uint256) public roundRegisteredPlayersCount;

    mapping(uint256 => mapping (address => bytes32)) public roundPlayerCommitments;

    /// @param _owner Owner address
    /// @param _worldId The WorldID instance that will verify the proofs
    /// @param _appId The World ID app ID
    /// @param _actionId The World ID action ID
    constructor(
        address _owner,
        IWorldID _worldId,
        string memory _appId,
        string memory _actionId,
        uint256 _numRounds
    ) Owned(_owner) {
        worldId = _worldId;
        appId = _appId;
        actionId = _actionId;
        externalNullifier = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();
        numRounds = _numRounds;
    }

    function signUp(
        address playerAddress,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external {
        require(currentRoundIndex == 0 && gameState == GameState.NotStarted, "SybilGame: Game already started");
        require(roundRegisteredPlayers[0][playerAddress] == false, "SybilGame: Already registered");

        _verifyPlayerUniqueness(playerAddress, root, nullifierHash, proof);

        _registerPlayerForRound(playerAddress, 0);


    }

    function progressToNextRound(string memory question) external onlyOwner {
        require(rounds[currentRoundIndex].state == RoundState.Reveal || gameState == GameState.NotStarted, "SybilGame: Needs to be in reveal stage or not started to progress");

        if (gameState == GameState.NotStarted) {
            _startGame(question);
            return;
        }

        require(block.timestamp > rounds[currentRoundIndex].deadline, "SybilGame: Previous stage is still active");

        if (currentRoundIndex == numRounds - 1) {
            _endGame();
            return;
        }

        currentRoundIndex++;
        _setupNewRound(question);

    }
    
    function progressRoundToRevealStage(string memory answer) external onlyOwner {
        require(rounds[currentRoundIndex].state == RoundState.Commit, "SybilGame: Needs to be in commit stage to progress");
        require(block.timestamp > rounds[currentRoundIndex].deadline, "SybilGame: Commit stage is still active");

        rounds[currentRoundIndex].state = RoundState.Reveal;
        rounds[currentRoundIndex].deadline = block.timestamp + REVEAL_DURATION;  // Set deadline for reveal
        rounds[currentRoundIndex].answer = answer;
    }

    function commitAnswer(bytes32 _commitment) external {
        require(rounds[currentRoundIndex].state == RoundState.Commit, "SybilGame: Needs to be in commit stage");
        require(roundRegisteredPlayers[currentRoundIndex][msg.sender] == true, "SybilGame: Not registered for round");
        require(block.timestamp < rounds[currentRoundIndex].deadline, "SybilGame: Commit stage is over");
        
        roundPlayerCommitments[currentRoundIndex][msg.sender] = _commitment;
    }

    function revealAnswer(string memory _answer, bytes32 _nonce) external {
        require(rounds[currentRoundIndex].state == RoundState.Reveal, "SybilGame: Needs to be in reveal stage");
        require(roundRegisteredPlayers[currentRoundIndex][msg.sender] == true, "SybilGame: Not registered for round");
        require(block.timestamp < rounds[currentRoundIndex].deadline, "SybilGame: Reveal stage is over");
        require(keccak256(abi.encode(_answer)) == keccak256(abi.encode(rounds[currentRoundIndex].answer)), "SybilGame: Invalid answer");

        bytes32 commitment = keccak256(abi.encode(_answer, _nonce));
        require(commitment == roundPlayerCommitments[currentRoundIndex][msg.sender], "SybilGame: No matching commitment");

        _registerPlayerForRound(msg.sender, currentRoundIndex + 1);
    }

    function currentRound() public view returns (Round memory) {
        return rounds[currentRoundIndex];
    }


    function _startGame(string memory question) internal {
        gameState = GameState.InProgress;
        _setupNewRound(question);
    }

    function _endGame() internal {
        gameState = GameState.Completed;
    }

    function _setupNewRound(string memory question) internal {
        rounds[currentRoundIndex].state = RoundState.Commit;
        rounds[currentRoundIndex].deadline = block.timestamp + COMMIT_DURATION;  // Set deadline for commit
        rounds[currentRoundIndex].question = question;
    }

    function _registerPlayerForRound(address playerAddress, uint256 round) internal {
        roundRegisteredPlayers[round][playerAddress] = true;
        roundRegisteredPlayersCount[round]++;

        emit PlayerRegisteredForRound(round, playerAddress);
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
}
