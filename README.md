# distributed-uncensorable-frontend

A static donation page that accepts donations in multiple cryptocurrencies across different networks. This page is designed to be published using [Distributed Press](https://distributed.press/), giving you an uncensorable way to receive funding. Donors can use MetaMask wallet to send native tokens (like ETH) or ERC‑20 tokens (like USDT on different Layer‑2s).

This project is completely static. All scripts are unminified scripts loaded from [local files](./static/js/) (not CDNs) to prevent censorship and improve security.

## Get started
1. [Fork](https://github.com/hyphacoop/distributed-uncensorable-frontend/fork) this repository

2. Configure networks & tokens in [config.js](./config.js):

Example:
```js
const donationConfigs = {
  ETH: {
    donationWallet: '0xYourEthereumWalletAddress',
    tokenContract: null,
    decimals: null,
    isNative: true,
    explorer: 'https://etherscan.io/tx/',
    chainId: 1
  },
  USDT: {
    donationWallet: '0xYourEthereumWalletAddress',
    tokenContract: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT on Ethereum
    decimals: 6,
    isNative: false,
    explorer: 'https://etherscan.io/tx/',
    chainId: 1
  },
  // or any other chain...
};
```

- `chainId`: to verify users are on the correct network (e.g. `1` for Ethereum mainnet, `10` for Optimism, `42161` for Arbitrum, etc.).
- `decimals`: e.g. `6` for USDT, `18` for ETH.
- `explorer`: the URL to view transactions on the specific chain’s block explorer.

You can easily get the information about chains from here: https://chainlist.org/

3. Update the [frontend](./index.html) to fit your needs

4. Deploying with Distributed Press
- Distributed Press offers a decentralized publishing solution, ensuring your page remains accessible and resistant to censorship.
Explore different deployment methods in the [docs.distributed.press](https://docs.distributed.press/deployment/).
