const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
const solc = require("solc");
require("dotenv").config();

async function main() {
  try {
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
    const balance = await provider.getBalance(wallet.address);
    console.log("部署者餘額:", ethers.formatEther(balance), "ETH");

    // 讀取和編譯合約
    const contractPath = path.join(
      __dirname,
      "../../contracts/GuessNumberGame.sol"
    );
    const source = fs.readFileSync(contractPath, "utf8");

    const input = {
      language: "Solidity",
      sources: {
        "GuessNumberGame.sol": {
          content: source,
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    };

    // 編譯合約
    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    const contract = output.contracts["GuessNumberGame.sol"]["GuessNumberGame"];

    // 獲取 ABI 和 Bytecode
    const abi = contract.abi;
    const bytecode = contract.evm.bytecode.object;

    // 創建合約工廠
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    console.log("正在部署遊戲合約...");

    // 部署合約
    const gameContract = await factory.deploy();
    await gameContract.waitForDeployment();

    // 獲取部署收據
    const receipt = await provider.getTransactionReceipt(
      gameContract.deploymentTransaction().hash
    );

    // 保存部署資訊
    const deploymentInfo = {
      contractAddress: await gameContract.getAddress(),
      deploymentHash: gameContract.deploymentTransaction().hash,
      deployer: wallet.address,
      timestamp: new Date().toISOString(),
      network: network.name,
      gasUsed: receipt.gasUsed.toString(),
      blockNumber: receipt.blockNumber,
    };

    // 寫入部署資訊到文件
    const deploymentPath = path.join(__dirname, "../../deployment.json");
    fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));

    console.log("遊戲合約部署成功！");
    console.log("合約地址:", await gameContract.getAddress());
    console.log("部署資訊已保存到 deployment.json");
  } catch (error) {
    console.error("部署錯誤:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = main;
