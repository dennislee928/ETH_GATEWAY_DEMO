const { WebSocketProvider } = require("ethers");
const networks = require("../config/network");
const logger = require("../utils/logger");

async function startWebSocketMonitor() {
  const wsProvider = new WebSocketProvider(networks.sepolia.wsUrl);

  wsProvider.on("block", async (blockNumber) => {
    logger.info(`新區塊: ${blockNumber}`);
  });

  wsProvider.on("error", (error) => {
    logger.error("WebSocket 錯誤:", error);
    setTimeout(startWebSocketMonitor, 5000);
  });
}

if (require.main === module) {
  startWebSocketMonitor();
}

module.exports = startWebSocketMonitor;
