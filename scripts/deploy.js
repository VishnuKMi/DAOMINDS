const hre = require('hardhat')
require('dotenv').config({ path: '.env' })

async function main () {
  // Deploy the FakeNFTMarketplace contract first
  const FakeNFTMarketplace = await ethers.getContractFactory(
    'FakeNFTMarketplace'
  )
  const fakeNftMarketplace = await FakeNFTMarketplace.deploy()
  await fakeNftMarketplace.deployed()

  console.log('FakeNFTMarketplace deployed to: ', fakeNftMarketplace.address)

  // Now deploy the CryptoDevsDAO contract
  const CryptoDevsDAO = await ethers.getContractFactory('CryptoDevsDAO')
  const cryptoDevsDAO = await CryptoDevsDAO.deploy(
    fakeNftMarketplace.address,
    process.env.NEXT_PUBLIC_CRYPTODEVS_NFT_CONTRACT_ADDRESS,
    {
      // This assumes your metamask account has at least 1 ETH in its account
      // Change this value as you want
      value: ethers.utils.parseEther('0.01')
    }
  )
  await cryptoDevsDAO.deployed()

  console.log('CryptoDevsDAO deployed to: ', cryptoDevsDAO.address)
}

// Async Sleep function
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
