const donationConfigs = {
  ETH: {
    donationWallet: '0xBFCe3465fBEBC928c922362CBCdC32bEF8BCbE41',
    tokenContract: null,
    decimals: null,
    isNative: true,
    explorer: 'https://sepolia.etherscan.io/tx/'
  },
  USDT: {
    donationWallet: '0xBFCe3465fBEBC928c922362CBCdC32bEF8BCbE41',
    tokenContract: '0x4200000000000000000000000000000000000042',
    decimals: 6,
    isNative: false,
    explorer: 'https://optimistic.etherscan.io/tx/'
  },
  ARB: {
    donationWallet: '0xBFCe3465fBEBC928c922362CBCdC32bEF8BCbE41',
    tokenContract: '0x912ce59144191c1204e64559fe8253a0e49e6548',
    decimals: 6,
    isNative: false,
    explorer: 'https://arbiscan.io/tx/'
  }
}
