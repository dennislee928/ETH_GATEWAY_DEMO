import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

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
      transactionInstructionsTitle: "Transaction Analysis",
      transactionInstruction1: "Enter transaction hash to analyze",
      transactionInstruction2: "View transaction details and status",

      // Network Instructions
      networkInstructionsTitle: "Network Status",
      networkInstruction1: "Check current network status",
      networkInstruction2: "View latest block information",

      // Gas Instructions
      gasInstructions: "Gas Price Guide",
      gasInstruction1: "Monitor current gas prices",
      gasInstruction2: "Set appropriate gas limits",

      // Token Instructions
      tokenInstructions: "Token Operations",
      tokenInstruction1: "Enter token contract address",
      tokenInstruction2: "View token details and transfers",

      // ENS Instructions
      ensInstructions: "ENS Resolution",
      ensInstruction1: "Enter ENS name to resolve",
      ensInstruction2: "Get corresponding ETH address",

      // Tabs
      events: "Events",
      contracts: "Contracts",
      network: "Network",
      transactions: "Transactions",

      // Event Related
      transferEvents: "Transfer Events",
      enterContractAddress: "Enter contract address",
      watchTransfers: "Watch Transfers",
      getHistory: "Get History",

      // Event Instructions
      eventInstructionsTitle: "Event Monitoring",
      eventInstruction1: "Enter contract address to monitor",
      eventInstruction2: "Start monitoring transfers",
      eventInstruction3: "View transfer history",
      eventExample: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",

      // Tips
      tips: "Tips",
      eventTip1: "Monitor gas usage for large contracts",
      eventTip2: "Use WebSocket for better performance",
      eventTip3: "Use filters for specific events",

      // Examples
      example: "Example",

      // Contract Tips
      contractTip1: "Verify contract source code",
      contractTip2: "Check contract balance",
      contractTip3: "Review contract interactions",

      // Network Tips
      networkTip1: "Monitor network congestion",
      networkTip2: "Check gas prices regularly",
      networkTip3: "Use appropriate network",

      // Transaction Tips
      txTip1: "Verify transaction details",
      txTip2: "Check gas settings",
      txTip3: "Monitor transaction status",

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
      transactionInstructionsTitle: "交易分析",
      transactionInstruction1: "輸入交易哈希進行分析",
      transactionInstruction2: "查看交易詳情和狀態",

      // 網路說明
      networkInstructionsTitle: "網路狀態",
      networkInstruction1: "檢查當前網路狀態",
      networkInstruction2: "查看最新區塊資訊",

      // Gas 說明
      gasInstructions: "Gas 價格指南",
      gasInstruction1: "監控當前 gas 價格",
      gasInstruction2: "設置適當的 gas 限制",

      // 代幣說明
      tokenInstructions: "代幣操作",
      tokenInstruction1: "輸入代幣合約地址",
      tokenInstruction2: "查看代幣詳情和轉帳",

      // ENS 說明
      ensInstructions: "ENS 解析",
      ensInstruction1: "輸入 ENS 名稱進行解析",
      ensInstruction2: "獲取對應的 ETH 地址",

      // 分頁
      events: "事件",
      contracts: "合約",
      network: "網路",
      transactions: "交易",

      // 事件相關
      transferEvents: "轉帳事件",
      enterContractAddress: "輸入合約地址",
      watchTransfers: "監聽轉帳",
      getHistory: "獲取歷史",

      // 事件說明
      eventInstructionsTitle: "事件監控",
      eventInstruction1: "輸入合約地址以監控",
      eventInstruction2: "開始監控轉帳",
      eventInstruction3: "查看轉帳歷史",
      eventExample: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",

      // 提示
      tips: "提示",
      eventTip1: "監控大型合約時注意 gas 消耗",
      eventTip2: "使用 WebSocket 以獲得更好的性能",
      eventTip3: "使用過濾器只監聽特定事件",

      // 範例
      example: "範例",

      // 合約提示
      contractTip1: "驗證合約原始碼",
      contractTip2: "檢查合約餘額",
      contractTip3: "檢視合約互動",

      // 網路提示
      networkTip1: "監控網路擁塞狀況",
      networkTip2: "定期檢查 gas 價格",
      networkTip3: "使用適當的網路",

      // 交易提示
      txTip1: "驗證交易詳情",
      txTip2: "檢查 gas 設定",
      txTip3: "監控交易狀態",

      guessNumber: "Guess the Number",
      gameDescription:
        "Guess a number between 1 and 10. Cost: 0.01 ETH(in  Sepolia) per guess",
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
    },
  },
};

i18n
  .use(LanguageDetector) // 添加語言檢測
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ["navigator", "htmlTag", "path", "subdomain"],
      lookupFromPathIndex: 0,
      // 台灣地區使用繁體中文
      checkWhitelist: true,
      whitelist: ["en", "zh"],
      // 將台灣地區對應到繁體中文
      convertLanguageCodes: [
        {
          from: "zh-TW",
          to: "zh",
        },
      ],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
