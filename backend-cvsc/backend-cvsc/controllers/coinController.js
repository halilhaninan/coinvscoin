const asyncHandler = require("express-async-handler");
const coinModel = require("../models/coinModel");
const Web3 = require("web3");
const chalk = require("chalk");

const web3ht = new Web3(
  new Web3.providers.WebsocketProvider(
    // "wss://bsc-ws-node.nariox.org:443"
    // "wss://bsc-ws-node.nariox.org"
    // "wss://bsc-mainnet.nodereal.io/ws/v1/3d3f5da6fa014a42979f6f8d025c81e6"
    // "wss://bsc.getblock.io/mainnet/?api_key=e33d5bc9-a813-4e5f-9d85-d0a0eef3ea53"
    "wss://aged-falling-rain.bsc.discover.quiknode.pro/ad1b4e077f9418c21deff3a1b388cef91d8fbbf5/"
    // "wss://bsc-mainnet.nodereal.io/ws/v1/64a9df0874fb4a93b9d0a3849de012d3"
  )
);

const abi = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
      { indexed: true, internalType: "address", name: "to", type: "address" },
    ],
    name: "Burn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    name: "Mint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0Out",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1Out",
        type: "uint256",
      },
      { indexed: true, internalType: "address", name: "to", type: "address" },
    ],
    name: "Swap",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve0",
        type: "uint112",
      },
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve1",
        type: "uint112",
      },
    ],
    name: "Sync",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "MINIMUM_LIQUIDITY",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "burn",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getReserves",
    outputs: [
      { internalType: "uint112", name: "_reserve0", type: "uint112" },
      { internalType: "uint112", name: "_reserve1", type: "uint112" },
      { internalType: "uint32", name: "_blockTimestampLast", type: "uint32" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "_token0", type: "address" },
      { internalType: "address", name: "_token1", type: "address" },
    ],
    name: "initialize",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "kLast",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "mint",
    outputs: [{ internalType: "uint256", name: "liquidity", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "price0CumulativeLast",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "price1CumulativeLast",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "skim",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "uint256", name: "amount0Out", type: "uint256" },
      { internalType: "uint256", name: "amount1Out", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "swap",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "sync",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "token0",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "token1",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
// const abi = [
//   {
//     inputs: [],
//     payable: false,
//     stateMutability: "nonpayable",
//     type: "constructor",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "owner",
//         type: "address",
//       },
//       {
//         indexed: true,
//         internalType: "address",
//         name: "spender",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "value",
//         type: "uint256",
//       },
//     ],
//     name: "Approval",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "sender",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amount0",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amount1",
//         type: "uint256",
//       },
//       { indexed: true, internalType: "address", name: "to", type: "address" },
//     ],
//     name: "Burn",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "sender",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amount0",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amount1",
//         type: "uint256",
//       },
//     ],
//     name: "Mint",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "sender",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amount0In",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amount1In",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amount0Out",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amount1Out",
//         type: "uint256",
//       },
//       { indexed: true, internalType: "address", name: "to", type: "address" },
//     ],
//     name: "Swap",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "uint112",
//         name: "reserve0",
//         type: "uint112",
//       },
//       {
//         indexed: false,
//         internalType: "uint112",
//         name: "reserve1",
//         type: "uint112",
//       },
//     ],
//     name: "Sync",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       { indexed: true, internalType: "address", name: "from", type: "address" },
//       { indexed: true, internalType: "address", name: "to", type: "address" },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "value",
//         type: "uint256",
//       },
//     ],
//     name: "Transfer",
//     type: "event",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "DOMAIN_SEPARATOR",
//     outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "MINIMUM_LIQUIDITY",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "PERMIT_TYPEHASH",
//     outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [
//       { internalType: "address", name: "", type: "address" },
//       { internalType: "address", name: "", type: "address" },
//     ],
//     name: "allowance",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: false,
//     inputs: [
//       { internalType: "address", name: "spender", type: "address" },
//       { internalType: "uint256", name: "value", type: "uint256" },
//     ],
//     name: "approve",
//     outputs: [{ internalType: "bool", name: "", type: "bool" }],
//     payable: false,
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [{ internalType: "address", name: "", type: "address" }],
//     name: "balanceOf",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: false,
//     inputs: [{ internalType: "address", name: "to", type: "address" }],
//     name: "burn",
//     outputs: [
//       { internalType: "uint256", name: "amount0", type: "uint256" },
//       { internalType: "uint256", name: "amount1", type: "uint256" },
//     ],
//     payable: false,
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "decimals",
//     outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "factory",
//     outputs: [{ internalType: "address", name: "", type: "address" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "getReserves",
//     outputs: [
//       { internalType: "uint112", name: "_reserve0", type: "uint112" },
//       { internalType: "uint112", name: "_reserve1", type: "uint112" },
//       { internalType: "uint32", name: "_blockTimestampLast", type: "uint32" },
//     ],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: false,
//     inputs: [
//       { internalType: "address", name: "_token0", type: "address" },
//       { internalType: "address", name: "_token1", type: "address" },
//     ],
//     name: "initialize",
//     outputs: [],
//     payable: false,
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "kLast",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: false,
//     inputs: [{ internalType: "address", name: "to", type: "address" }],
//     name: "mint",
//     outputs: [{ internalType: "uint256", name: "liquidity", type: "uint256" }],
//     payable: false,
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "name",
//     outputs: [{ internalType: "string", name: "", type: "string" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [{ internalType: "address", name: "", type: "address" }],
//     name: "nonces",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: false,
//     inputs: [
//       { internalType: "address", name: "owner", type: "address" },
//       { internalType: "address", name: "spender", type: "address" },
//       { internalType: "uint256", name: "value", type: "uint256" },
//       { internalType: "uint256", name: "deadline", type: "uint256" },
//       { internalType: "uint8", name: "v", type: "uint8" },
//       { internalType: "bytes32", name: "r", type: "bytes32" },
//       { internalType: "bytes32", name: "s", type: "bytes32" },
//     ],
//     name: "permit",
//     outputs: [],
//     payable: false,
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "price0CumulativeLast",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "price1CumulativeLast",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: false,
//     inputs: [{ internalType: "address", name: "to", type: "address" }],
//     name: "skim",
//     outputs: [],
//     payable: false,
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     constant: false,
//     inputs: [
//       { internalType: "uint256", name: "amount0Out", type: "uint256" },
//       { internalType: "uint256", name: "amount1Out", type: "uint256" },
//       { internalType: "address", name: "to", type: "address" },
//       { internalType: "bytes", name: "data", type: "bytes" },
//     ],
//     name: "swap",
//     outputs: [],
//     payable: false,
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "symbol",
//     outputs: [{ internalType: "string", name: "", type: "string" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: false,
//     inputs: [],
//     name: "sync",
//     outputs: [],
//     payable: false,
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "token0",
//     outputs: [{ internalType: "address", name: "", type: "address" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "token1",
//     outputs: [{ internalType: "address", name: "", type: "address" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: true,
//     inputs: [],
//     name: "totalSupply",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     payable: false,
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     constant: false,
//     inputs: [
//       { internalType: "address", name: "to", type: "address" },
//       { internalType: "uint256", name: "value", type: "uint256" },
//     ],
//     name: "transfer",
//     outputs: [{ internalType: "bool", name: "", type: "bool" }],
//     payable: false,
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     constant: false,
//     inputs: [
//       { internalType: "address", name: "from", type: "address" },
//       { internalType: "address", name: "to", type: "address" },
//       { internalType: "uint256", name: "value", type: "uint256" },
//     ],
//     name: "transferFrom",
//     outputs: [{ internalType: "bool", name: "", type: "bool" }],
//     payable: false,
//     stateMutability: "nonpayable",
//     type: "function",
//   },
// ];
const liqABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "token0",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "getPair",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getReserves",
    outputs: [
      { internalType: "uint112", name: "_reserve0", type: "uint112" },
      { internalType: "uint112", name: "_reserve1", type: "uint112" },
      { internalType: "uint32", name: "_blockTimestampLast", type: "uint32" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

//  const [bnbp, setbnbp] = useState();
//         const bnbPriceApi = {
//           method: "GET",
//           url: "https://coinranking1.p.rapidapi.com/coin/WcwrkfNI4FUAe/price",
//           params: { referenceCurrencyUuid: "HIVsRcGKkPFtW" },
//           headers: {
//             "X-RapidAPI-Key":
//               "cc9816007dmsh4d5220d982db612p134dfejsn7f38192bf8da",
//             "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
//           },
//         };

//         axios
//           .request(bnbPriceApi)
//           .then(function (response) {
//             console.log(response.data.data.price);
//             setbnbp(response.data.data.price);
//           })
//           .catch(function (error) {
//             console.error(error);
//           });

// cok fazla sifirli gelmesini engelliyor
function financial(x) {
  return Number.parseFloat(x).toFixed(12);
}

//mempoolda to address'i 0x10 olanlari alip datalarina bakarak contract addressini buluyoruz botlarda siralama farkli yalnizca uniswap methodlarini bulabliyoruz
function getContractFromInput(input) {
  const rowNumber = input.length / 64;
  if (rowNumber * 64 !== parseInt(rowNumber) * 64) return "";
  return `0x${input.slice(64 * (rowNumber - 1) + 24, 64 * rowNumber)}`;
}

// pancake router addresi
const routeraddress = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
// wrapped bnb adresi bu eth icin olan diger dosyada
const BNB_CONTRACT = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
var cakeFactory = new web3ht.eth.Contract(liqABI, routeraddress);
(async () => {
  console.log(chalk.red("start transaction find !"));
  // mempool islemlerine bakiyoruz
  web3ht.eth.subscribe("pendingTransactions").on("data", async (hash) => {
    console.log(chalk.green("TxHash", hash));
    const transaction = await web3ht.eth.getTransaction(hash);
    // 0x10 adresine giden islemlere bakarak sadece pcsv2 havuzunu takip ediyoruz
    try {
      if (
        transaction &&
        transaction.to === "0x10ED43C718714eb63d5aA57B78B54704E256024E" &&
        transaction.input
      ) {
        const contractAddress = web3ht.utils.toChecksumAddress(
          getContractFromInput(
            transaction.input.slice(10, transaction.input.length)
          )
        );
        // asiri fazla busd usdt usdc gibi sielemleri genel olarak engelliyoruz
        if (
          "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" != contractAddress &&
          "0x0000000000000000000000000000000062F58a65" != contractAddress &&
          "0x55d398326f99059fF775485246999027B3197955" != contractAddress &&
          "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" != contractAddress &&
          "0xa9fc646A3419a4cf94A10418E6C245Bd994DF6DB" != contractAddress
        ) {
          console.log(chalk.yellow(contractAddress, "contract bulundu"));

          // ccontract addressi bulduktan sonra detaylara bakmam icin abi gerekiyor burada abi uzerinden decimal name gibi ozellikleri cekiyorz
          const bnbContract = new web3ht.eth.Contract(abi, contractAddress);
          const decimal = await bnbContract.methods.decimals().call();
          const name = await bnbContract.methods.name().call();

          console.log("decimal ve isim bulundu");
          // burada bu coinin liq poolunu buluyoruz ki fiyati hesaplayalim
          const sorted = [BNB_CONTRACT, contractAddress].sort();
          const pairAddress = await cakeFactory.methods
            .getPair(sorted[0], sorted[1])
            .call();

          console.log("liq pair addresler bulundu");

          var pair = new web3ht.eth.Contract(liqABI, pairAddress);

          // en sacma ve zor kisim burasi burada liq pool bulduktan sonra iceride ki tokenlarin wbnb ve coin olarak 2 ye ayiriyoruz ve hesaplama yapiyoruz
          var reserves = await pair.methods.getReserves().call();
          console.log(reserves);

          const reservesCoin =
            parseInt(reserves["0"]) > parseInt(reserves["1"])
              ? parseInt(reserves["0"])
              : parseInt(reserves["1"]);

          const reservesBNB =
            parseInt(reserves["0"]) < parseInt(reserves["1"])
              ? parseInt(reserves["0"])
              : parseInt(reserves["1"]);

          console.log("liq de bulunan bnb ve coin miktarı bulundu");
          const coinToken2 = await bnbContract.methods
            .balanceOf(pairAddress)
            .call();

          const coinToken = coinToken2 / 10 ** decimal;

          const coinWbnb =
            (parseInt(coinToken) == reservesBNB ? reservesCoin : reservesBNB) /
            10 ** 18;

          console.log(coinToken, "wbnb ve token ether cinsinden belirlendi");
          console.log(
            coinWbnb,
            "coinWbnbcoinWbnbcoinWbnbcoinWbnbcoinWbnb ???????"
          );

          const contract = new web3ht.eth.Contract(abi, contractAddress);
          const totalSupplywei = await contract.methods.totalSupply().call();
          console.log("buradaaaaaaaaaaa");

          const totalSupply = totalSupplywei / 10 ** decimal;
          //
          //
          //

          const price = financial((coinWbnb / coinToken) * bnbp);
          // price guncel cekilmyor ayarlamayi unutma !!
          // bazi sistemler 0x000 dead walletlarida hesaba katarak marketcap hesaplarken ben total supply uzerinden hesapliyorum.
          const marketcap = parseInt(totalSupply * price);

          console.log("-------------");
          console.log("-------------");
          console.log("-------------");
          console.log("-------------");
          console.log("-------------");
          console.log("-------------");

          console.log("name", name);
          console.log("totalSupply", totalSupply);
          console.log("token price ", price);
          console.log("marketcap", marketcap);
          console.log("contractAddress", contractAddress);

          console.log("-------------");
          console.log("-------------");
          console.log("-------------");
          console.log("-------------");
          console.log("-------------");

          const dbContractAddress = await coinModel.find({
            contractAddress,
          });
          console.log(contractAddress, "buldugumuz contract");
          console.log(dbContractAddress?.[0]?.contractAddress, "db contract");

          if (contractAddress != dbContractAddress?.[0]?.contractAddress) {
            {
              findCoin(contractAddress, name, price, marketcap);
            }
          } else {
            updateCoin(contractAddress, price, marketcap);
          }
        }
      }
    } catch (err) {
      console.log("error", err);
    }
  });
})();

const findCoin = asyncHandler(
  async (contractAddress, name, price, marketcap) => {
    await coinModel.create({
      contractAddress,
      name,
      price,
      marketcap,
      logo: null,
      telegram: null,
      website: null,
      twitter: null,
      vote: 0,
    });
  }
);
const updateCoin = asyncHandler(async (contractAddress, price, marketcap) => {
  await coinModel.updateOne(
    {
      contractAddress,
    },
    {
      price,
      marketcap,
    }
  );
});

const getCoin = asyncHandler(async (req, res) => {
  const coins = await coinModel.find({}).sort({ vote: -1 });

  res.status(200).json(coins);
});

module.exports = {
  getCoin,
  findCoin,
  updateCoin,
};
