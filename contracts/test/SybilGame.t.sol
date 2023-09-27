// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/SybilGame.sol";

import { GameStateType, RoundStateType } from  "../src/codegen/common.sol";

import { IStore } from "@latticexyz/store/src/IStore.sol";


import { Players, PlayersCount, RoundIndex, GameState, Rounds, CommitDuration, RevealDuration, RoundCount, Commitments } from "../src/codegen/index.sol";

contract SybilGameTest is Test {

    event PlayerRegisteredForRound(uint256 round, address indexed playerAddress);

    SybilGame public sybilGame;
    IWorldID public worldId;
    address public owner;

    IStore public store;

    address internal bob;
    address internal sally;

    string public appId = 'hello';
    string public actionId = 'signup_round_0';

 function setUp() public {
    owner = makeAddr('owner');
    bob = makeAddr("bob");
    sally = makeAddr("sally");
    worldId = IWorldID(0xf8BFFC733Ba2abd4b17f01e18cBdDF560d830864);
    sybilGame = new SybilGame(owner, worldId, appId, actionId, 2, 1 minutes, 1 minutes);
    store = IStore(address(sybilGame));
  }


  function _signUpUser(address user) internal {
      vm.prank(user);

      uint256 preSignupRegisteredUsersCount = PlayersCount.getPlayerCount(store, 0);
      
        uint256[8] memory proof = [uint256(0),0,0,0,0,0,0,0];
        // just using it as nullifier hash for now
        vm.mockCall(address(worldId), abi.encodeWithSelector(IWorldID.verifyProof.selector), abi.encode(true));

      sybilGame.signUp(user, 0, preSignupRegisteredUsersCount, proof);

      uint256 postSignupRegisteredUsersCount = PlayersCount.getPlayerCount(store, 0);

      bool userRegistrationStatus = Players.getIsRegistered(store, 0, user);

      assertEq(postSignupRegisteredUsersCount, preSignupRegisteredUsersCount + 1);
      assertEq(userRegistrationStatus, true);

  }


  function test_signUp_happyPath_succeeds() public {
    _signUpUser(bob);
  }
  
  function test_signUp_signingUpTwice_reverts() external {
    _signUpUser(bob);

    vm.prank(bob);
    vm.expectRevert("SybilGame: Already registered");

      uint256[8] memory proof = [uint256(0),0,0,0,0,0,0,0];
        // just using it as nullifier hash for now
        vm.mockCall(address(worldId), abi.encodeWithSelector(IWorldID.verifyProof.selector), abi.encode(true));

      sybilGame.signUp(bob, 0, 213, proof);
  }


  function test_startGame_happyPath_succeeds() external {
    // Assuming we start with a game that's not started
    vm.prank(owner);

    string memory questionVal = "What's the capital of France?";
    sybilGame.startGame(questionVal);

    assertEq(uint256(GameState.get(store)), uint256(GameStateType.IN_PROGRESS));

    RoundStateType state = Rounds.getRoundState(store, 0);
    string memory question = Rounds.getQuestion(store, 0);

    assertEq(uint256(state), uint256(RoundStateType.COMMIT));
    assertEq(question, questionVal);
  }

  // don't have time to write unit tests
  function test_generalFlow_succeeds() external {
      _signUpUser(bob);
      _signUpUser(sally);

// Round 0
      vm.prank(owner);
      string memory questionVal = "What's the capital of France?";
      sybilGame.startGame(questionVal);

      assertEq(uint256(GameState.get(store)), uint256(GameStateType.IN_PROGRESS));

      uint32 currentRoundIndex = RoundIndex.get(store);

      RoundStateType state = Rounds.getRoundState(store, currentRoundIndex);
      string memory question = Rounds.getQuestion(store, currentRoundIndex);

      assertEq(uint256(state), uint256(RoundStateType.COMMIT));
      assertEq(question, questionVal);

      vm.prank(bob);
      string memory bobAnswer = "Paris";
      bytes32  bobNonce = 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef;
      sybilGame.commitAnswer(keccak256(abi.encode(bobAnswer, bobNonce)));

      vm.prank(sally);
      string memory sallyAnswer = "Beijing";
      bytes32  sallyNonce = 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcde1;
      sybilGame.commitAnswer(keccak256(abi.encode(sallyAnswer, sallyNonce)));

      vm.warp(5 minutes + block.timestamp + 1);

      vm.prank(owner);
      sybilGame.progressRoundToRevealStage("Paris");

      uint32 currentRoundIndex2 = RoundIndex.get(store);

      assertEq(currentRoundIndex2, 0);

      vm.prank(bob);
      vm.expectRevert();
      sybilGame.revealAnswer(bobAnswer, sallyNonce);

      vm.prank(bob);
      sybilGame.revealAnswer(bobAnswer, bobNonce);

      vm.prank(sally);
      vm.expectRevert();
      sybilGame.revealAnswer(sallyAnswer, sallyNonce);

      vm.warp(5 minutes + block.timestamp + 1);


// Round 1
      vm.prank(owner);
      sybilGame.progressToNextRound("Where is EthNYC located?");
      assertEq(uint256(GameState.get(store)), uint256(GameStateType.IN_PROGRESS));
      assertEq(RoundIndex.get(store), 1);

      vm.prank(bob);
      string memory bobRound2Answer = "New York";
      bytes32  bobRound2Nonce = 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef;
      sybilGame.commitAnswer(keccak256(abi.encode(bobRound2Answer, bobRound2Nonce)));


      vm.prank(sally);
      string memory sallyRound2Answer = "Beijing";
      bytes32  sallyRound2Nonce = 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcde1;
      vm.expectRevert();
      sybilGame.commitAnswer(keccak256(abi.encode(sallyRound2Answer, sallyRound2Nonce)));


      vm.warp(5 minutes + block.timestamp + 1);
      vm.prank(owner);
      sybilGame.progressRoundToRevealStage("New York");

      vm.prank(bob);
      vm.expectRevert();
      sybilGame.revealAnswer(bobAnswer, sallyNonce);

      vm.prank(bob);
      sybilGame.revealAnswer(bobRound2Answer, bobRound2Nonce);


      vm.warp(5 minutes + block.timestamp + 1);
      vm.prank(owner);
      sybilGame.progressToNextRound("");

      assertEq(uint256(GameState.get(store)), uint256(GameStateType.FINISHED));
  }
}
