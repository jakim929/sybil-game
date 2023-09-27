export const SybilGameAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
      {
        internalType: 'contract IWorldID',
        name: '_worldId',
        type: 'address',
      },
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
        internalType: 'uint32',
        name: '_numRounds',
        type: 'uint32',
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
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'length',
        type: 'uint256',
      },
    ],
    name: 'FieldLayoutLib_InvalidLength',
    type: 'error',
  },
  {
    inputs: [],
    name: 'FieldLayoutLib_StaticLengthDoesNotFitInAWord',
    type: 'error',
  },
  {
    inputs: [],
    name: 'FieldLayoutLib_StaticLengthIsZero',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'length',
        type: 'uint256',
      },
    ],
    name: 'PackedCounter_InvalidLength',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'length',
        type: 'uint256',
      },
    ],
    name: 'SchemaLib_InvalidLength',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SchemaLib_StaticTypeAfterDynamicType',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'end',
        type: 'uint256',
      },
    ],
    name: 'Slice_OutOfBounds',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'length',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'accessedIndex',
        type: 'uint256',
      },
    ],
    name: 'Store_IndexOutOfBounds',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'expected',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'received',
        type: 'uint256',
      },
    ],
    name: 'Store_InvalidFieldNamesLength',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'expected',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'received',
        type: 'uint256',
      },
    ],
    name: 'Store_InvalidKeyNamesLength',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes2',
        name: 'expected',
        type: 'bytes2',
      },
      {
        internalType: 'ResourceId',
        name: 'resourceId',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'resourceIdString',
        type: 'string',
      },
    ],
    name: 'Store_InvalidResourceType',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint40',
        name: 'startWithinField',
        type: 'uint40',
      },
      {
        internalType: 'uint40',
        name: 'deleteCount',
        type: 'uint40',
      },
      {
        internalType: 'uint40',
        name: 'fieldLength',
        type: 'uint40',
      },
    ],
    name: 'Store_InvalidSplice',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'expected',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'received',
        type: 'uint256',
      },
    ],
    name: 'Store_InvalidValueSchemaLength',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'ResourceId',
        name: 'tableId',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'tableIdString',
        type: 'string',
      },
    ],
    name: 'Store_TableAlreadyExists',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'ResourceId',
        name: 'tableId',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'tableIdString',
        type: 'string',
      },
    ],
    name: 'Store_TableNotFound',
    type: 'error',
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'ResourceId',
        name: 'tableId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32[]',
        name: 'keyTuple',
        type: 'bytes32[]',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'staticData',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'PackedCounter',
        name: 'encodedLengths',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'dynamicData',
        type: 'bytes',
      },
    ],
    name: 'Store_SetRecord',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'ResourceId',
        name: 'tableId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32[]',
        name: 'keyTuple',
        type: 'bytes32[]',
      },
      {
        indexed: false,
        internalType: 'uint48',
        name: 'start',
        type: 'uint48',
      },
      {
        indexed: false,
        internalType: 'uint40',
        name: 'deleteCount',
        type: 'uint40',
      },
      {
        indexed: false,
        internalType: 'PackedCounter',
        name: 'encodedLengths',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'Store_SpliceDynamicData',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'ResourceId',
        name: 'tableId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32[]',
        name: 'keyTuple',
        type: 'bytes32[]',
      },
      {
        indexed: false,
        internalType: 'uint48',
        name: 'start',
        type: 'uint48',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'Store_SpliceStaticData',
    type: 'event',
  },
  {
    inputs: [],
    name: 'actionId',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'appId',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_commitment',
        type: 'bytes32',
      },
    ],
    name: 'commitAnswer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'ResourceId',
        name: 'tableId',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32[]',
        name: 'keyTuple',
        type: 'bytes32[]',
      },
      {
        internalType: 'uint8',
        name: 'dynamicFieldIndex',
        type: 'uint8',
      },
    ],
    name: 'getDynamicField',
    outputs: [
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'ResourceId',
        name: 'tableId',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32[]',
        name: 'keyTuple',
        type: 'bytes32[]',
      },
      {
        internalType: 'uint8',
        name: 'dynamicFieldIndex',
        type: 'uint8',
      },
    ],
    name: 'getDynamicFieldLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'ResourceId',
        name: 'tableId',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32[]',
        name: 'keyTuple',
        type: 'bytes32[]',
      },
      {
        internalType: 'uint8',
        name: 'dynamicFieldIndex',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'end',
        type: 'uint256',
      },
    ],
    name: 'getDynamicFieldSlice',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'ResourceId',
        name: 'tableId',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32[]',
        name: 'keyTuple',
        type: 'bytes32[]',
      },
      {
        internalType: 'uint8',
        name: 'fieldIndex',
        type: 'uint8',
      },
      {
        internalType: 'FieldLayout',
        name: 'fieldLayout',
        type: 'bytes32',
      },
    ],
    name: 'getField',
    outputs: [
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'ResourceId',
        name: 'tableId',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32[]',
        name: 'keyTuple',
        type: 'bytes32[]',
      },
      {
        internalType: 'uint8',
        name: 'fieldIndex',
        type: 'uint8',
      },
    ],
    name: 'getField',
    outputs: [
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'ResourceId',
        name: 'tableId',
        type: 'bytes32',
      },
    ],
    name: 'getFieldLayout',
    outputs: [
      {
        internalType: 'FieldLayout',
        name: 'fieldLayout',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'ResourceId',
        name: 'tableId',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32[]',
        name: 'keyTuple',
        type: 'bytes32[]',
      },
      {
        internalType: 'uint8',
        name: 'fieldIndex',
        type: 'uint8',
      },
      {
        internalType: 'FieldLayout',
        name: 'fieldLayout',
        type: 'bytes32',
      },
    ],
    name: 'getFieldLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'ResourceId',
        name: 'tableId',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32[]',
        name: 'keyTuple',
        type: 'bytes32[]',
      },
      {
        internalType: 'uint8',
        name: 'fieldIndex',
        type: 'uint8',
      },
    ],
    name: 'getFieldLength',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'ResourceId',
        name: 'tableId',
        type: 'bytes32',
      },
    ],
    name: 'getKeySchema',
    outputs: [
      {
        internalType: 'Schema',
        name: 'keySchema',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'ResourceId',
        name: 'tableId',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32[]',
        name: 'keyTuple',
        type: 'bytes32[]',
      },
      {
        internalType: 'FieldLayout',
        name: 'fieldLayout',
        type: 'bytes32',
      },
    ],
    name: 'getRecord',
    outputs: [
      {
        internalType: 'bytes',
        name: 'staticData',
        type: 'bytes',
      },
      {
        internalType: 'PackedCounter',
        name: 'encodedLengths',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'dynamicData',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'ResourceId',
        name: 'tableId',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32[]',
        name: 'keyTuple',
        type: 'bytes32[]',
      },
    ],
    name: 'getRecord',
    outputs: [
      {
        internalType: 'bytes',
        name: 'staticData',
        type: 'bytes',
      },
      {
        internalType: 'PackedCounter',
        name: 'encodedLengths',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'dynamicData',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'ResourceId',
        name: 'tableId',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32[]',
        name: 'keyTuple',
        type: 'bytes32[]',
      },
      {
        internalType: 'uint8',
        name: 'fieldIndex',
        type: 'uint8',
      },
      {
        internalType: 'FieldLayout',
        name: 'fieldLayout',
        type: 'bytes32',
      },
    ],
    name: 'getStaticField',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'data',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'ResourceId',
        name: 'tableId',
        type: 'bytes32',
      },
    ],
    name: 'getValueSchema',
    outputs: [
      {
        internalType: 'Schema',
        name: 'valueSchema',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
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
        internalType: 'string',
        name: 'answer',
        type: 'string',
      },
    ],
    name: 'progressRoundToRevealStage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'question',
        type: 'string',
      },
    ],
    name: 'progressToNextRound',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_answer',
        type: 'string',
      },
      {
        internalType: 'bytes32',
        name: '_nonce',
        type: 'bytes32',
      },
    ],
    name: 'revealAnswer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'playerAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'root',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'nullifierHash',
        type: 'uint256',
      },
      {
        internalType: 'uint256[8]',
        name: 'proof',
        type: 'uint256[8]',
      },
    ],
    name: 'signUp',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'question',
        type: 'string',
      },
    ],
    name: 'startGame',
    outputs: [],
    stateMutability: 'nonpayable',
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
