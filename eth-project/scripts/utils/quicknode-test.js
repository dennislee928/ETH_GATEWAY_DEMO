const { Core } = require("@quicknode/sdk");

const core = new Core({
  endpointUrl: process.env.QUICKNODE_URL,
  config: {
    // 可選的配置
    timeout: 10000, // 10 秒
    retryCount: 2,
  },
});

async function testConnection() {
  try {
    // 測試連接
    const blockNumber = await core.client.getBlockNumber();
    console.log("當前區塊高度:", blockNumber);

    // 獲取網路資訊
    const network = await core.client.getNetwork();
    console.log("連接到網路:", network.name);

    // 獲取 gas 價格
    const gasPrice = await core.client.getGasPrice();
    console.log("當前 Gas 價格:", ethers.formatUnits(gasPrice, "gwei"), "Gwei");

    // 測試 NFT API (如果有啟用)
    try {
      const nftData = await core.client.nft.getNFTsByCollection({
        collection: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D", // BAYC
        limit: 1,
      });
      console.log("NFT API 測試:", nftData);
    } catch (e) {
      console.log("NFT API 未啟用或發生錯誤");
    }
  } catch (error) {
    console.error("錯誤:", error);
  }
}

testConnection();
