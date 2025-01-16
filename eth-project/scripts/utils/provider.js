const { ethers } = require("ethers");
const networks = require("../config/network");

function getProvider(network = "sepolia") {
  return new ethers.JsonRpcProvider(networks[network].url);
}

function getWallet(provider) {
  return new ethers.Wallet(process.env.PRIVATE_KEY, provider);
}

module.exports = {
  getProvider,
  getWallet,
};
