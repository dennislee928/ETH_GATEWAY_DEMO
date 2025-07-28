# 🚨 緊急修復指南 - RPC 端點問題

## 🚨 當前問題

應用程式仍然在使用有問題的 RPC 端點 `https://rpc.sepolia.org`，導致 CORS 錯誤。

## 🔧 立即解決方案

### **方法 1: 使用瀏覽器控制台修復**

1. 打開瀏覽器開發者工具 (F12)
2. 在 Console 標籤中執行：

```javascript
// 測試並自動修復
window.testAndFixRpc();

// 或者強制清除快取並重新載入
window.emergencyFix();
```

### **方法 2: 手動清除快取**

1. 按 `Ctrl+Shift+R` (Windows) 或 `Cmd+Shift+R` (Mac) 強制重新載入
2. 或者在開發者工具中按右鍵點擊重新載入按鈕，選擇「清空快取並硬性重新載入」

### **方法 3: 清除瀏覽器資料**

1. 打開瀏覽器設定
2. 清除瀏覽資料
3. 選擇「快取的圖片和檔案」
4. 重新載入頁面

## 🔍 驗證修復

### **檢查控制台輸出**

應該看到：

```
🔧 使用 RPC 端點: https://ethereum-sepolia.publicnode.com
```

而不是：

```
使用的 Gateway: https://rpc.sepolia.org
```

### **測試 RPC 連接**

在控制台執行：

```javascript
window.testRpcEndpoints();
```

應該看到成功的結果。

## 🛠️ 技術細節

### **已修復的配置**

```javascript
RPC_ENDPOINTS: {
  sepolia: [
    "https://ethereum-sepolia.publicnode.com", // ✅ 主要端點
    "https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // ✅ 備用端點
  ];
}
```

### **移除的問題端點**

- ❌ `https://rpc.sepolia.org` - 不支援 CORS
- ❌ `https://rpc2.sepolia.org` - 不支援 CORS

## 🚀 重新啟動應用

如果問題持續存在：

```bash
# 停止開發服務器
Ctrl+C

# 清除 node_modules 快取
rm -rf node_modules/.cache

# 重新安裝依賴
npm install

# 重新啟動
npm start
```

## 📞 如果問題仍然存在

1. **檢查網路連接**
2. **嘗試不同的瀏覽器**
3. **檢查防火牆設置**
4. **使用無痕模式測試**

## 🎯 預期結果

修復後應該看到：

- ✅ 沒有 CORS 錯誤
- ✅ 成功連接到 RPC 端點
- ✅ 區塊鏈功能正常工作
- ✅ 錢包連接正常

---

**🎉 修復完成後，所有區塊鏈功能應該可以正常使用！**
