require("dotenv").config();

const networks = {
  sepolia: {
    url: process.env.QUICKNODE_URL,
    wsUrl: process.env.QUICKNODE_WS_URL,
    chainId: 11155111,
    explorer: "https://sepolia.etherscan.io",
  },
};

module.exports = networks;
