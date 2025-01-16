import React, { useState, useEffect } from "react";
import useBlockchain from "../hooks/useBLockchain";
import "./component-css/Faucet.css";
import { ethers } from "ethers";

const Faucet = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [dots, setDots] = useState("");
  const { provider, getBalance } = useBlockchain();

  // 監控餘額變化
  useEffect(() => {
    let intervalId;
    let dotsInterval;

    if (isMonitoring) {
      const initialBalance = balance;

      // 每10秒檢查一次餘額
      intervalId = setInterval(async () => {
        try {
          const newBalance = await getBalance(address);
          setBalance(newBalance);

          if (Number(newBalance) > Number(initialBalance)) {
            setIsMonitoring(false);
          }
        } catch (error) {
          console.error("檢查餘額失敗:", error);
        }
      }, 10000);

      // 動畫效果
      dotsInterval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
      }, 500);
    }

    return () => {
      clearInterval(intervalId);
      clearInterval(dotsInterval);
    };
  }, [isMonitoring, address, balance, getBalance]);

  // 檢查餘額
  const checkBalance = async () => {
    try {
      if (!ethers.isAddress(address)) {
        throw new Error("無效的錢包地址");
      }
      const bal = await getBalance(address);
      setBalance(bal);
      setIsMonitoring(true);
    } catch (error) {
      console.error("錯誤:", error);
    }
  };

  return (
    <div className="faucet-container">
      <h2>測試幣水龍頭</h2>

      <div className="input-section">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="輸入錢包地址"
          className="address-input"
        />
        <button
          onClick={checkBalance}
          disabled={!address || isMonitoring}
          className="check-button"
        >
          檢查餘額
        </button>
      </div>

      {balance !== null && (
        <div className="balance-info">
          <p>當前餘額: {balance} ETH</p>
        </div>
      )}

      {isMonitoring && (
        <div className="monitoring-status">
          <p>監控餘額中{dots}</p>
        </div>
      )}

      <div className="faucet-links">
        <h3>可用的測試幣水龍頭:</h3>
        <div className="faucet-list">
          <div className="faucet-item">
            <h4>1. QuickNode (推薦)</h4>
            <a
              href="https://faucet.quicknode.com/ethereum/sepolia"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://faucet.quicknode.com/ethereum/sepolia
            </a>
            <p>- 只需驗證碼</p>
            <p>- 每天可以領取</p>
          </div>

          <div className="faucet-item">
            <h4>2. PoW 挖礦水龍頭</h4>
            <a
              href="https://sepolia-faucet.pk910.de/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://sepolia-faucet.pk910.de/
            </a>
            <p>- 不需要驗證</p>
            <p>- 使用瀏覽器挖礦</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faucet;
