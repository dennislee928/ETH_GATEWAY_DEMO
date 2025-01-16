const { getProvider, getWallet } = require("../utils/provider");
const logger = require("../utils/logger");

async function interact() {
  try {
    const provider = getProvider();
    const wallet = getWallet(provider);

    // 互動邏輯...
    logger.info("開始與合約互動...");
  } catch (error) {
    logger.error("互動失敗:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  interact();
}

module.exports = interact;
