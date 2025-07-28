# 故障排除指南

## 已修復的問題

### 1. CORS 錯誤

**問題**: `https://rpc2.sepolia.org/` 不支援瀏覽器的跨域請求
**解決方案**:

- 改用支援 CORS 的 RPC 端點
- 使用 `https://ethereum-sepolia.publicnode.com` 作為主要端點
- 備選端點: `https://rpc.sepolia.org`, `https://sepolia.infura.io`

### 2. 無效的以太坊地址格式

**問題**: 地址 `x742d35Cc6634C0532925a3b844Bc454e4438f44e` 缺少 `0x` 前綴
**解決方案**:

- 添加地址格式驗證
- 正確的地址格式: `0x742d35Cc6634C0532925a3b844Bc454e4438f44e`

### 3. 網路連接問題

**問題**: RPC 提供者無法檢測網路
**解決方案**:

- 使用集中化的配置管理
- 添加重試機制
- 改進錯誤處理

## 配置檔案

### 區塊鏈配置 (`frontend/src/config/blockchain.js`)

```javascript
export const BLOCKCHAIN_CONFIG = {
  RPC_ENDPOINTS: {
    sepolia: [
      "https://ethereum-sepolia.publicnode.com",
      "https://rpc.sepolia.org",
      "https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    ],
  },
  NETWORKS: {
    sepolia: {
      chainId: 11155111,
      name: "sepolia",
      currency: "ETH",
      explorer: "https://sepolia.etherscan.io",
    },
  },
};
```

## 測試連接

### 在瀏覽器控制台中測試

```javascript
// 測試當前 RPC 連接
await window.testRpcConnection();

// 測試多個 RPC 端點
await window.testMultipleEndpoints();
```

### 手動測試

1. 打開瀏覽器開發者工具
2. 在控制台中輸入測試命令
3. 檢查結果和錯誤訊息

## 常見錯誤及解決方案

### 1. "CORS Missing Allow Origin"

**原因**: RPC 端點不支援瀏覽器請求
**解決方案**: 使用支援 CORS 的端點

### 2. "unconfigured name"

**原因**: 無效的以太坊地址格式
**解決方案**: 確保地址以 `0x` 開頭且長度正確

### 3. "NetworkError when attempting to fetch resource"

**原因**: 網路連接問題或 RPC 端點不可用
**解決方案**:

- 檢查網路連接
- 嘗試其他 RPC 端點
- 等待一段時間後重試

### 4. "JsonRpcProvider failed to detect network"

**原因**: RPC 端點響應慢或不可用
**解決方案**:

- 使用更穩定的 RPC 端點
- 增加超時時間
- 添加重試機制

## 開發建議

### 1. 使用環境變數

```javascript
// 在 .env 檔案中
REACT_APP_RPC_ENDPOINT=https://ethereum-sepolia.publicnode.com
REACT_APP_NETWORK=sepolia
```

### 2. 添加錯誤邊界

```javascript
// 在 React 組件中添加錯誤處理
try {
  const result = await provider.getBalance(address);
} catch (error) {
  console.error("Error:", error);
  // 顯示用戶友好的錯誤訊息
}
```

### 3. 實現重試機制

```javascript
const retryOperation = async (operation, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

## 監控和日誌

### 啟用詳細日誌

```javascript
// 在開發環境中啟用詳細日誌
if (process.env.NODE_ENV === "development") {
  console.log("RPC 端點:", endpoint);
  console.log("網路配置:", networkConfig);
}
```

### 錯誤追蹤

- 使用瀏覽器開發者工具監控網路請求
- 檢查控制台錯誤訊息
- 監控 RPC 端點的響應時間

## 聯繫支援

如果問題持續存在，請：

1. 檢查網路連接
2. 嘗試不同的 RPC 端點
3. 查看瀏覽器控制台的詳細錯誤訊息
4. 提供錯誤日誌和重現步驟
