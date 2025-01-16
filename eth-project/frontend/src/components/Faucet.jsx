import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useTranslation } from "react-i18next";
import "./component-css/faucet.css";

const Faucet = () => {
  const { t } = useTranslation();
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [dots, setDots] = useState("");
  const [error, setError] = useState(null);

  // 監控餘額變化
  useEffect(() => {
    let dotsInterval;
    if (isMonitoring) {
      dotsInterval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
      }, 500);
    }
    return () => clearInterval(dotsInterval);
  }, [isMonitoring]);

  // 檢查餘額
  const checkBalance = async () => {
    try {
      setError(null);
      const provider = new ethers.JsonRpcProvider(
        process.env.REACT_APP_QUICKNODE_URL
      );
      if (!ethers.isAddress(address)) {
        throw new Error(t("invalidAddress"));
      }
      const bal = await provider.getBalance(address);
      setBalance(bal);
      setIsMonitoring(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="faucet-container">
      <h2>{t("faucetTitle")}</h2>

      <div className="input-section">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={t("enterWalletAddress")}
          className="address-input"
        />
        <button
          onClick={checkBalance}
          disabled={!address || isMonitoring}
          className="check-button"
        >
          {t("checkBalance")}
        </button>
      </div>

      {balance !== null && (
        <div className="balance-info">
          <p>
            {t("currentBalance")}: {ethers.formatEther(balance)} ETH
          </p>
        </div>
      )}

      {isMonitoring && (
        <div className="monitoring-status">
          <p>
            {t("monitoringStatus")}
            {dots}
          </p>
        </div>
      )}

      <div className="faucet-links">
        <h3>{t("availableFaucets")}:</h3>
        <div className="faucet-list">
          <div className="faucet-item">
            <h4>1. {t("quickNodeFaucet")}</h4>
            <a
              href="https://faucet.quicknode.com/ethereum/sepolia"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://faucet.quicknode.com/ethereum/sepolia
            </a>
            <p>- {t("captchaOnly")}</p>
            <p>- {t("dailyClaim")}</p>
          </div>

          <div className="faucet-item">
            <h4>2. {t("powFaucet")}</h4>
            <a
              href="https://sepolia-faucet.pk910.de/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://sepolia-faucet.pk910.de/
            </a>
            <p>- {t("noVerification")}</p>
            <p>- {t("browserMining")}</p>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Faucet;
