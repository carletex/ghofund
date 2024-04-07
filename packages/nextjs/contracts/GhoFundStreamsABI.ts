export const GhoFundStreamsABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_aavePoolAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_GHOAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_wethGatewayAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "GHOamount",
        type: "uint256",
      },
    ],
    name: "AddBuilder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "GHOamount",
        type: "uint256",
      },
    ],
    name: "UpdateBuilder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "GHOamount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "GHO",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "aavePool",
    outputs: [
      {
        internalType: "contract IPool",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_builder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_GHOcap",
        type: "uint256",
      },
    ],
    name: "addBuilderStream",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_builders",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_GHOcaps",
        type: "uint256[]",
      },
    ],
    name: "addBuilderStreamBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_builders",
        type: "address[]",
      },
    ],
    name: "allBuildersData",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "builderAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "GHOcap",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "unlockedGHOAmount",
            type: "uint256",
          },
        ],
        internalType: "struct GhoFundStreams.BuilderData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_GHOamount",
        type: "uint256",
      },
    ],
    name: "borrowGHO",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "frequency",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_GHOamount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_reason",
        type: "string",
      },
    ],
    name: "streamWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "streamedBuilders",
    outputs: [
      {
        internalType: "uint256",
        name: "GHOcap",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "last",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_builder",
        type: "address",
      },
    ],
    name: "unlockedBuilderAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "wethGateway",
    outputs: [
      {
        internalType: "contract IWrappedTokenGatewayV3",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;
