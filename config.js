const donationConfigs = {
  ETH: {
    donationWallet: '0xETHWalletAddress',
    tokenContract: null,
    decimals: null,
    isNative: true,
    explorer: 'https://sepolia.etherscan.io/tx/'
  },
  USDT: {
    donationWallet: '0xETHWalletAddress',
    tokenContract: '0xOPContractAddress',
    decimals: 6,
    isNative: false,
    explorer: 'https://optimistic.etherscan.io/tx/'
  }
}
