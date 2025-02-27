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

async function checkNetwork (expectedChainId) {
  const network = await provider.getNetwork()
  if (Number(network.chainId) !== Number(expectedChainId)) {
    throw new Error(`Please switch your wallet network. Expected chain ID ${expectedChainId}, but connected chain ID is ${network.chainId}. You can add the network via https://chainlist.org/`
    )
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
