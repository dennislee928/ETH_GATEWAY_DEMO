import React, { useState } from "react";
import { ethers } from "ethers";
import { useTranslation } from "react-i18next";
import "./component-css/TokenSwapCalculator.css";

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

  // Mock exchange rates (in a real app, these would come from an API)
  const mockRates = {
    "ETH-USDT": 1800, // 1 ETH = 1800 USDT
    "ETH-USDC": 1800, // 1 ETH = 1800 USDC
    "USDT-ETH": 1 / 1800, // 1 USDT = 1/1800 ETH
    "USDT-USDC": 1, // 1 USDT = 1 USDC
    "USDC-ETH": 1 / 1800, // 1 USDC = 1/1800 ETH
    "USDC-USDT": 1, // 1 USDC = 1 USDT
  };

  const calculateSwap = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError("請輸入有效金額");
      return;
    }

    setLoading(true);
    setError(null);
    setEstimate(null);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const rateKey = `${fromToken}-${toToken}`;
      const rate = mockRates[rateKey];

      if (!rate) {
        throw new Error("不支援此代幣對");
      }

      const estimatedAmount = parseFloat(amount) * rate;
      setEstimate(estimatedAmount.toFixed(6));
    } catch (err) {
      console.error("計算錯誤:", err);
      setError("計算失敗: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="token-swap-calculator">
      <h3>{t("swapCalculator")}</h3>
      <p className="swap-description">
        這是一個模擬的代幣兌換計算器。在實際應用中，會使用實時匯率 API。
      </p>

      <div className="swap-form">
        <div className="input-group">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t("enterAmount")}
            min="0"
            step="0.000001"
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
        <button
          onClick={calculateSwap}
          disabled={loading || !amount || parseFloat(amount) <= 0}
          className="calculate-button"
        >
          {loading ? t("calculating") : t("calculate")}
        </button>
      </div>

      {estimate && (
        <div className="estimate">
          <h4>{t("estimatedOutput")}</h4>
          <div className="estimate-amount">
            {estimate} {toToken}
          </div>
          <div className="rate-info">
            匯率: 1 {fromToken} = {mockRates[`${fromToken}-${toToken}`]}{" "}
            {toToken}
          </div>
        </div>
      )}

      {error && (
        <div className="error">
          <span>⚠️ {error}</span>
        </div>
      )}

      <div className="swap-info">
        <h4>支援的代幣對</h4>
        <ul>
          <li>ETH ↔ USDT (1 ETH = 1800 USDT)</li>
          <li>ETH ↔ USDC (1 ETH = 1800 USDC)</li>
          <li>USDT ↔ USDC (1:1 匯率)</li>
        </ul>
      </div>
    </div>
  );
};

export default TokenSwapCalculator;
