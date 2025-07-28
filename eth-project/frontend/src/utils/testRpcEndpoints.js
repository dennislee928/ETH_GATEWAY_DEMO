// RPC 端點測試工具
export const testRpcEndpoints = async () => {
  const endpoints = [
    {
      name: "PublicNode Sepolia",
      url: "https://ethereum-sepolia.publicnode.com",
      network: "sepolia",
    },
    {
      name: "Infura Sepolia",
      url: "https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      network: "sepolia",
    },
    {
      name: "PublicNode Mainnet",
      url: "https://ethereum.publicnode.com",
      network: "mainnet",
    },
    {
      name: "Ankr Mainnet",
      url: "https://rpc.ankr.com/eth",
      network: "mainnet",
    },
  ];

  const results = [];

  for (const endpoint of endpoints) {
    try {
      console.log(`測試端點: ${endpoint.name} (${endpoint.url})`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(endpoint.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_blockNumber",
          params: [],
          id: 1,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.result) {
          results.push({
            name: endpoint.name,
            url: endpoint.url,
            network: endpoint.network,
            status: "✅ 成功",
            blockNumber: parseInt(data.result, 16),
          });
          console.log(
            `✅ ${endpoint.name} - 成功 (區塊: ${parseInt(data.result, 16)})`
          );
        } else {
          results.push({
            name: endpoint.name,
            url: endpoint.url,
            network: endpoint.network,
            status: "❌ 失敗",
            error: "無效回應",
          });
          console.log(`❌ ${endpoint.name} - 無效回應`);
        }
      } else {
        results.push({
          name: endpoint.name,
          url: endpoint.url,
          network: endpoint.network,
          status: "❌ 失敗",
          error: `HTTP ${response.status}`,
        });
        console.log(`❌ ${endpoint.name} - HTTP ${response.status}`);
      }
    } catch (error) {
      results.push({
        name: endpoint.name,
        url: endpoint.url,
        network: endpoint.network,
        status: "❌ 失敗",
        error: error.message,
      });
      console.log(`❌ ${endpoint.name} - ${error.message}`);
    }
  }

  console.log("\n=== RPC 端點測試結果 ===");
  results.forEach((result) => {
    console.log(`${result.status} ${result.name} (${result.network})`);
    if (result.blockNumber) {
      console.log(`  區塊號: ${result.blockNumber}`);
    }
    if (result.error) {
      console.log(`  錯誤: ${result.error}`);
    }
  });

  return results;
};

// 在瀏覽器控制台中運行測試
if (typeof window !== "undefined") {
  window.testRpcEndpoints = testRpcEndpoints;
  console.log("RPC 測試工具已載入，使用 window.testRpcEndpoints() 來測試端點");
}
