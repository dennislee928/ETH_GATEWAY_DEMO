const { WebSocketProvider, Contract } = require("ethers");
const networks = require("../config/network");
const { handleError, ERROR_CODES } = require("../utils/errorHandler");
require("dotenv").config();

async function startWebSocketMonitor() {
  try {
    const wsProvider = new WebSocketProvider(process.env.QUICKNODE_WS_URL);
    console.log("WebSocket 監聽已啟動");

    // 監聽新區塊
    wsProvider.on("block", async (blockNumber) => {
      try {
        const block = await wsProvider.getBlock(blockNumber, true);
        console.log(`\n新區塊: ${blockNumber}`);
        console.log(
          `時間戳: ${new Date(block.timestamp * 1000).toLocaleString()}`
        );
        console.log(`交易數量: ${block.transactions.length}`);

        // 分析區塊 gas 使用情況
        if (block.transactions.length > 0) {
          const gasUsed = block.gasUsed;
          const gasLimit = block.gasLimit;
          const utilization = (gasUsed * 100n) / gasLimit;
          console.log(`Gas 使用率: ${utilization}%`);
        }

        // 監控特定地址的交易
        const targetAddress = process.env.MONITOR_ADDRESS;
        if (targetAddress) {
          const relevantTxs = block.transactions.filter(
            (tx) =>
              tx.from.toLowerCase() === targetAddress.toLowerCase() ||
              tx.to?.toLowerCase() === targetAddress.toLowerCase()
          );

          if (relevantTxs.length > 0) {
            console.log(`\n發現目標地址相關交易:`);
            for (const tx of relevantTxs) {
              console.log(`- 交易哈希: ${tx.hash}`);
              console.log(`  從: ${tx.from}`);
              console.log(`  到: ${tx.to}`);
              console.log(`  值: ${ethers.formatEther(tx.value)} ETH`);
            }
          }
        }
      } catch (error) {
        handleError(error, "區塊監聽");
      }
    });

    // 監聽合約事件
    if (networks.sepolia.contracts.simpleStorage.address) {
      const contract = new Contract(
        networks.sepolia.contracts.simpleStorage.address,
        networks.sepolia.contracts.simpleStorage.abi,
        wsProvider
      );

      contract.on("ValueChanged", (newValue) => {
        console.log("\n合約事件 - 值已更改:", newValue.toString());
      });
    }

    // 監聽 pending 交易
    wsProvider.on("pending", async (txHash) => {
      try {
        const tx = await wsProvider.getTransaction(txHash);
        if (tx && tx.value > ethers.parseEther("1.0")) {
          console.log(`\n大額交易提醒:`);
          console.log(`- 交易哈希: ${txHash}`);
          console.log(`- 金額: ${ethers.formatEther(tx.value)} ETH`);
        }
      } catch (error) {
        handleError(error, "pending交易監聽");
      }
    });

    // 錯誤處理和重連邏輯
    wsProvider.on("error", (error) => {
      handleError(
        new BlockchainError("WebSocket 連接錯誤", ERROR_CODES.WEBSOCKET_ERROR, {
          originalError: error,
        })
      );
      setTimeout(startWebSocketMonitor, 5000);
    });

    wsProvider.on("disconnect", () => {
      console.log("\nWebSocket 斷線，嘗試重連...");
      setTimeout(startWebSocketMonitor, 5000);
    });
  } catch (error) {
    handleError(error, "WebSocket監控");
    setTimeout(startWebSocketMonitor, 5000);
  }
}

// 定期檢查連接狀態
setInterval(() => {
  if (!wsProvider._websocket || wsProvider._websocket.readyState !== 1) {
    console.log("檢測到連接中斷，重新啟動監控...");
    startWebSocketMonitor();
  }
}, 30000);

if (require.main === module) {
  startWebSocketMonitor().catch((error) => handleError(error, "主程序"));
}

module.exports = startWebSocketMonitor;
