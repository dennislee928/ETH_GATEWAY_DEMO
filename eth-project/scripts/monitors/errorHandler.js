class BlockchainError extends Error {
  constructor(message, code, details = {}) {
    super(message);
    this.name = "BlockchainError";
    this.code = code;
    this.details = details;
  }
}

const ERROR_CODES = {
  NETWORK_ERROR: "NETWORK_ERROR",
  CONTRACT_ERROR: "CONTRACT_ERROR",
  TRANSACTION_ERROR: "TRANSACTION_ERROR",
  WEBSOCKET_ERROR: "WEBSOCKET_ERROR",
  GAS_ERROR: "GAS_ERROR",
};

function handleError(error, context = "") {
  if (error instanceof BlockchainError) {
    console.error(`[${error.code}] ${context}: ${error.message}`);
    console.error("詳細資訊:", error.details);
  } else if (error.code === "NETWORK_ERROR") {
    console.error(`網路錯誤 (${context}):`, error.message);
  } else if (error.reason) {
    console.error(`合約錯誤 (${context}):`, error.reason);
  } else {
    console.error(`未知錯誤 (${context}):`, error);
  }
}

module.exports = {
  BlockchainError,
  ERROR_CODES,
  handleError,
};
