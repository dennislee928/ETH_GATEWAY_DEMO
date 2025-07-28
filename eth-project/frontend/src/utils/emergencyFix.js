// 緊急修復腳本 - 強制清除快取並重新載入
export const emergencyFix = () => {
  console.log("🚨 執行緊急修復...");

  // 清除所有可能的快取
  if (typeof window !== "undefined") {
    // 清除 localStorage
    localStorage.clear();

    // 清除 sessionStorage
    sessionStorage.clear();

    // 清除 IndexedDB
    if ("indexedDB" in window) {
      indexedDB.databases().then((databases) => {
        databases.forEach((db) => {
          indexedDB.deleteDatabase(db.name);
        });
      });
    }

    // 強制重新載入頁面
    console.log("🔄 強制重新載入頁面...");
    window.location.reload(true); // true = 強制從服務器重新載入
  }
};

// 測試 RPC 端點並自動修復
export const testAndFixRpc = async () => {
  console.log("🔍 測試 RPC 端點...");

  const testEndpoints = [
    "https://ethereum-sepolia.publicnode.com",
    "https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  ];

  for (const endpoint of testEndpoints) {
    try {
      console.log(`測試端點: ${endpoint}`);

      const response = await fetch(endpoint, {
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
      });

      if (response.ok) {
        const data = await response.json();
        if (data.result) {
          console.log(`✅ ${endpoint} - 工作正常`);
          return endpoint;
        }
      }
    } catch (error) {
      console.log(`❌ ${endpoint} - 失敗: ${error.message}`);
    }
  }

  console.log("🚨 所有端點都失敗，執行緊急修復...");
  emergencyFix();
};

// 在瀏覽器控制台中可用
if (typeof window !== "undefined") {
  window.emergencyFix = emergencyFix;
  window.testAndFixRpc = testAndFixRpc;

  console.log("🚨 緊急修復工具已載入:");
  console.log("  - window.emergencyFix() - 強制清除快取並重新載入");
  console.log("  - window.testAndFixRpc() - 測試 RPC 端點並自動修復");
}
