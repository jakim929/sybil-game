export const SybilGameLauncherAbi = [
  {
    inputs: [
      {
        internalType: 'contract IWorldID',
        name: '_worldId',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'currentGame',
    outputs: [
      {
        internalType: 'contract SybilGame',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_appId',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_actionId',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_numRounds',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_commitDuration',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_revealDuration',
        type: 'uint256',
      },
    ],
    name: 'launchGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const
