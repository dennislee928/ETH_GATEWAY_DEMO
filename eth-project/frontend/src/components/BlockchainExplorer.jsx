import React, { useState, useEffect } from "react";
import useBlockchain from "../hooks/useBLockchain";
import "../components/componsnt-css/BlockchainExplorer.css";

const BlockchainExplorer = () => {
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
  const { getBalance, getTransactionCount, getLatestBlock, getNetwork } =
    useBlockchain();

  // 查詢錢包資訊
  const handleWalletSearch = async () => {
    if (!address) {
      setError("請輸入錢包地址");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [balance, txCount] = await Promise.all([
        getBalance(address),
        getTransactionCount(address),
      ]);

      setWalletInfo({
        balance,
        txCount,
      });
    } catch (error) {
      setError("查詢錢包資訊失敗");
      console.error(error);
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
        setError("獲取區塊鏈資訊失敗");
        console.error(error);
      }
    };

    fetchBlockchainInfo();
  }, []);

  return (
    <div className="blockchain-explorer">
      <h2>區塊鏈瀏覽器</h2>

      {/* 網路資訊 */}
      <div className="info-section">
        <h3>網路資訊</h3>
        {blockchainInfo.network && (
          <div className="network-info">
            <p>網路名稱: {blockchainInfo.network.name}</p>
            <p>Chain ID: {blockchainInfo.network.chainId}</p>
          </div>
        )}
      </div>

      {/* 最新區塊資訊 */}
      <div className="info-section">
        <h3>最新區塊</h3>
        {blockchainInfo.latestBlock && (
          <div className="block-info">
            <p>區塊高度: {blockchainInfo.latestBlock.number}</p>
            <p>
              時間戳:{" "}
              {new Date(
                blockchainInfo.latestBlock.timestamp * 1000
              ).toLocaleString()}
            </p>
          </div>
        )}
      </div>

      {/* 錢包查詢 */}
      <div className="wallet-search">
        <h3>錢包查詢</h3>
        <div className="search-box">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="請輸入以太坊地址"
            className="address-input"
          />
          <button
            onClick={handleWalletSearch}
            disabled={loading}
            className="search-button"
          >
            {loading ? "查詢中..." : "查詢"}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {walletInfo.balance !== null && (
          <div className="wallet-info">
            <h4>錢包資訊</h4>
            <p>餘額：{walletInfo.balance} ETH</p>
            <p>交易次數：{walletInfo.txCount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockchainExplorer;
