import { ethers } from "ethers";
import { getRpcEndpoint, getNetworkConfig } from "../config/blockchain";

// 測試 RPC 連接
export const testRpcConnection = async () => {
  const results = {
    success: false,
    endpoint: "",
    network: null,
    latestBlock: null,
    error: null,
    timestamp: new Date().toISOString(),
  };

  try {
    const endpoint = getRpcEndpoint();
    const networkConfig = getNetworkConfig();

    results.endpoint = endpoint;
    results.network = networkConfig;

    console.log("測試 RPC 端點:", endpoint);
    console.log("網路配置:", networkConfig);

    const provider = new ethers.JsonRpcProvider(endpoint, {
      chainId: networkConfig.chainId,
      name: networkConfig.name,
    });

    // 測試網路連接
    const network = await provider.getNetwork();
    console.log("連接的網路:", network);

    // 測試獲取最新區塊
    const latestBlock = await provider.getBlock("latest");
    results.latestBlock = {
      number: latestBlock.number,
      timestamp: latestBlock.timestamp,
      hash: latestBlock.hash,
    };
    console.log("最新區塊:", latestBlock.number);

    results.success = true;
    console.log("✅ RPC 連接測試成功");
  } catch (error) {
    results.error = error.message;
    console.error("❌ RPC 連接測試失敗:", error);
  }

  return results;
};

// 測試多個 RPC 端點
export const testMultipleEndpoints = async () => {
  const endpoints = [
    "https://ethereum-sepolia.publicnode.com",
    "https://rpc.sepolia.org",
    "https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  ];

  const results = [];

  for (const endpoint of endpoints) {
    try {
      console.log(`測試端點: ${endpoint}`);

      const provider = new ethers.JsonRpcProvider(endpoint, {
        chainId: 11155111,
        name: "sepolia",
      });

      const network = await provider.getNetwork();
      const latestBlock = await provider.getBlock("latest");

      results.push({
        endpoint,
        success: true,
        network: network.name,
        latestBlock: latestBlock.number,
        error: null,
      });

      console.log(`✅ ${endpoint} - 成功`);
    } catch (error) {
      results.push({
        endpoint,
        success: false,
        network: null,
        latestBlock: null,
        error: error.message,
      });

      console.log(`❌ ${endpoint} - 失敗: ${error.message}`);
    }
  }

  return results;
};

// 在瀏覽器控制台中運行測試
if (typeof window !== "undefined") {
  window.testRpcConnection = testRpcConnection;
  window.testMultipleEndpoints = testMultipleEndpoints;
}
