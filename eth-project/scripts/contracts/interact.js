const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function main() {
  try {
    // 讀取部署資訊
    const deploymentPath = path.join(__dirname, "../../deployment.json");
    const deploymentInfo = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));

    // 連接到合約
    const provider = new ethers.JsonRpcProvider(process.env.QUICKNODE_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const contractABI = [
      "function setValue(uint256 newValue) public",
      "function getValue() public view returns (uint256)",
      "event ValueChanged(uint256 newValue)",
    ];

    const contract = new ethers.Contract(
      deploymentInfo.contractAddress,
      contractABI,
      wallet
    );

    // 監聽事件
    contract.on("ValueChanged", (newValue) => {
      console.log("值已更改:", newValue.toString());
    });

    // 執行交易
    const tx = await contract.setValue(100);
    console.log("交易發送:", tx.hash);
    await tx.wait();
    console.log("交易已確認");

    // 讀取新值
    const value = await contract.getValue();
    console.log("當前值:", value.toString());
  } catch (error) {
    console.error("互動錯誤:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = main;
