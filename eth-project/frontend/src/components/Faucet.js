import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./component-css/Faucet.css";

function Faucet() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [error, setError] = useState(null);

  const checkBalance = async () => {
    try {
      setError(null);
      const provider = new ethers.JsonRpcProvider(
        process.env.REACT_APP_QUICKNODE_URL
      );
      const currentBalance = await provider.getBalance(address);
      setBalance(ethers.formatEther(currentBalance));
      setIsMonitoring(true);
    } catch (err) {
      setError(err.message);
      setIsMonitoring(false);
    }
  };

  useEffect(() => {
    let intervalId;

    if (isMonitoring && balance !== null) {
      intervalId = setInterval(async () => {
        try {
          const provider = new ethers.JsonRpcProvider(
            process.env.REACT_APP_QUICKNODE_URL
          );
          const newBalance = await provider.getBalance(address);
          const formattedBalance = ethers.formatEther(newBalance);

          if (formattedBalance > balance) {
            setBalance(formattedBalance);
            setIsMonitoring(false);
          }
        } catch (err) {
          setError(err.message);
          setIsMonitoring(false);
        }
      }, 10000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isMonitoring, address, balance]);

  return (
    <div className="faucet-container">
      <h2>Sepolia 測試幣水龍頭</h2>

      <div className="input-group">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="輸入以太坊地址"
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

      {error && <div className="error-message">錯誤: {error}</div>}

      {balance !== null && (
        <div className="balance-info">
          <p>當前餘額: {balance} ETH</p>
          {isMonitoring && <p>監控中... (每10秒更新一次)</p>}
        </div>
      )}

      <div className="faucet-links">
        <h3>可用的測試幣水龍頭:</h3>

        <div className="faucet-option">
          <h4>1. QuickNode (推薦)</h4>
          <a
            href="https://faucet.quicknode.com/ethereum/sepolia"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://faucet.quicknode.com/ethereum/sepolia
          </a>
          <ul>
            <li>只需驗證碼</li>
            <li>每天可以領取</li>
          </ul>
        </div>

        <div className="faucet-option">
          <h4>2. PoW 挖礦水龍頭</h4>
          <a
            href="https://sepolia-faucet.pk910.de/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://sepolia-faucet.pk910.de/
          </a>
          <ul>
            <li>不需要驗證</li>
            <li>使用瀏覽器挖礦</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Faucet;
