import { ethers } from "ethers";

const useBlockchain = () => {
  const initProvider = () => {
    try {
      // 使用 Sepolia 測試網路
      const gateway = "https://rpc2.sepolia.org";
      console.log("使用的 Gateway:", gateway);

      if (!gateway) {
        throw new Error("未設定 ETH_GATEWAY");
      }

      return new ethers.JsonRpcProvider(gateway, {
        chainId: 11155111, // Sepolia 的 chainId
        name: "sepolia",
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
      const balance = await provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error("獲取餘額失敗:", error);
      throw error;
    }
  };

  // 獲取最新區塊
  const getLatestBlock = async () => {
    try {
      return await provider.getBlock("latest");
    } catch (error) {
      console.error("獲取最新區塊失敗:", error);
      throw error;
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
      throw error;
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
