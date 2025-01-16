#!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const { ethers } = require("ethers");
const chalk = require("chalk");

async function setupCLI() {
  console.log(chalk.blue("歡迎使用 ETH Project 設置工具！"));

  const questions = [
    {
      type: "list",
      name: "provider",
      message: "選擇你要使用的節點提供商:",
      choices: ["QuickNode", "Infura", "Alchemy", "自定義"],
    },
    {
      type: "input",
      name: "httpUrl",
      message: "輸入 HTTP URL:",
      validate: (input) => input.startsWith("https://"),
    },
    {
      type: "input",
      name: "wsUrl",
      message: "輸入 WebSocket URL:",
      validate: (input) => input.startsWith("wss://"),
    },
    {
      type: "list",
      name: "walletType",
      message: "如何設置錢包:",
      choices: ["創建新錢包", "導入私鑰", "導入助記詞"],
    },
    {
      type: "input",
      name: "monitorAddress",
      message: "輸入要監控的地址 (可選):",
      validate: (input) => !input || ethers.isAddress(input),
    },
  ];

  const answers = await inquirer.prompt(questions);

  // 處理錢包設置
  let privateKey;
  if (answers.walletType === "創建新錢包") {
    const wallet = ethers.Wallet.createRandom();
    privateKey = wallet.privateKey;
    console.log(chalk.yellow("\n新錢包已創建:"));
    console.log(chalk.green(`地址: ${wallet.address}`));
    console.log(chalk.red(`私鑰: ${privateKey}`));
    console.log(chalk.red(`助記詞: ${wallet.mnemonic.phrase}`));
    console.log(chalk.yellow("\n請務必保存好這些信息！"));
  } else if (answers.walletType === "導入私鑰") {
    const { key } = await inquirer.prompt({
      type: "password",
      name: "key",
      message: "輸入私鑰:",
      mask: "*",
    });
    privateKey = key;
  }

  // 生成 .env 文件
  const envContent = `
# Sepolia 測試網
QUICKNODE_URL=${answers.httpUrl}
QUICKNODE_WS_URL=${answers.wsUrl}
PRIVATE_KEY=${privateKey.replace("0x", "")}

# 監控設置
MONITOR_ADDRESS=${answers.monitorAddress || ""}
  `.trim();

  const envPath = path.join(__dirname, "../.env");
  fs.writeFileSync(envPath, envContent);

  console.log(chalk.green("\n設置完成！"));
  console.log(chalk.blue("你可以開始使用以下命令："));
  console.log(chalk.yellow("npm run deploy    - 部署合約"));
  console.log(chalk.yellow("npm run interact  - 與合約互動"));
  console.log(chalk.yellow("npm run monitor   - 啟動監控"));
}

setupCLI().catch(console.error);
