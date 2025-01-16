import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      title: "Holesky Explorer",
      subtitle: "Explore the Ethereum Test Network",
      walletInfo: "Wallet Information",
      blockchainExplorer: "Blockchain Explorer",

      // Events Instructions
      eventInstructionsTitle: "Monitor Token Transfers",
      eventInstruction1:
        "Enter the token contract address to monitor transfers",
      eventInstruction2:
        "Click 'Watch' to start real-time monitoring of transfers",
      eventInstruction3: "View transfer history and track token movements",

      // Contract Instructions
      contractInstructionsTitle: "Smart Contract Information",
      contractInstruction1: "Enter the smart contract address",
      contractInstruction2:
        "View contract details including name, symbol, and decimals",

      // Network Instructions
      networkInstructionsTitle: "Network Status",
      networkInstruction1:
        "Click 'Refresh Stats' to get latest network information",
      networkInstruction2:
        "Enter address and click 'Check Address' for details",

      // Transaction Instructions
      transactionInstructionsTitle: "Transaction Analysis",
      transactionInstruction1: "Enter a transaction hash to analyze",
      transactionInstruction2:
        "View detailed transaction information including status and gas usage",

      // Examples
      example: "Example Address",
      eventExample:
        "0x742d35Cc6634C0532925a3b844Bc454e4438f44e (USDT Contract)",
      contractExample: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984 (UNI Token)",
      networkExample: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 (WETH)",
      transactionExample: "0x123... (Any valid transaction hash)",

      // Tips
      tips: "Important Tips",
      tip1: "Always verify contract addresses on Etherscan before interacting",
      tip2: "Monitor gas prices to optimize transaction costs",
      tip3: "Use Sepolia testnet for testing before mainnet deployment",

      // UI Elements
      instructions: "Usage Instructions",
      loading: "Loading...",
      error: "An error occurred",

      // Tabs
      events: "Events",
      contracts: "Contracts",
      network: "Network",
      transactions: "Transactions",

      // Buttons
      watchTransfers: "Watch Transfers",
      getHistory: "Get History",
      getContractInfo: "Get Contract Info",
      refreshStats: "Refresh Stats",
      checkAddress: "Check Address",
      parseTransaction: "Analyze Transaction",

      // Input Placeholders
      enterContractAddress: "Enter contract address",
      enterTxHash: "Enter transaction hash",
      enterAddress: "Enter address",
      enterEnsName: "Enter ENS name",

      // Error Messages
      txError: "Failed to fetch transaction details",
      blockError: "Failed to fetch block details",
      contractError: "Failed to fetch contract information",
      eventError: "Failed to monitor events",
      historyError: "Failed to fetch transfer history",
      networkError: "Failed to fetch network stats",
      addressError: "Failed to check address",
      ensError: "Failed to resolve ENS name",

      explorerName: "Blockchain Explorer",
      footerDescription:
        "Explore the Ethereum network with ease. Real-time data, smart contract interactions, and more.",
      networkStatus: "Network: Sepolia Testnet",
      usefulResources: "Useful Resources",
      followUs: "Follow Me",
      etherscan: "Etherscan",
      docs: "Documentation",
      faucet: "Sepolia Faucet",
      copyright: "© {{year}} Blockchain Explorer. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contact: "Contact Us",

      // Navbar 相關
      home: "Home",

      // Faucet 頁面相關
      faucetTitle: "Sepolia Testnet Faucet",

      checkBalance: "Check Balance",
      currentBalance: "Current Balance",
      monitoringStatus: "Monitoring...",
      receivedTokens: "Received Tokens!",

      // Faucet 說明
      faucetDescription: "Get test ETH for Sepolia network",
      availableFaucets: "Available Faucets",
      quickNodeFaucet: "QuickNode (Recommended)",
      powFaucet: "PoW Mining Faucet",

      // Faucet 特性
      captchaOnly: "Captcha verification only",
      dailyClaim: "Can claim daily",
      noVerification: "No verification needed",
      browserMining: "Browser mining",

      // 錯誤訊息
      invalidAddress: "Invalid ETH address",

      checkingBalance: "Checking balance...",

      // 按鈕文字
      refresh: "Refresh",
      stop: "Stop Monitoring",
      claim: "Claim Tokens",

      // Events Section

      eventTip1: "Monitor gas consumption when watching large contracts",
      eventTip2: "Use WebSocket provider for better performance",
      eventTip3: "Use filters to monitor specific events only",
    },
  },
  zh: {
    translation: {
      title: "Holesky 瀏覽器",
      subtitle: "探索以太坊測試網路的世界",
      walletInfo: "錢包資訊",
      blockchainExplorer: "區塊鏈瀏覽器",

      // Events Instructions
      eventInstructionsTitle: "代幣轉帳監控",
      eventInstruction1: "輸入代幣合約地址以監控轉帳",
      eventInstruction2: "點擊「監控」開始即時追蹤轉帳",
      eventInstruction3: "查看轉帳歷史記錄和追蹤代幣流向",

      // Contract Instructions
      contractInstructionsTitle: "智能合約資訊",
      contractInstruction1: "輸入智能合約地址",
      contractInstruction2: "查看合約詳情，包括名稱、符號和小數位",

      // Network Instructions
      networkInstructionsTitle: "網路狀態",
      networkInstruction1: "點擊「刷新狀態」獲取最新網路資訊",
      networkInstruction2: "輸入地址並點擊「檢查地址」查看詳情",

      // Transaction Instructions
      transactionInstructionsTitle: "交易分析",
      transactionInstruction1: "輸入交易哈希進行分析",
      transactionInstruction2: "查看詳細交易資訊，包括狀態和 gas 使用情況",

      // Examples
      example: "範例地址",
      eventExample: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e (USDT合約)",
      contractExample: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984 (UNI代幣)",
      networkExample: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 (WETH)",
      transactionExample: "0x123... (任何有效的交易哈希)",

      // Tips
      tips: "重要提示",
      tip1: "與合約互動前，請務必在 Etherscan 上驗證合約地址",
      tip2: "監控 gas 價格以優化交易成本",
      tip3: "在部署到主網前，請先在 Sepolia 測試網進行測試",

      // UI Elements
      instructions: "使用說明",
      loading: "載入中...",
      error: "發生錯誤",

      // Tabs
      events: "事件",
      contracts: "合約",
      network: "網路",
      transactions: "交易",

      // Buttons
      watchTransfers: "監聽轉帳",
      getHistory: "獲取歷史",
      getContractInfo: "獲取合約資訊",
      refreshStats: "刷新狀態",
      checkAddress: "檢查地址",
      parseTransaction: "分析交易",

      // Input Placeholders
      enterContractAddress: "輸入合約地址",
      enterTxHash: "輸入交易哈希",
      enterAddress: "輸入地址",
      enterEnsName: "輸入 ENS 名稱",

      // Error Messages
      txError: "無法獲取交易詳情",
      blockError: "無法獲取區塊詳情",
      contractError: "無法獲取合約資訊",
      eventError: "無法監控事件",
      historyError: "無法獲取轉帳歷史",
      networkError: "無法獲取網路狀態",
      addressError: "無法檢查地址",
      ensError: "無法解析 ENS 名稱",

      explorerName: "區塊鏈瀏覽器",
      footerDescription: "輕鬆探索以太坊網路。即時數據、智能合約互動等功能。",
      networkStatus: "網路：Sepolia 測試網",
      usefulResources: "實用資源",
      followUs: "看看我",
      etherscan: "Etherscan",
      docs: "開發文件",
      faucet: "Sepolia 水龍頭",
      copyright: "© {{year}} 區塊鏈瀏覽器。保留所有權利。",
      privacy: "隱私政策",
      terms: "服務條款",
      contact: "聯絡我們",

      // Navbar 相關
      home: "首頁",

      // Faucet 頁面相關
      faucetTitle: "Sepolia 測試網水龍頭",

      checkBalance: "檢查餘額",
      currentBalance: "當前餘額",
      monitoringStatus: "監控中...",
      receivedTokens: "收到測試幣！",

      // Faucet 說明
      faucetDescription: "獲取 Sepolia 測試網的測試幣",
      availableFaucets: "可用的水龍頭",
      quickNodeFaucet: "QuickNode (推薦)",
      powFaucet: "PoW 挖礦水龍頭",

      // Faucet 特性
      captchaOnly: "只需驗證碼",
      dailyClaim: "每天可以領取",
      noVerification: "不需要驗證",
      browserMining: "使用瀏覽器挖礦",

      // 錯誤訊息
      invalidAddress: "無效的 ETH 地址",

      checkingBalance: "檢查餘額中...",

      // 按鈕文字
      refresh: "重新整理",
      stop: "停止監控",
      claim: "領取測試幣",

      // Events Section

      eventTip1: "監控大型合約時注意 gas 消耗",
      eventTip2: "使用 WebSocket 提供者以獲得更好的性能",
      eventTip3: "使用過濾器只監聽特定的事件",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "zh",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
