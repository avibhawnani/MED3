const hre = require("hardhat");

async function main() {
  
  const Contract = await hre.ethers.getContractFactory("Hospital");
  const contract = await Contract.deploy("0x83c451419875DE91d8AcB43C1261FfF7Eb316AD0");
  await contract.deployed();

  console.log("Contract Address : ",contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// 0x0f483f061C567ff2d72254b1e5bEbb8e6B0bd1bC
// 0x5444655e58702265dcC589B2053d8f30f288eB3A