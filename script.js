import DOMPurify from './static/js/purify.js'

let provider, signer, userAddress
const connectWalletButton = document.getElementById('connectWallet')
const donateButton = document.getElementById('donateButton')
const statusDiv = document.getElementById('status')
const amountInput = document.getElementById('amount')
const currencySelect = document.getElementById('currency')

window.addEventListener('load', () => {
  // If the user already donated, show a thank-you message
  if (localStorage.getItem('donated')) {
    statusDiv.innerHTML = '<p>Thank you for your donation!</p>'
  }
  generateQRCode()
})

connectWalletButton.addEventListener('click', async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request account access from MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      // In ethers v6, use BrowserProvider
      provider = new ethers.BrowserProvider(window.ethereum)
      signer = await provider.getSigner()
      userAddress = await signer.getAddress()
      statusDiv.innerHTML = `<p>Wallet connected: ${userAddress}</p>`
      donateButton.disabled = false
      // Optionally change Donate button background to green after connection
      donateButton.style.backgroundColor = '#28a745'
    } catch (err) {
      console.error('Error connecting wallet:', err)
      statusDiv.innerHTML = '<p>Error connecting wallet.</p>'
    }
  } else {
    statusDiv.innerHTML = '<p>No Ethereum provider found. Please install <a href="https://metamask.io/" target="_blank">MetaMask</a>!</p>'
  }
})

async function addNetwork(chainId) {
  const networkDetails = networkConfigs[chainId];
  
  if (!networkDetails) {
    console.error(`Network details not found for chainId: ${chainId}`);
    statusDiv.innerHTML = `<p>Network details not available. Please add manually .</p>`;
    return;
  }

  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [networkDetails]
    });
    statusDiv.innerHTML = "<p>Network added successfully.</p>";
  } catch (addError) {
    console.error("Error adding network:", addError);
    statusDiv.innerHTML = "<p>Error adding network. Please add it manually.</p>";
  }
}

  if (Number(network.chainId) !== Number(expectedChainId)) {

async function disconnectWallet() {
  try {
    await window.ethereum.request({
      method: 'eth_requestAccounts',
      params: [{ eth_accounts: {} }]
    })
    provider = null
    signer = null
    userAddress = null
    statusDiv.innerHTML = '<p>Wallet disconnected.</p>'
    donateButton.disabled = true
    donateButton.style.backgroundColor = ''
    connectWalletButton.innerText = 'Connect Wallet'
  } catch (err) {
    console.error('Error disconnecting wallet:', err)
    statusDiv.innerHTML = '<p>Error disconnecting wallet.</p>'
  }
}

donateButton.addEventListener('click', async () => {
  const amountValue = parseFloat(amountInput.value)
  if (isNaN(amountValue) || amountValue <= 0) {
    statusDiv.innerHTML = '<p>Please enter a valid donation amount.</p>'
    return
  }

  statusDiv.innerHTML = '<p>Initiating donation transaction...</p>'

  // Determine which currency is selected and get its configuration
  const selectedCurrency = currencySelect.value
  const config = donationConfigs[selectedCurrency]
  if (!config) {
    statusDiv.innerHTML = '<p>Unsupported currency selected.</p>'
    return
  }

  try {
    // Check if the wallet is connected to the expected network
    await checkNetwork(config.chainId)

    let tx
    if (config.isNative) {
      // For native coin donations (like ETH), send a transaction with value.
      // For ETH, use ethers.parseEther
      tx = await signer.sendTransaction({
        to: config.donationWallet,
        value: ethers.parseEther(amountValue.toString())
      })
    } else {
      // For token donations (like USDT), call the transfer function.
      const tokenContract = new ethers.Contract(
        config.tokenContract,
        ['function transfer(address to, uint amount) returns (bool)'],
        signer
      )
      const amountInUnits = ethers.parseUnits(amountValue.toString(), config.decimals)
      tx = await tokenContract.transfer(config.donationWallet, amountInUnits)
    }
    statusDiv.innerHTML = DOMPurify.sanitize(
            `<p>Transaction submitted: <a href="${config.explorer}${tx.hash}">${tx.hash}</a></p>`
    )
    const receipt = await tx.wait()
    if (receipt.status === 1) {
      statusDiv.innerHTML += '<p>Donation successful! Thank you for your support.</p>'
      localStorage.setItem('donated', 'true')
    } else {
      statusDiv.innerHTML += '<p>Transaction failed.</p>'
    }
  } catch (err) {
    console.error('Error during donation:', err)
    statusDiv.innerHTML = DOMPurify.sanitize(`<p>Error during donation: ${err.message}</p>`)
  }
})

function generateQRCode () {
  const qrContainer = document.getElementById('qrCodeContainer')
  qrContainer.innerHTML = ''
  new QRCode(qrContainer, {
    text: donationConfigs[currencySelect.value].donationWallet,
    width: 128,
    height: 128
  })
}

// Optionally update QR code when currency changes
currencySelect.addEventListener('change', generateQRCode)
