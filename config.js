const donationConfigs = {
  ETH: {
    donationWallet: '0xBFCe3465fBEBC928c922362CBCdC32bEF8BCbE41',
    tokenContract: null,
    decimals: null,
    isNative: true,
    explorer: 'https://etherscan.io/tx/',
    chainId: 1
  },
  USDT: {
    donationWallet: '0xBFCe3465fBEBC928c922362CBCdC32bEF8BCbE41',
    tokenContract: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    decimals: 6,
    isNative: false,
    explorer: 'https://etherscan.io/tx/',
    chainId: 1
  },
  USDT_OP: {
    donationWallet: '0xBFCe3465fBEBC928c922362CBCdC32bEF8BCbE41',
    tokenContract: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    decimals: 6,
    isNative: false,
    explorer: 'https://optimistic.etherscan.io/tx/',
    chainId: 10
  },
  USDT_ARB: {
    donationWallet: '0xBFCe3465fBEBC928c922362CBCdC32bEF8BCbE41',
    tokenContract: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    decimals: 6,
    isNative: false,
    explorer: 'https://arbiscan.io/tx/',
    chainId: 42161
  },
  OP: {
    donationWallet: '0xBFCe3465fBEBC928c922362CBCdC32bEF8BCbE41',
    tokenContract: '0x4200000000000000000000000000000000000042',
    decimals: 18,
    isNative: false,
    explorer: 'https://optimistic.etherscan.io/tx/',
    chainId: 10
  },
  ARB: {
    donationWallet: '0xBFCe3465fBEBC928c922362CBCdC32bEF8BCbE41',
    tokenContract: '0x912ce59144191c1204e64559fe8253a0e49e6548',
    decimals: 18,
    isNative: false,
    explorer: 'https://arbiscan.io/tx/',
    chainId: 42161
  }
}

const networkConfigs = {
  1: {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    rpcUrls: ["https://mainnet.infura.io"],
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    },
    blockExplorerUrls: ["https://etherscan.io"]
  },
  10: {
    chainId: "0xa",
    chainName: "Optimism",
    rpcUrls: ["https://mainnet.optimism.io"],
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    },
    blockExplorerUrls: ["https://optimistic.etherscan.io"]
  },
  42161: {
    chainId: "0xa4b1",
    chainName: "Arbitrum One",
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    },
    blockExplorerUrls: ["https://arbiscan.io"]
  }
};
