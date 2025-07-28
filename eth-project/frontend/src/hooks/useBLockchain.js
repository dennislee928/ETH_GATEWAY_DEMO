import { ethers } from "ethers";
import {
  getRpcEndpoint,
  getNetworkConfig,
  validateAddress,
  formatErrorMessage,
} from "../config/blockchain";

const useBlockchain = () => {
  const initProvider = () => {
    try {
      const gateway = getRpcEndpoint();
      const networkConfig = getNetworkConfig();

      console.log("🔧 使用的 Gateway:", gateway);
      console.log("🌐 網路配置:", networkConfig);

      return new ethers.JsonRpcProvider(gateway, {
        chainId: networkConfig.chainId,
        name: networkConfig.name,
      });
    } catch (error) {
      console.error("❌ Provider 初始化失敗:", error);
      throw error;
    }
  };

  const provider = initProvider();

  const getBalance = async (address) => {
    try {
      if (!validateAddress(address)) {
        throw new Error("無效的以太坊地址格式");
      }
      const balance = await provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error("❌ 獲取餘額失敗:", error);
      throw new Error(formatErrorMessage(error));
    }
  };

  const getLatestBlock = async () => {
    try {
      const block = await provider.getBlock("latest");
      return {
        number: block.number,
        hash: block.hash,
        timestamp: block.timestamp,
        transactions: block.transactions.length,
      };
    } catch (error) {
      console.error("❌ 獲取最新區塊失敗:", error);
      throw new Error(formatErrorMessage(error));
    }
  };

  const getNetwork = async () => {
    try {
      const network = await provider.getNetwork();
      return {
        name: network.name,
        chainId: network.chainId,
      };
    } catch (error) {
      console.error("❌ 獲取網路資訊失敗:", error);
      throw new Error(formatErrorMessage(error));
    }
  };

  return {
    provider,
    getBalance,
    getLatestBlock,
    getNetwork,
  };
};

export default useBlockchain;
