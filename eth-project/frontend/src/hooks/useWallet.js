import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

const useWallet = () => {
  const [account, setAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [error, setError] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // 檢查是否支援 MetaMask
  const isMetaMaskAvailable = () => {
    return typeof window !== "undefined" && window.ethereum;
  };

  // 檢查是否已連接
  const checkConnection = useCallback(async () => {
    if (!isMetaMaskAvailable()) {
      return false;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);

        // 獲取網路資訊
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        setChainId(parseInt(chainId, 16));

        // 設置 provider 和 signer
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setProvider(provider);
        setSigner(signer);

        return true;
      }
      return false;
    } catch (error) {
      console.error("檢查連接失敗:", error);
      return false;
    }
  }, []);

  // 連接錢包
  const connectWallet = useCallback(async () => {
    if (!isMetaMaskAvailable()) {
      setError("MetaMask 未安裝，請先安裝 MetaMask 擴展");
      return false;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // 請求連接
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);

        // 獲取網路資訊
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        setChainId(parseInt(chainId, 16));

        // 設置 provider 和 signer
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setProvider(provider);
        setSigner(signer);

        console.log("錢包連接成功:", accounts[0]);
        return true;
      }
      return false;
    } catch (error) {
      console.error("連接錢包失敗:", error);

      if (error.code === 4001) {
        setError("用戶拒絕連接錢包");
      } else if (error.code === -32002) {
        setError("請檢查 MetaMask 彈窗並確認連接");
      } else {
        setError("連接錢包時發生錯誤: " + error.message);
      }

      return false;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // 斷開連接
  const disconnectWallet = useCallback(() => {
    setAccount("");
    setIsConnected(false);
    setProvider(null);
    setSigner(null);
    setChainId(null);
    setError(null);
    console.log("錢包已斷開連接");
  }, []);

  // 切換網路
  const switchNetwork = useCallback(
    async (targetChainId) => {
      if (!isMetaMaskAvailable() || !isConnected) {
        setError("請先連接錢包");
        return false;
      }

      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${targetChainId.toString(16)}` }],
        });
        return true;
      } catch (error) {
        console.error("切換網路失敗:", error);

        if (error.code === 4902) {
          // 網路不存在，嘗試添加網路
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: `0x${targetChainId.toString(16)}`,
                  chainName:
                    targetChainId === 11155111
                      ? "Sepolia Testnet"
                      : "Ethereum Mainnet",
                  nativeCurrency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 18,
                  },
                  rpcUrls:
                    targetChainId === 11155111
                      ? ["https://ethereum-sepolia.publicnode.com"]
                      : ["https://ethereum.publicnode.com"],
                  blockExplorerUrls:
                    targetChainId === 11155111
                      ? ["https://sepolia.etherscan.io"]
                      : ["https://etherscan.io"],
                },
              ],
            });
            return true;
          } catch (addError) {
            setError("添加網路失敗: " + addError.message);
            return false;
          }
        } else {
          setError("切換網路失敗: " + error.message);
          return false;
        }
      }
    },
    [isConnected]
  );

  // 監聽帳號變更
  useEffect(() => {
    if (!isMetaMaskAvailable()) {
      return;
    }

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        // 用戶斷開連接
        disconnectWallet();
      } else {
        // 用戶切換帳號
        setAccount(accounts[0]);
      }
    };

    const handleChainChanged = (chainId) => {
      setChainId(parseInt(chainId, 16));
      // 重新載入頁面以確保所有狀態同步
      window.location.reload();
    };

    const handleDisconnect = () => {
      disconnectWallet();
    };

    // 添加事件監聽器
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);
    window.ethereum.on("disconnect", handleDisconnect);

    // 檢查初始連接狀態
    checkConnection();

    // 清理事件監聽器
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
        window.ethereum.removeListener("disconnect", handleDisconnect);
      }
    };
  }, [checkConnection, disconnectWallet]);

  return {
    account,
    isConnected,
    isConnecting,
    provider,
    signer,
    chainId,
    error,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    checkConnection,
    isMetaMaskAvailable,
  };
};

export default useWallet;
