const { WebSocketProvider } = require("ethers");
require("dotenv").config();

async function startWebSocketMonitor() {
  try {
    const wsProvider = new WebSocketProvider(process.env.QUICKNODE_WS_URL);
    console.log("WebSocket 監聽已啟動");

    wsProvider.on("block", async (blockNumber) => {
      try {
        const block = await wsProvider.getBlock(blockNumber);
        console.log(`新區塊: ${blockNumber}`);
        console.log(`交易數量: ${block.transactions.length}`);
      } catch (error) {
        console.error("區塊監聽錯誤:", error);
      }
    });

    wsProvider.on("error", (error) => {
      console.error("WebSocket 錯誤:", error);
      setTimeout(startWebSocketMonitor, 5000);
    });

    wsProvider.on("disconnect", () => {
      console.log("WebSocket 斷線，嘗試重連...");
      setTimeout(startWebSocketMonitor, 5000);
    });
  } catch (error) {
    console.error("監聽錯誤:", error);
    setTimeout(startWebSocketMonitor, 5000);
  }
}

if (require.main === module) {
  startWebSocketMonitor().catch(console.error);
}

module.exports = startWebSocketMonitor;
