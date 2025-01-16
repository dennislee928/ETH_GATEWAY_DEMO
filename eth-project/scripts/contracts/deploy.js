const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { checkRequiredEnvVars } = require("../utils/envCheck");

async function main() {
  try {
    // 檢查環境變數
    checkRequiredEnvVars();

    // 確保 private key 格式正確
    const privateKey = process.env.PRIVATE_KEY.startsWith("0x")
      ? process.env.PRIVATE_KEY
      : `0x${process.env.PRIVATE_KEY}`;

    // 連接到 Sepolia 測試網
    const provider = new ethers.JsonRpcProvider(process.env.QUICKNODE_URL);
    const wallet = new ethers.Wallet(privateKey, provider);

    // 驗證連接
    const network = await provider.getNetwork();
    console.log("連接到網路:", network.name);

    // 獲取部署者資訊
    const balance = await wallet.getBalance();
    console.log("部署者餘額:", ethers.formatEther(balance), "ETH");

    // 讀取合約原始碼
    const contractPath = path.join(
      __dirname,
      "../../contracts/SimpleStorage.sol"
    );
    const source = fs.readFileSync(contractPath, "utf8");

    // 部署合約
    const SimpleStorage = await ethers.getContractFactory(
      "SimpleStorage",
      wallet
    );
    console.log("正在部署合約...");

    // 估算 gas
    const deploymentGas = await SimpleStorage.getDeployTransaction().then(
      (tx) => provider.estimateGas(tx)
    );
    console.log("預估 gas:", deploymentGas.toString());

    // 獲取當前 gas 價格
    const feeData = await provider.getFeeData();
    console.log(
      "當前 gas 價格:",
      ethers.formatUnits(feeData.gasPrice, "gwei"),
      "Gwei"
    );

    // 部署合約
    const simpleStorage = await SimpleStorage.deploy();
    console.log("等待交易確認...");

    await simpleStorage.waitForDeployment();
    const receipt = await provider.getTransactionReceipt(
      simpleStorage.deploymentTransaction().hash
    );

    // 保存部署資訊
    const deploymentInfo = {
      contractAddress: simpleStorage.target,
      deploymentHash: simpleStorage.deploymentTransaction().hash,
      deployer: wallet.address,
      timestamp: new Date().toISOString(),
      network: "sepolia",
      gasUsed: receipt.gasUsed.toString(),
      blockNumber: receipt.blockNumber,
    };

    // 寫入部署資訊到文件
    const deploymentPath = path.join(__dirname, "../../deployment.json");
    fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));

    console.log("部署成功！");
    console.log("合約地址:", simpleStorage.target);
    console.log("部署資訊已保存到 deployment.json");

    // 驗證合約部署
    const code = await provider.getCode(simpleStorage.target);
    if (code === "0x") {
      throw new Error("合約部署失敗！");
    }

    // 初始化測試
    const value = await simpleStorage.getValue();
    console.log("初始值:", value.toString());

    // 設置新值進行測試
    const tx = await simpleStorage.setValue(42);
    await tx.wait();
    console.log("交易確認，新值已設置");

    const newValue = await simpleStorage.getValue();
    console.log("新值:", newValue.toString());
  } catch (error) {
    console.error("部署錯誤:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = main;
