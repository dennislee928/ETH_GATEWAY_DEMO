import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./component-css/TokenPriceTracker.css";

const TokenPriceTracker = () => {
  const { t } = useTranslation();
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tokens = ["ethereum", "bitcoin", "binancecoin", "cardano", "solana"];

  const tokenImages = {
    ethereum:
      "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    bitcoin: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    binancecoin:
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    cardano: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
    solana: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
  };

  const fetchPrices = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${tokens.join(
          ","
        )}&vs_currencies=usd`
      );
      const data = await response.json();
      setPrices(data);
    } catch (err) {
      setError(t("priceError"));
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // 每分鐘更新
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="token-price-tracker">
      <h3>{t("tokenPrices")}</h3>
      <button onClick={fetchPrices} disabled={loading}>
        {t("refresh")}
      </button>
      <div className="price-grid">
        {Object.entries(prices).map(([token, price]) => (
          <div key={token} className="price-item">
            <img src={tokenImages[token]} alt={token} width="24" height="24" />
            <span className="token-name">{token}</span>
            <span className="token-price">${price.usd}</span>
          </div>
        ))}
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default TokenPriceTracker;
