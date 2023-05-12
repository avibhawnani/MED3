require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    polygon_mumbai: {
    url: process.env.ALCHEMY_API_KEY,
    accounts: [process.env.PRIVATE_KEY]
    }
    },
    etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
    },
  paths:{
    artifacts:"./client/src/artifacts",
  }
};
