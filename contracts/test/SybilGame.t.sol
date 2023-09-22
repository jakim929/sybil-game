// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/SybilGame.sol";

contract SybilGameTest is Test {

    event PlayerRegisteredForRound(uint256 round, address indexed playerAddress);

        enum GameState { NotStarted, InProgress, Completed }

    enum RoundState { Commit, Reveal }
    
    SybilGame public sybilGame;
    IWorldID public worldId;
    address public owner;

    address internal bob;
    address internal sally;

    string public appId = 'hello';
    string public actionId = 'signup_round_0';

    function setUp() public {
        owner = makeAddr('owner');
        bob = makeAddr("bob");
        sally = makeAddr("sally");
        worldId = IWorldID(0xf8BFFC733Ba2abd4b17f01e18cBdDF560d830864);
        sybilGame = new SybilGame(owner, worldId, appId, actionId, 2);
    }

    function _signUpUser(address user) internal {
        vm.prank(user);
        uint256[8] memory proof = [uint256(0),0,0,0,0,0,0,0];
        uint256 preSignupRegisteredUsersCount = sybilGame.roundRegisteredPlayersCount(0);
        // just using it as nullifier hash for now
        vm.mockCall(address(worldId), abi.encodeWithSelector(IWorldID.verifyProof.selector), abi.encode(true));

        emit PlayerRegisteredForRound(0, user);

        sybilGame.signUp(user, 0, preSignupRegisteredUsersCount, proof);
        assertEq(sybilGame.roundRegisteredPlayersCount(0), preSignupRegisteredUsersCount + 1);
        assertEq(sybilGame.roundRegisteredPlayers(0, user), true);

    }

    function test_signUp_happyPath_succeeds() external {
        vm.mockCall(address(worldId), abi.encodeWithSelector(IWorldID.verifyProof.selector), abi.encode(true));

        uint256[8] memory proof = [uint256(0),0,0,0,0,0,0,0];

        vm.prank(bob);

        vm.expectEmit(true, true, false, false);
        emit PlayerRegisteredForRound(0, bob);
        
        sybilGame.signUp(address(bob), 0, 213, proof);
        assertEq(sybilGame.roundRegisteredPlayers(0, bob), true);
        assertEq(sybilGame.roundRegisteredPlayersCount(0), 1);
    }

    function test_signUp_withoutValidWorldId_reverts() external {
        vm.mockCallRevert(address(worldId), abi.encodeWithSelector(IWorldID.verifyProof.selector), abi.encode("REVERT_MESSAGE"));

        uint256[8] memory proof = [uint256(0),0,0,0,0,0,0,0];

        vm.prank(bob);
        vm.expectRevert();
        sybilGame.signUp(address(0), 0, 0, proof);
    }



    function test_signUp_signingUpTwice_reverts() external {
        vm.mockCall(address(worldId), abi.encodeWithSelector(IWorldID.verifyProof.selector), abi.encode(true));

        uint256[8] memory proof = [uint256(0),0,0,0,0,0,0,0];

        vm.prank(bob);

        vm.expectEmit(true, true, false, false);
        emit PlayerRegisteredForRound(0, bob);

        sybilGame.signUp(address(bob), 0, 213, proof);
        assertEq(sybilGame.roundRegisteredPlayers(0, bob), true);

        vm.expectRevert("SybilGame: Already registered");
        sybilGame.signUp(address(bob), 0, 213, proof);
    }



    // kinda meaningless because the nullifier hash is globally unique
    function test_signUp_usingSameNullifierHash_reverts() external {
        vm.mockCall(address(worldId), abi.encodeWithSelector(IWorldID.verifyProof.selector), abi.encode(true));

        uint256[8] memory proof = [uint256(0),0,0,0,0,0,0,0];

        vm.prank(bob);

        vm.expectEmit(true, true, false, false);
        emit PlayerRegisteredForRound(0, bob);

        sybilGame.signUp(address(bob), 0, 213, proof);
        assertEq(sybilGame.roundRegisteredPlayers(0, bob), true);

        vm.expectRevert("SybilGame: Invalid nullifier");
        sybilGame.signUp(address(sally), 0, 213, proof);
    }

    function test_progressToNextRound_happyPath_succeeds() external {
        // Assuming we start with a game that's not started
        vm.prank(owner);

        string memory questionVal = "What's the capital of France?";
        sybilGame.progressToNextRound(questionVal);

        assertEq(uint256(sybilGame.gameState()), uint256(SybilGame.GameState.InProgress));

        (SybilGame.RoundState state, uint256 deadline, string memory question, string memory answer) = sybilGame.rounds(0);

        assertEq(uint256(state), uint256(SybilGame.RoundState.Commit));
        assertEq(question, questionVal);
    }

    // don't have time to write unit tests
    function test_generalFlow_succeeds() external {
        _signUpUser(bob);
        _signUpUser(sally);

// Round 0
        vm.prank(owner);
        string memory questionVal = "What's the capital of France?";
        sybilGame.progressToNextRound(questionVal);

        assertEq(uint256(sybilGame.gameState()), uint256(SybilGame.GameState.InProgress));

        (SybilGame.RoundState state, uint256 deadline, string memory question, string memory answer) = sybilGame.rounds(0);

        assertEq(uint256(state), uint256(SybilGame.RoundState.Commit));
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
        assertEq(sybilGame.currentRoundIndex(), 0);

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
        assertEq(uint256(sybilGame.gameState()), uint256(SybilGame.GameState.InProgress));
        assertEq(sybilGame.currentRoundIndex(), 1);

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

        assertEq(uint256(sybilGame.gameState()), uint256(SybilGame.GameState.Completed));

    }

}
