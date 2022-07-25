const { ethers } = require("hardhat")

// manual way hardhat-deploy can do this automatically
async function main()
{
  const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin") // proxy admin
  const transparentProxy = await ethers.getContract("Box_Proxy") // proxy
  const boxV2 = await ethers.getContract("BoxV2") // latest implementation

  // ..before upgrade.. using former implementation
  const proxyBoxV1 = await ethers.getContractAt("Box", transparentProxy.address)
  // ^ getContractAt() gets ABI from artifacts folder
  const prevVersion = await proxyBoxV1.version()
  console.log(prevVersion)

  const upgradeTx = await boxProxyAdmin.upgrade(transparentProxy.address, boxV2.address) 
  // ^ upgrade function from openzeppelin's proxyadmin contract
  // ^ giving it the proxy address and the implementation contract it should now point to
  await upgradeTx.wait(1)
  const proxyBoxV2 = await ethers.getContractAt("BoxV2", transparentProxy.address)
  // ^ we get the BoxV2 ABI but we load it with the proxy address because that is the user-known address
  const version = await proxyBoxV2.version()
  console.log(version)
  
}

main()
  .then(()=>{process.exit(0)})
  .catch((e)=>
  {
    console.log(e)
    process.exit(1)
  })