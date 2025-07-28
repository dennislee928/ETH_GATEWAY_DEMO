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
      // 使用集中化配置的 RPC 端點
      const gateway = getRpcEndpoint();
      const networkConfig = getNetworkConfig();

      console.log("使用的 Gateway:", gateway);
      console.log("網路配置:", networkConfig);

      if (!gateway) {
        throw new Error("未設定 ETH_GATEWAY");
      }

      return new ethers.JsonRpcProvider(gateway, {
        chainId: networkConfig.chainId,
        name: networkConfig.name,
      });
    } catch (error) {
      console.error("Provider 初始化失敗:", error);
      throw error;
    }
  };

  const provider = initProvider();

  // 檢查網路連接
  const checkConnection = async () => {
    try {
      const network = await provider.getNetwork();
      console.log("當前網路:", network);
      return true;
    } catch (error) {
      console.error("網路連接檢查失敗:", error);
      return false;
    }
  };

  // 獲取餘額
  const getBalance = async (address) => {
    try {
      // 使用集中化的地址驗證
      if (!validateAddress(address)) {
        throw new Error("無效的以太坊地址格式");
      }

      const balance = await provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error("獲取餘額失敗:", error);
      throw new Error(formatErrorMessage(error));
    }
  };

  // 獲取最新區塊
  const getLatestBlock = async () => {
    try {
      return await provider.getBlock("latest");
    } catch (error) {
      console.error("獲取最新區塊失敗:", error);
      throw new Error(formatErrorMessage(error));
    }
  };

  // 獲取網路資訊
  const getNetwork = async () => {
    try {
      const network = await provider.getNetwork();
      return {
        name: network.name,
        chainId: network.chainId,
      };
    } catch (error) {
      console.error("獲取網路資訊失敗:", error);
      throw new Error(formatErrorMessage(error));
    }
  };

  return {
    provider,
    getBalance,
    getLatestBlock,
    getNetwork,
    checkConnection,
  };
};

export default useBlockchain;
