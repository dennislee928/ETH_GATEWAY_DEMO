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
      // Navigation translations
      home: "Home",
      blockchainExplorer: "Blockchain Explorer",
      game: "Blockchain Game",
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

      // Transfer event monitoring instructions
      transferInstructionsTitle: "Smart Transfer Event Monitoring System",
      transferInstruction1:
        "Enter smart contract address to start real-time transfer event monitoring",
      transferInstruction2:
        "Use WebSocket connection to get real-time transfer notifications",
      transferInstruction3:
        "View complete transfer history and detailed analysis",
      transferExample: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      transferTip1:
        "Monitor gas consumption and network congestion for large contracts",
      transferTip2: "Use WebSocket connection for better real-time performance",
      transferTip3:
        "Use smart filters to only listen to specific transfer events you're interested in",

      // Contract analysis instructions
      contractInstructionsTitle: "Smart Contract Deep Analysis Tool",
      contractInstruction1:
        "Enter contract address for comprehensive smart contract analysis",
      contractInstruction2:
        "Get contract code, token information and interaction history",
      contractExample: "0xA0b86a33E6441b8C4C8C8C8C8C8C8C8C8C8C8C8C",
      contractTip1:
        "Verify smart contract source code for security and reliability",
      contractTip2:
        "Check contract balance and token holdings to assess activity",
      contractTip3:
        "Review contract interaction history and call logs to understand usage patterns",

      // Network status monitoring instructions
      networkInstructionsTitle: "Real-time Network Status Monitoring System",
      networkInstruction1:
        "Real-time check of current network status, congestion and gas price trends",
      networkInstruction2:
        "View latest block information, network statistics and performance metrics",
      networkExample:
        "Current block height, gas price, network congestion level",
      networkTip1:
        "Monitor network congestion and gas prices to choose optimal transaction timing",
      networkTip2:
        "Regularly check network status to optimize transaction costs and confirmation speed",
      networkTip3:
        "Choose appropriate network (mainnet/testnet) based on your needs",

      // Transaction parsing instructions
      transactionInstructionsTitle: "Smart Transaction Parsing and Analysis",
      transactionInstruction1:
        "Enter transaction hash for deep parsing and detailed analysis",
      transactionInstruction2:
        "View transaction details, status, gas consumption and confirmation info",
      transactionExample:
        "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      transactionTip1:
        "Carefully verify transaction details and recipient address for security",
      transactionTip2:
        "Adjust gas settings based on network conditions to optimize transaction costs",
      transactionTip3:
        "Monitor transaction status and confirmations in real-time to track progress",

      // General function descriptions
      transfers: "Transfer Monitoring",
      contracts: "Contract Analysis",
      network: "Network Monitoring",
      transactions: "Transaction Parsing",
      transferEvents: "Transfer Event Monitoring",
      contractInfo: "Contract Information Analysis",
      networkStats: "Network Statistics",
      transactionDetails: "Transaction Details",
      enterContractAddress: "Enter Smart Contract Address",
      enterAddress: "Enter Ethereum Address",
      enterTxHash: "Enter Transaction Hash",
      watchTransfers: "Watch Transfers in Real-time",
      getHistory: "Get History",
      getContractInfo: "Get Contract Info",
      refreshStats: "Refresh Statistics",
      checkAddress: "Check Address Type",
      parseTransaction: "Parse Transaction",
      instructions: "Instructions",
      example: "Example",
      tips: "Professional Tips",

      // Blockchain Explorer translations
      networkInfo: "Network Information",
      networkName: "Network Name",
      chainId: "Chain ID",
      latestBlock: "Latest Block",
      blockHeight: "Block Height",
      timestamp: "Timestamp",
      walletSearch: "Wallet Search",
      enterEthAddress: "Enter Ethereum Address",
      exampleAddress: "Example Address",
      searching: "Searching...",
      search: "Search",
      walletInfo: "Wallet Information",
      balance: "Balance",
      txCount: "Transaction Count",

      // Error messages
      networkError: "Network connection error, please check network settings",
      addressError: "Address format error or network connection issue",
      parseError:
        "Transaction parsing failed, please check transaction hash format",
      success: "Operation successful",
      failed: "Operation failed",

      // Wallet connection translations
      connecting: "Connecting wallet...",
      disconnect: "Disconnect Wallet",
      checkMetamask: "Please check MetaMask popup and confirm connection",
      metamaskRequired: "MetaMask Wallet Required",
      metamaskInstallMessage:
        "Please install MetaMask browser extension to use blockchain features",
      installMetamask: "Install MetaMask",
      close: "Close",

      guessNumber: "Blockchain Number Guessing Game",
      gameDescription:
        "Guess a number between 1-10, cost: 0.01 ETH (Sepolia testnet) per guess",
      connectWallet: "Connect Wallet",
      connectedAs: "Connected as",
      enterNumberPlaceholder: "Enter a number (1-10)",
      play: "Play Game",
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
      gameRule2: "Pay 0.01 ETH (Sepolia testnet) to play",
      gameRule3: "Win double your bet if you guess correctly",
    },
  },
  zh: {
    translation: {
      // Navigation translations
      home: "首頁",
      blockchainExplorer: "區塊鏈瀏覽器",
      game: "區塊鏈遊戲",
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

      // Transfer event monitoring instructions
      transferInstructionsTitle: "智能轉帳事件監控系統",
      transferInstruction1: "輸入智能合約地址開始即時監控轉帳事件",
      transferInstruction2: "使用 WebSocket 連接獲取實時轉帳通知",
      transferInstruction3: "查看完整的轉帳歷史記錄和詳細分析",
      transferExample: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      transferTip1: "監控大型合約時注意 Gas 消耗和網路擁塞狀況",
      transferTip2: "使用 WebSocket 連接以獲得更好的實時性能表現",
      transferTip3: "使用智能過濾器只監聽您感興趣的特定轉帳事件",

      // Contract analysis instructions
      contractInstructionsTitle: "智能合約深度分析工具",
      contractInstruction1: "輸入合約地址進行全面的智能合約分析",
      contractInstruction2: "獲取合約代碼、代幣資訊和互動歷史記錄",
      contractExample: "0xA0b86a33E6441b8C4C8C8C8C8C8C8C8C8C8C8C8C",
      contractTip1: "驗證智能合約原始碼確保安全性和可靠性",
      contractTip2: "檢查合約餘額和代幣持有情況以評估活躍度",
      contractTip3: "檢視合約互動歷史和調用記錄了解使用模式",

      // Network status monitoring instructions
      networkInstructionsTitle: "即時網路狀態監控系統",
      networkInstruction1: "實時檢查當前網路狀態、擁塞情況和 Gas 價格趨勢",
      networkInstruction2: "查看最新區塊資訊、網路統計和性能指標",
      networkExample: "當前區塊高度、Gas 價格、網路擁塞度",
      networkTip1: "實時監控網路擁塞狀況和 Gas 價格以選擇最佳交易時機",
      networkTip2: "定期檢查網路狀態以優化交易成本和確認速度",
      networkTip3: "根據需求選擇適當的網路（主網/測試網）進行操作",

      // Transaction parsing instructions
      transactionInstructionsTitle: "智能交易解析與分析",
      transactionInstruction1: "輸入交易哈希進行深度解析和詳細分析",
      transactionInstruction2: "查看交易詳情、狀態、Gas 消耗和確認資訊",
      transactionExample:
        "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      transactionTip1: "仔細驗證交易詳情和接收地址確保安全性",
      transactionTip2: "根據網路狀況調整 Gas 設定以優化交易成本",
      transactionTip3: "實時監控交易狀態和確認數以追蹤進度",

      // General function descriptions
      transfers: "轉帳監控",
      contracts: "合約分析",
      network: "網路監控",
      transactions: "交易解析",
      transferEvents: "轉帳事件監控",
      contractInfo: "合約資訊分析",
      networkStats: "網路統計數據",
      transactionDetails: "交易詳細資訊",
      enterContractAddress: "輸入智能合約地址",
      enterAddress: "輸入以太坊地址",
      enterTxHash: "輸入交易哈希",
      watchTransfers: "即時監聽轉帳",
      getHistory: "獲取歷史記錄",
      getContractInfo: "獲取合約資訊",
      refreshStats: "刷新統計數據",
      checkAddress: "檢查地址類型",
      parseTransaction: "解析交易詳情",
      instructions: "使用說明",
      example: "實用範例",
      tips: "專業提示",

      // Blockchain Explorer translations
      networkInfo: "網路資訊",
      networkName: "網路名稱",
      chainId: "鏈 ID",
      latestBlock: "最新區塊",
      blockHeight: "區塊高度",
      timestamp: "時間戳記",
      walletSearch: "錢包搜尋",
      enterEthAddress: "請輸入以太坊地址",
      exampleAddress: "範例地址",
      searching: "搜尋中...",
      search: "搜尋",
      walletInfo: "錢包資訊",
      balance: "餘額",
      txCount: "交易數量",

      // Error messages
      networkError: "網路連接錯誤，請檢查網路設定",
      addressError: "地址格式錯誤或網路連接問題",
      parseError: "交易解析失敗，請檢查交易哈希格式",
      success: "操作成功",
      failed: "操作失敗",

      // Wallet connection translations
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
