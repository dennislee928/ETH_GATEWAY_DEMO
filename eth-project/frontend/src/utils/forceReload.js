// 強制重新載入腳本
export const forceReload = () => {
  console.log("🔄 強制重新載入應用...");

  if (typeof window !== "undefined") {
    // 清除所有快取
    localStorage.clear();
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
    window.location.reload(true);
  }
};

// 測試當前配置
export const testCurrentConfig = () => {
  console.log("🔍 測試當前配置...");

  try {
    const {
      getRpcEndpoint,
      getNetworkConfig,
    } = require("../config/blockchain");

    const endpoint = getRpcEndpoint();
    const network = getNetworkConfig();

    console.log("✅ 當前 RPC 端點:", endpoint);
    console.log("✅ 當前網路配置:", network);

    return { endpoint, network };
  } catch (error) {
    console.error("❌ 配置測試失敗:", error);
    return null;
  }
};

// 在瀏覽器控制台中可用
if (typeof window !== "undefined") {
  window.forceReload = forceReload;
  window.testCurrentConfig = testCurrentConfig;

  console.log("🔄 強制重新載入工具已載入:");
  console.log("  - window.forceReload() - 強制重新載入");
  console.log("  - window.testCurrentConfig() - 測試當前配置");
}
