// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { ByteHasher } from "./helpers/ByteHasher.sol";
import { IWorldID } from "./interfaces/IWorldID.sol";

import { Owned } from "solmate/auth/Owned.sol";

import { SybilGame } from "./SybilGame.sol";

contract SybilGameLauncher is Owned{
  IWorldID internal immutable worldId;

  SybilGame public currentGame;

  constructor(address _owner, IWorldID _worldId) Owned(_owner){
    worldId = _worldId;
  }

  function launchGame(string memory _appId, string memory _actionId, uint32 _numRounds, uint256 _commitDuration, uint256 _revealDuration) public onlyOwner {
    currentGame = new SybilGame(msg.sender, worldId, _appId, _actionId, _numRounds, _commitDuration, _revealDuration);
  }
}
