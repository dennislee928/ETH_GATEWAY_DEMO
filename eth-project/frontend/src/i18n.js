import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 獲取用戶偏好的語言
const getPreferredLanguage = () => {
  const savedLanguage = localStorage.getItem("preferredLanguage");
  if (savedLanguage) {
    return savedLanguage;
  }

  // 檢查瀏覽器語言
  const browserLanguage = navigator.language || navigator.userLanguage;
  if (browserLanguage.startsWith("zh")) {
    return "zh";
  }

  return "en";
};

const resources = {
  en: {
    translation: {
      // Advanced Features
      transactionDetails: "Transaction Details",
      blockDetails: "Block Details",
      gasPrice: "Gas Price",
      ensLookup: "ENS Lookup",
      features: "Features",
      enterBlockNumber: "Enter block number",
      success: "Success",
      failed: "Failed",

      // Instructions
      howToUse: "How to Use",
      instructions: "Instructions",

      // Transaction Instructions
      transactionInstructionsTitle: "智能交易分析",
      transactionInstruction1: "輸入交易哈希進行深度分析",
      transactionInstruction2: "查看交易詳情、狀態和 Gas 消耗",

      // Network Instructions
      networkInstructionsTitle: "即時網路監控",
      networkInstruction1: "實時檢查當前網路狀態和擁塞情況",
      networkInstruction2: "查看最新區塊資訊和網路統計",

      // Gas Instructions
      gasInstructions: "Gas 費用優化指南",
      gasInstruction1: "實時監控當前 Gas 價格趨勢",
      gasInstruction2: "智能建議最佳 Gas 限制設置",

      // Token Instructions
      tokenInstructions: "代幣資產管理",
      tokenInstruction1: "輸入代幣合約地址進行詳細分析",
      tokenInstruction2: "查看代幣詳情、轉帳記錄和持有者資訊",

      // ENS Instructions
      ensInstructions: "ENS 域名解析",
      ensInstruction1: "輸入 ENS 域名進行快速解析",
      ensInstruction2: "獲取對應的 ETH 地址和反向解析",

      // Tabs
      events: "智能事件",
      contracts: "合約分析",
      network: "網路監控",
      transactions: "交易追蹤",

      // Event Related
      transferEvents: "轉帳事件監控",
      enterContractAddress: "輸入智能合約地址",
      watchTransfers: "即時監聽轉帳",
      getHistory: "獲取歷史記錄",

      // Event Instructions
      eventInstructionsTitle: "智能事件監控系統",
      eventInstruction1: "輸入合約地址開始智能監控",
      eventInstruction2: "即時監控轉帳和合約事件",
      eventInstruction3: "查看完整的轉帳歷史和分析",
      eventExample: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",

      // Tips
      tips: "專業提示",
      eventTip1: "監控大型合約時注意 Gas 消耗和網路擁塞",
      eventTip2: "使用 WebSocket 連接以獲得更好的實時性能",
      eventTip3: "使用智能過濾器只監聽您感興趣的特定事件",

      // Examples
      example: "實用範例",

      // Contract Tips
      contractTip1: "驗證智能合約原始碼確保安全性",
      contractTip2: "檢查合約餘額和代幣持有情況",
      contractTip3: "檢視合約互動歷史和調用記錄",

      // Network Tips
      networkTip1: "實時監控網路擁塞狀況和 Gas 價格",
      networkTip2: "定期檢查網路狀態以選擇最佳交易時機",
      networkTip3: "根據需求選擇適當的網路（主網/測試網）",

      // Transaction Tips
      txTip1: "仔細驗證交易詳情和接收地址",
      txTip2: "根據網路狀況調整 Gas 設定",
      txTip3: "實時監控交易狀態和確認數",

      // Wallet connection translations
      connecting: "Connecting...",
      disconnect: "Disconnect",
      checkMetamask: "Please check MetaMask popup",
      metamaskRequired: "MetaMask required",
      metamaskInstallMessage:
        "Please install MetaMask extension to use this feature",
      installMetamask: "Install MetaMask",
      close: "Close",

      guessNumber: "Guess the Number",
      gameDescription:
        "Guess a number between 1 and 10. Cost: 0.01 ETH(in Sepolia) per guess",
      connectWallet: "Connect Wallet",
      connectedAs: "Connected as",
      enterNumberPlaceholder: "Enter a number (1-10)",
      play: "Play",
      playing: "Playing...",
      waiting: "Waiting for confirmation...",
      youWon: "Congratulations! You won!",
      youLost: "Sorry, try again!",
      gameError: "Game error occurred",
      pleaseConnect: "Please connect your wallet first",
      invalidNumber: "Please enter a number between 1 and 10",
      noMetamask: "Please install MetaMask",
      connectionError: "Connection error",
      gameRules: "Game Rules",
      gameRule1: "Choose a number between 1 and 10",
      gameRule2: "Pay 0.01 ETH(in Sepolia) to play",
      gameRule3: "Win double your bet if you guess correctly",

      // Navigation translations
      home: "Home",
      blockchainExplorer: "Blockchain Explorer",
      advancedFeatures: "Advanced Tools",
      addsOn: "Developer Tools",
      faucet: "Testnet Faucet",

      // Common translations
      invalidAddress: "Invalid Ethereum address format",
      loading: "Loading...",
      error: "An error occurred",

      // Home page translations
      welcomeTitle: "Welcome to ETH Gateway Blockchain Toolkit",
      welcomeSubtitle:
        "Discover powerful Ethereum blockchain tools, from basic exploration to advanced development - all in one comprehensive platform",
      blockchainExplorerDesc:
        "Dive deep into the Ethereum network, search transaction records, block information, and wallet addresses to understand every detail of the blockchain",
      advancedFeaturesDesc:
        "Monitor smart contract events, analyze gas fees, resolve ENS domains, and access professional-grade blockchain analytics tools",
      blockchainGame: "Blockchain Game",
      blockchainGameDesc:
        "Experience true blockchain gaming with our smart contract-powered number guessing game, feel the magic of decentralized applications",
      faucetDesc:
        "Get free ETH on Sepolia testnet for development, testing, and learning blockchain technology",
      aboutTitle: "About ETH Gateway",
      aboutDescription:
        "ETH Gateway is a comprehensive Ethereum blockchain development platform built with React and Ethers.js technology stack. Whether you're a blockchain beginner or an experienced developer, you'll find the tools and resources you need here. Connect your MetaMask wallet and start exploring the unlimited possibilities of blockchain technology.",
      techStack: "Technology Architecture",
    },
  },
  zh: {
    translation: {
      // 繁體中文翻譯
      transactionDetails: "交易詳情",
      blockDetails: "區塊詳情",
      gasPrice: "Gas 價格",
      ensLookup: "ENS 查詢",
      features: "功能",
      enterBlockNumber: "輸入區塊號碼",
      success: "成功",
      failed: "失敗",

      // 說明
      howToUse: "使用說明",
      instructions: "操作指南",

      // 交易說明
      transactionInstructionsTitle: "智能交易分析",
      transactionInstruction1: "輸入交易哈希進行深度分析",
      transactionInstruction2: "查看交易詳情、狀態和 Gas 消耗",

      // 網路說明
      networkInstructionsTitle: "即時網路監控",
      networkInstruction1: "實時檢查當前網路狀態和擁塞情況",
      networkInstruction2: "查看最新區塊資訊和網路統計",

      // Gas 說明
      gasInstructions: "Gas 費用優化指南",
      gasInstruction1: "實時監控當前 Gas 價格趨勢",
      gasInstruction2: "智能建議最佳 Gas 限制設置",

      // 代幣說明
      tokenInstructions: "代幣資產管理",
      tokenInstruction1: "輸入代幣合約地址進行詳細分析",
      tokenInstruction2: "查看代幣詳情、轉帳記錄和持有者資訊",

      // ENS 說明
      ensInstructions: "ENS 域名解析",
      ensInstruction1: "輸入 ENS 域名進行快速解析",
      ensInstruction2: "獲取對應的 ETH 地址和反向解析",

      // 分頁
      events: "智能事件",
      contracts: "合約分析",
      network: "網路監控",
      transactions: "交易追蹤",

      // 事件相關
      transferEvents: "轉帳事件監控",
      enterContractAddress: "輸入智能合約地址",
      watchTransfers: "即時監聽轉帳",
      getHistory: "獲取歷史記錄",

      // 事件說明
      eventInstructionsTitle: "智能事件監控系統",
      eventInstruction1: "輸入合約地址開始智能監控",
      eventInstruction2: "即時監控轉帳和合約事件",
      eventInstruction3: "查看完整的轉帳歷史和分析",
      eventExample: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",

      // 提示
      tips: "專業提示",
      eventTip1: "監控大型合約時注意 Gas 消耗和網路擁塞",
      eventTip2: "使用 WebSocket 連接以獲得更好的實時性能",
      eventTip3: "使用智能過濾器只監聽您感興趣的特定事件",

      // 範例
      example: "實用範例",

      // 合約提示
      contractTip1: "驗證智能合約原始碼確保安全性",
      contractTip2: "檢查合約餘額和代幣持有情況",
      contractTip3: "檢視合約互動歷史和調用記錄",

      // 網路提示
      networkTip1: "實時監控網路擁塞狀況和 Gas 價格",
      networkTip2: "定期檢查網路狀態以選擇最佳交易時機",
      networkTip3: "根據需求選擇適當的網路（主網/測試網）",

      // Navigation translations
      home: "首頁",
      blockchainExplorer: "區塊鏈瀏覽器",
      advancedFeatures: "進階功能",
      addsOn: "附加工具",
      faucet: "測試幣水龍頭",

      // Common translations
      invalidAddress: "無效的以太坊地址格式",
      loading: "載入中...",
      error: "發生錯誤",

      // Home page translations
      welcomeTitle: "歡迎來到 ETH Gateway 區塊鏈工具集",
      welcomeSubtitle:
        "探索以太坊區塊鏈的強大工具，從基礎瀏覽到進階開發，一站式解決您的區塊鏈需求",
      blockchainExplorerDesc:
        "深入探索以太坊網路，搜尋交易記錄、區塊資訊和錢包地址，掌握區塊鏈的每個細節",
      advancedFeaturesDesc:
        "監控智能合約事件、分析 Gas 費用、解析 ENS 域名，提供專業級的區塊鏈分析工具",
      blockchainGame: "區塊鏈遊戲",
      blockchainGameDesc:
        "體驗真正的區塊鏈遊戲，使用智能合約進行猜數字遊戲，感受去中心化應用的魅力",
      faucetDesc: "獲取 Sepolia 測試網的免費 ETH，用於開發測試和學習區塊鏈技術",
      aboutTitle: "關於 ETH Gateway",
      aboutDescription:
        "ETH Gateway 是一個功能完整的以太坊區塊鏈開發平台，整合了 React 和 Ethers.js 技術棧。無論您是區塊鏈新手還是資深開發者，都能在這裡找到所需的工具和資源。連接您的 MetaMask 錢包，開始探索區塊鏈的無限可能。",
      techStack: "技術架構",

      // 交易提示
      txTip1: "仔細驗證交易詳情和接收地址",
      txTip2: "根據網路狀況調整 Gas 設定",
      txTip3: "實時監控交易狀態和確認數",

      // 錢包連接翻譯
      connecting: "正在連接錢包...",
      disconnect: "斷開錢包連接",
      checkMetamask: "請檢查 MetaMask 彈窗並確認連接",
      metamaskRequired: "需要 MetaMask 錢包",
      metamaskInstallMessage: "請安裝 MetaMask 瀏覽器擴展以使用區塊鏈功能",
      installMetamask: "安裝 MetaMask",
      close: "關閉",

      guessNumber: "區塊鏈猜數字遊戲",
      gameDescription:
        "猜一個 1-10 之間的數字，每次猜測需要支付 0.01 ETH（Sepolia 測試網）",
      connectWallet: "連接錢包",
      connectedAs: "已連接為",
      enterNumberPlaceholder: "請輸入一個數字 (1-10)",
      play: "開始遊戲",
      playing: "遊戲進行中...",
      waiting: "等待交易確認...",
      youWon: "恭喜！您贏了！",
      youLost: "很遺憾，請再試一次！",
      gameError: "遊戲發生錯誤",
      pleaseConnect: "請先連接您的錢包",
      invalidNumber: "請輸入 1-10 之間的數字",
      noMetamask: "請安裝 MetaMask 錢包",
      connectionError: "連接發生錯誤",
      gameRules: "遊戲規則",
      gameRule1: "選擇 1-10 之間的一個數字",
      gameRule2: "支付 0.01 ETH（Sepolia 測試網）進行遊戲",
      gameRule3: "如果猜對，您將獲得雙倍獎勵",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: getPreferredLanguage(),
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
