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
      eventInstructionsTitle: "Transfer Event Monitoring",
      eventInstruction1: "Enter a contract address to monitor transfer events",
      eventInstruction2:
        "Click 'Watch Transfers' to start real-time monitoring",
      eventInstruction3: "Click 'Get History' to view past transfer records",

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
      example: "Example",
      eventExample:
        "0x742d35Cc6634C0532925a3b844Bc454e4438f44e (USDT Contract)",
      contractExample: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984 (UNI Token)",
      networkExample: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 (WETH)",
      transactionExample: "0x123... (Any valid transaction hash)",

      // Tips
      tips: "Tips & Tricks",
      tip1: "Use Sepolia testnet addresses for testing",
      tip2: "Monitor gas prices before sending transactions",
      tip3: "Always verify contract addresses on Etherscan",

      // UI Elements
      instructions: "Instructions",
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
    },
  },
  zh: {
    translation: {
      title: "Holesky 瀏覽器",
      subtitle: "探索以太坊測試網路的世界",
      walletInfo: "錢包資訊",
      blockchainExplorer: "區塊鏈瀏覽器",

      // Events Instructions
      eventInstructionsTitle: "轉帳事件監控",
      eventInstruction1: "輸入合約地址以監控轉帳事件",
      eventInstruction2: "點擊「監聽轉帳」開始即時監控",
      eventInstruction3: "點擊「獲取歷史」查看過去的轉帳記錄",

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
      example: "範例",
      eventExample: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e (USDT合約)",
      contractExample: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984 (UNI代幣)",
      networkExample: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 (WETH)",
      transactionExample: "0x123... (任何有效的交易哈希)",

      // Tips
      tips: "使用提示",
      tip1: "使用 Sepolia 測試網路地址進行測試",
      tip2: "發送交易前先檢查 gas 價格",
      tip3: "務必在 Etherscan 上驗證合約地址",

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
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "zh",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
