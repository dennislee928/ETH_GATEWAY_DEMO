import React, { useState, useEffect } from "react";
import useBlockchain from "../hooks/useBLockchain";
import "../components/component-css/BlockchainExplorer.css";
import { ethers } from "ethers";
import { useTranslation } from "react-i18next";
import { validateAddress, formatErrorMessage } from "../config/blockchain";

const BlockchainExplorer = () => {
  const { t } = useTranslation();
  // 狀態管理
  const [address, setAddress] = useState("");
  const [walletInfo, setWalletInfo] = useState({
    balance: null,
    txCount: null,
  });
  const [blockchainInfo, setBlockchainInfo] = useState({
    network: null,
    latestBlock: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 引入區塊鏈功能
  const { getLatestBlock, getNetwork, provider } = useBlockchain();

  // 查詢錢包資訊
  const handleWalletSearch = async () => {
    if (!address) {
      setError("請輸入錢包地址");
      return;
    }

    // 使用集中化的地址驗證
    if (!validateAddress(address)) {
      setError("無效的以太坊地址格式，請檢查地址是否正確");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const txCount = await provider.getTransactionCount(address);
      const balance = await provider.getBalance(address);

      setWalletInfo({
        balance: ethers.formatEther(balance),
        txCount,
      });
    } catch (error) {
      console.error("Error:", error);
      setError("獲取錢包資訊時發生錯誤: " + formatErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  // 獲取區塊鏈資訊
  useEffect(() => {
    const fetchBlockchainInfo = async () => {
      try {
        const [network, latestBlock] = await Promise.all([
          getNetwork(),
          getLatestBlock(),
        ]);

        setBlockchainInfo({
          network,
          latestBlock,
        });
      } catch (error) {
        setError("獲取區塊鏈資訊失敗: " + formatErrorMessage(error));
        console.error(error);
      }
    };

    fetchBlockchainInfo();
  }, [getLatestBlock, getNetwork]);

  return (
    <div className="blockchain-explorer">
      <div className="info-section">
        <h3>{t("networkInfo")}</h3>
        {blockchainInfo.network && (
          <div className="network-info">
            <p>
              {t("networkName")}: {blockchainInfo.network.name}
            </p>
            <p>
              {t("chainId")}: {blockchainInfo.network.chainId}
            </p>
          </div>
        )}
      </div>

      <div className="info-section">
        <h3>{t("latestBlock")}</h3>
        {blockchainInfo.latestBlock && (
          <div className="block-info">
            <p>
              {t("blockHeight")}: {blockchainInfo.latestBlock.number}
            </p>
            <p>
              {t("timestamp")}:{" "}
              {new Date(
                blockchainInfo.latestBlock.timestamp * 1000
              ).toLocaleString()}
            </p>
          </div>
        )}
      </div>

      <div className="wallet-search">
        <h3>{t("walletSearch")}</h3>
        <div className="search-box">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={t("enterEthAddress")}
            className="address-input"
          />
          <div className="example-address">
            {t("exampleAddress")}: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
          </div>
          <button
            onClick={handleWalletSearch}
            disabled={loading}
            className="search-button"
          >
            {loading ? t("searching") : t("search")}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {walletInfo.balance !== null && (
          <div className="wallet-info">
            <h4>{t("walletInfo")}</h4>
            <p>
              {t("balance")}: {walletInfo.balance} ETH
            </p>
            <p>
              {t("txCount")}: {walletInfo.txCount}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockchainExplorer;
