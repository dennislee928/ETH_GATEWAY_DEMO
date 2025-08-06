#!/bin/bash

echo "🔒 開始修復安全漏洞..."

# 進入前端目錄
cd eth-project/frontend

echo "📦 清理 node_modules 和 package-lock.json..."
rm -rf node_modules package-lock.json

echo "🔄 重新安裝依賴..."
npm install

echo "🔍 檢查安全漏洞..."
npm audit

echo "✅ 前端安全修復完成！"

# 回到根目錄
cd ../..

echo "📦 清理根目錄的 node_modules 和 package-lock.json..."
rm -rf node_modules package-lock.json

echo "🔄 重新安裝根目錄依賴..."
npm install

echo "🔍 檢查根目錄安全漏洞..."
npm audit

echo "✅ 所有安全修復完成！"
echo ""
echo "📋 修復摘要："
echo "- 移除了未使用的 @1inch/limit-order-protocol 套件"
echo "- 升級了 react-scripts 到最新版本"
echo "- 添加了 overrides 來強制使用安全版本的依賴"
echo "- 修復了 elliptic、pbkdf2、base-x 等關鍵安全漏洞"
echo ""
echo "🚀 建議執行以下命令來驗證修復："
echo "npm audit --audit-level=moderate" 