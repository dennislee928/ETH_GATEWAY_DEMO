import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { getRpcEndpoint } from "../config/blockchain";

const useWallet = () => {
  const [account, setAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [error, setError] = useState("");

  const isMetaMaskAvailable = () => {
    return typeof window !== "undefined" && window.ethereum;
  };

  const checkConnection = useCallback(async () => {
    if (!isMetaMaskAvailable()) {
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);

        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        setChainId(parseInt(chainId, 16));

        const ethersProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(ethersProvider);
        setSigner(await ethersProvider.getSigner());
      }
    } catch (error) {
      console.error("檢查連接狀態失敗:", error);
      setError("檢查連接狀態失敗: " + error.message);
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (!isMetaMaskAvailable()) {
      setError("MetaMask 未安裝");
      return false;
    }

    setIsConnecting(true);
    setError("");

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);

        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        setChainId(parseInt(chainId, 16));

        const ethersProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(ethersProvider);
        setSigner(await ethersProvider.getSigner());

        return true;
      }
    } catch (error) {
      console.error("連接錢包失敗:", error);
      if (error.code === 4001) {
        setError("用戶拒絕連接");
      } else {
        setError("連接失敗: " + error.message);
      }
      return false;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setAccount("");
    setIsConnected(false);
    setProvider(null);
    setSigner(null);
    setChainId(null);
    setError("");
  }, []);

  const switchNetwork = useCallback(
    async (targetChainId) => {
      if (!isMetaMaskAvailable() || !isConnected) {
        setError("請先連接 MetaMask");
        return false;
      }

      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${targetChainId.toString(16)}` }],
        });
        return true;
      } catch (error) {
        if (error.code === 4902) {
          // 網路不存在，嘗試添加
          try {
            // const networkConfig =
            //   targetChainId === 11155111
            //     ? getNetworkConfig("sepolia")
            //     : getNetworkConfig("mainnet");

            const rpcUrl =
              targetChainId === 11155111
                ? getRpcEndpoint("sepolia")
                : getRpcEndpoint("mainnet");

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
                  rpcUrls: [rpcUrl],
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
