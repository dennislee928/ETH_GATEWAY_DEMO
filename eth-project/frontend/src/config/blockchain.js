// 區塊鏈配置檔案
export const BLOCKCHAIN_CONFIG = {
  // RPC 端點配置 - 只使用支援 CORS 的端點
  RPC_ENDPOINTS: {
    sepolia: [
      "https://ethereum-sepolia.publicnode.com",
      "https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    ],
    mainnet: ["https://ethereum.publicnode.com", "https://rpc.ankr.com/eth"],
  },

  // 網路配置
  NETWORKS: {
    sepolia: {
      chainId: 11155111,
      name: "sepolia",
      currency: "ETH",
      explorer: "https://sepolia.etherscan.io",
    },
    mainnet: {
      chainId: 1,
      name: "mainnet",
      currency: "ETH",
      explorer: "https://etherscan.io",
    },
  },

  // 預設網路
  DEFAULT_NETWORK: "sepolia",

  // 重試配置
  RETRY_CONFIG: {
    maxRetries: 3,
    retryDelay: 1000,
    timeout: 10000,
  },
};

// 獲取可用的 RPC 端點
export const getRpcEndpoint = (network = BLOCKCHAIN_CONFIG.DEFAULT_NETWORK) => {
  const endpoints = BLOCKCHAIN_CONFIG.RPC_ENDPOINTS[network];
  if (!endpoints || endpoints.length === 0) {
    throw new Error(`未找到網路 ${network} 的 RPC 端點配置`);
  }

  // 強制使用第一個端點（支援 CORS 的端點）
  const endpoint = endpoints[0];
  console.log(`🔧 使用 RPC 端點: ${endpoint}`);
  return endpoint;
};

// 獲取網路配置
export const getNetworkConfig = (
  network = BLOCKCHAIN_CONFIG.DEFAULT_NETWORK
) => {
  const config = BLOCKCHAIN_CONFIG.NETWORKS[network];
  if (!config) {
    throw new Error(`未找到網路 ${network} 的配置`);
  }
  return config;
};

// 驗證以太坊地址
export const validateAddress = (address) => {
  if (!address) return false;

  // 檢查基本格式
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return false;
  }

  return true;
};

// 格式化錯誤訊息
export const formatErrorMessage = (error) => {
  if (error.code === "UNCONFIGURED_NAME") {
    return "無效的以太坊地址格式";
  }
  if (error.code === "NETWORK_ERROR") {
    return "網路連接錯誤，請檢查網路連接";
  }
  if (error.code === "TIMEOUT") {
    return "請求超時，請稍後重試";
  }
  if (error.code === "CORS_ERROR") {
    return "跨域請求被阻止，請檢查網路設置";
  }
  if (error.message.includes("fetch")) {
    return "網路請求失敗，請檢查網路連接";
  }
  return error.message || "未知錯誤";
};

// 重試機制
export const retryOperation = async (operation, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};

// 清除快取並重新載入配置
export const clearCacheAndReload = () => {
  console.log("🧹 清除快取並重新載入配置...");
  if (typeof window !== "undefined") {
    // 清除 localStorage 中的任何快取
    localStorage.removeItem("rpc_endpoint_cache");
    localStorage.removeItem("network_config_cache");

    // 強制重新載入頁面
    window.location.reload();
  }
};
