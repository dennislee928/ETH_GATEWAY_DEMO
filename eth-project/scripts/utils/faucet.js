const { ethers } = require("ethers");
require("dotenv").config();

async function monitorBalance() {
  try {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
    const provider = new ethers.JsonRpcProvider(process.env.QUICKNODE_URL);
    const address = wallet.address;

    console.log("\n=== 錢包資訊 ===");
    console.log("地址:", address);

    // 獲取初始餘額
    const initialBalance = await provider.getBalance(address);
    console.log("當前餘額:", ethers.formatEther(initialBalance), "ETH");

    if (initialBalance > 0) {
      console.log("\n✅ 已經有測試幣了！");
      return;
    }

    console.log("\n請使用以下水龍頭:");
    console.log("1. QuickNode (推薦):");
    console.log("   https://faucet.quicknode.com/ethereum/sepolia");
    console.log("   - 只需驗證碼");
    console.log("   - 每天可以領取");

    console.log("\n2. PoW 挖礦:");
    console.log("   https://sepolia-faucet.pk910.de/");
    console.log("   - 不需要驗證");
    console.log("   - 使用瀏覽器挖礦");

    console.log("\n監控餘額中...");
    console.log("每 10 秒檢查一次，按 Ctrl+C 停止");

    // 持續監控餘額
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      const newBalance = await provider.getBalance(address);

      if (newBalance > initialBalance) {
        console.log("\n🎉 收到測試幣！");
        console.log("新餘額:", ethers.formatEther(newBalance), "ETH");
        break;
      }

      process.stdout.write(".");
    }
  } catch (error) {
    console.error("錯誤:", error.message);
  }
}

if (require.main === module) {
  monitorBalance();
}

module.exports = { monitorBalance };
