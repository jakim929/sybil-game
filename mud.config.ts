import { mudConfig } from '@latticexyz/world/register'

export default mudConfig({
  tables: {
    RoundIndex: {
      keySchema: {},
      valueSchema: 'uint32',
    },
    Rounds: {
      keySchema: {
        roundIndex: 'uint32',
      },
      valueSchema: {
        roundState: 'RoundStateType',
        deadline: 'uint256',
        question: 'string',
        answer: 'string',
      },
    },
    Players: {
      keySchema: {
        roundIndex: 'uint32',
        player: 'address',
      },
      valueSchema: {
        isRegistered: 'bool',
      },
    },
    PlayersCount: {
      keySchema: {
        roundIndex: 'uint32',
      },
      valueSchema: {
        playerCount: 'uint256',
      },
    },
    Commitments: {
      keySchema: {
        roundIndex: 'uint32',
        player: 'address',
      },
      valueSchema: {
        commitment: 'bytes32',
      },
    },
    GameState: {
      keySchema: {},
      valueSchema: {
        gameState: 'GameStateType',
      },
    },
    Owner: {
      keySchema: {},
      valueSchema: 'address',
    },
    CommitDuration: {
      keySchema: {},
      valueSchema: 'uint256',
    },
    RevealDuration: {
      keySchema: {},
      valueSchema: 'uint256',
    },
    RoundCount: {
      keySchema: {},
      valueSchema: 'uint32',
    },
  },
  enums: {
    RoundStateType: ['COMMIT', 'REVEAL'],
    GameStateType: ['NOT_STARTED', 'IN_PROGRESS', 'FINISHED'],
  },
})
