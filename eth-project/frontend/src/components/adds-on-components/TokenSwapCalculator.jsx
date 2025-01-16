import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useTranslation } from "react-i18next";
import "./component-css/TokenSwapCalculator.css";

const API_URL = "https://api.1inch.dev/v5.0/1";
const API_KEY = "YOUR_API_KEY"; // 需要從 1inch 開發者門戶獲取 API key

const TokenSwapCalculator = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDT");
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tokens = {
    ETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  };

  const calculateSwap = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/quote?` +
          `fromTokenAddress=${tokens[fromToken]}&` +
          `toTokenAddress=${tokens[toToken]}&` +
          `amount=${ethers.parseEther(amount)}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();
      setEstimate(ethers.formatEther(data.toTokenAmount));
    } catch (err) {
      console.error(err);
      setError(t("swapError"));
    }
    setLoading(false);
  };

  return (
    <div className="token-swap-calculator">
      <h3>{t("swapCalculator")}</h3>
      <div className="swap-form">
        <div className="input-group">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t("enterAmount")}
          />
          <select
            value={fromToken}
            onChange={(e) => setFromToken(e.target.value)}
          >
            {Object.keys(tokens).map((token) => (
              <option key={token} value={token}>
                {token}
              </option>
            ))}
          </select>
        </div>
        <div className="arrow">→</div>
        <div className="input-group">
          <select value={toToken} onChange={(e) => setToToken(e.target.value)}>
            {Object.keys(tokens).map((token) => (
              <option key={token} value={token}>
                {token}
              </option>
            ))}
          </select>
        </div>
        <button onClick={calculateSwap} disabled={loading}>
          {loading ? t("calculating") : t("calculate")}
        </button>
      </div>
      {estimate && (
        <div className="estimate">
          {t("estimatedOutput")}: {estimate} {toToken}
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default TokenSwapCalculator;
