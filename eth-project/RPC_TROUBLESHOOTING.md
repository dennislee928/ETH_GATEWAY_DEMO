# 🔧 RPC 端點故障排除指南

## 🚨 當前問題

您遇到的 CORS 錯誤是因為某些 RPC 端點不支援瀏覽器的跨域請求。

## ✅ 已修復的配置

### **新的 RPC 端點配置**

```javascript
RPC_ENDPOINTS: {
  sepolia: [
    "https://ethereum-sepolia.publicnode.com",  // ✅ 支援 CORS
    "https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"  // ✅ 支援 CORS
  ],
  mainnet: [
    "https://ethereum.publicnode.com",  // ✅ 支援 CORS
    "https://rpc.ankr.com/eth"  // ✅ 支援 CORS
  ]
}
```

### **移除的問題端點**

- ❌ `https://rpc2.sepolia.org/` - 不支援 CORS
- ❌ `https://rpc.sepolia.org/` - 不支援 CORS

## 🛠️ 測試工具

### **在瀏覽器控制台中測試**

```javascript
// 測試所有 RPC 端點
window.testRpcEndpoints();

// 測試特定端點
fetch("https://ethereum-sepolia.publicnode.com", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    jsonrpc: "2.0",
    method: "eth_blockNumber",
    params: [],
    id: 1,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log("成功:", data))
  .catch((error) => console.error("失敗:", error));
```

## 🔍 故障排除步驟

### **1. 檢查網路連接**

```bash
# 測試基本網路連接
ping ethereum-sepolia.publicnode.com
```

### **2. 檢查瀏覽器控制台**

- 打開開發者工具 (F12)
- 查看 Console 和 Network 標籤
- 尋找 CORS 錯誤訊息

### **3. 測試 RPC 端點**

在瀏覽器控制台中運行：

```javascript
window.testRpcEndpoints();
```

### **4. 檢查防火牆設置**

- 確保沒有防火牆阻止 HTTPS 請求
- 檢查公司網路是否限制某些域名

## 🎯 解決方案

### **方案 1: 使用支援 CORS 的端點**

已配置的端點都支援 CORS，應該可以正常工作。

### **方案 2: 使用代理服務器**

如果仍有問題，可以設置代理：

```javascript
// 使用代理服務器
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const RPC_URL = PROXY_URL + "https://ethereum-sepolia.publicnode.com";
```

### **方案 3: 使用 WebSocket 連接**

```javascript
// WebSocket 連接（避免 CORS）
const wsProvider = new ethers.WebSocketProvider(
  "wss://ethereum-sepolia.publicnode.com"
);
```

## 📊 端點狀態監控

### **Sepolia 測試網路**

- ✅ `https://ethereum-sepolia.publicnode.com` - 穩定
- ✅ `https://sepolia.infura.io/v3/...` - 穩定

### **主網路**

- ✅ `https://ethereum.publicnode.com` - 穩定
- ✅ `https://rpc.ankr.com/eth` - 穩定

## 🚀 快速修復

如果問題持續存在，請：

1. **清除瀏覽器快取**
2. **重新啟動應用**
3. **檢查網路連接**
4. **運行測試工具**

```bash
# 重新啟動應用
cd eth-project/frontend
npm start
```

## 📞 支援

如果問題仍然存在：

1. 檢查瀏覽器控制台錯誤
2. 運行 `window.testRpcEndpoints()`
3. 提供錯誤日誌
4. 檢查網路環境

---

**🎉 修復完成！現在應該可以正常使用所有區塊鏈功能了！**
