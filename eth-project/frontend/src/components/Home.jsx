import React from "react";
import { useTranslation } from "react-i18next";
import "./component-css/Home.css";
import BlockchainExplorer from "./BlockchainExplorer";
import WalletConnect from "./WalletConnect";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">{t("welcomeTitle")}</h1>
        <p className="hero-subtitle">{t("welcomeSubtitle")}</p>

        <BlockchainExplorer />
        <WalletConnect />
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>{t("blockchainExplorer")}</h3>
            <p>{t("blockchainExplorerDesc")}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>{t("advancedFeatures")}</h3>
            <p>{t("advancedFeaturesDesc")}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎮</div>
            <h3>{t("blockchainGame")}</h3>
            <p>{t("blockchainGameDesc")}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💧</div>
            <h3>{t("faucet")}</h3>
            <p>{t("faucetDesc")}</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>{t("aboutTitle")}</h2>
        <p>{t("aboutDescription")}</p>

        <div className="tech-stack">
          <h3>{t("techStack")}</h3>
          <div className="tech-items">
            <span className="tech-item">React</span>
            <span className="tech-item">Ethers.js</span>
            <span className="tech-item">MetaMask</span>
            <span className="tech-item">Sepolia Testnet</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
