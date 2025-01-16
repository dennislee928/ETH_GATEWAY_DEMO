require("dotenv").config();

const networks = {
  sepolia: {
    url: process.env.QUICKNODE_URL,
    wsUrl: process.env.QUICKNODE_WS_URL,
    chainId: 11155111,
    explorer: "https://sepolia.etherscan.io",
    contracts: {
      simpleStorage: {
        address: process.env.CONTRACT_ADDRESS,
        abi: [
          "function setValue(uint256 newValue) public",
          "function getValue() public view returns (uint256)",
          "event ValueChanged(uint256 newValue)",
        ],
      },
    },
  },
};

module.exports = networks;
