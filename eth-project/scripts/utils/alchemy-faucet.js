const axios = require("axios");
const { ethers } = require("ethers");
require("dotenv").config();

async function requestFromAlchemy() {
  try {
    // 使用 Alchemy API
    const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);

    const headers = {
      Authorization: `Bearer ${ALCHEMY_API_KEY}`,
      "Content-Type": "application/json",
    };

    const data = {
      network: "ETH_SEPOLIA",
      address: wallet.address,
    };

    console.log("正在請求 Alchemy 測試幣...");
    const response = await axios.post(
      "https://dashboard.alchemy.com/api/faucet-requests",
      data,
      { headers }
    );

    console.log("請求結果:", response.data);

    // 監控餘額變化
    const provider = new ethers.JsonRpcProvider(process.env.QUICKNODE_URL);
    const initialBalance = await provider.getBalance(wallet.address);
    console.log("初始餘額:", ethers.formatEther(initialBalance), "ETH");

    // 定期檢查餘額
    const checkBalance = async () => {
      const newBalance = await provider.getBalance(wallet.address);
      if (newBalance > initialBalance) {
        console.log("測試幣已到帳！");
        console.log("新餘額:", ethers.formatEther(newBalance), "ETH");
        return true;
      }
      return false;
    };

    // 等待最多5分鐘
    for (let i = 0; i < 30; i++) {
      if (await checkBalance()) break;
      await new Promise((resolve) => setTimeout(resolve, 10000)); // 每10秒檢查一次
    }
  } catch (error) {
    console.error("請求失敗:", error.response?.data || error.message);
  }
}

// 添加到 package.json
// "scripts": {
//   "faucet": "node utils/alchemy-faucet.js"
// }

if (require.main === module) {
  requestFromAlchemy();
}

module.exports = requestFromAlchemy;
