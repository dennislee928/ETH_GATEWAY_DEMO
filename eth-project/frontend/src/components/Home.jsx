import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./component-css/Home.css";
import BlockchainExplorer from "./BlockchainExplorer";
import WalletConnect from "./WalletConnect";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title glitch" data-text="ETH Gateway">
          ETH Gateway
        </h1>
        <p className="hero-subtitle">{t("welcomeSubtitle")}</p>

        {/* Quick Actions */}
        <div className="quick-actions">
          <WalletConnect />
        </div>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        <Link to="/explorer" className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>{t("blockchainExplorer")}</h3>
          <p>{t("blockchainExplorerDesc")}</p>
          <div className="feature-arrow">→</div>
        </Link>

        <Link to="/advanced" className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>{t("advancedFeatures")}</h3>
          <p>{t("advancedFeaturesDesc")}</p>
          <div className="feature-arrow">→</div>
        </Link>

        <Link to="/game" className="feature-card">
          <div className="feature-icon">🎮</div>
          <h3>{t("blockchainGame")}</h3>
          <p>{t("blockchainGameDesc")}</p>
          <div className="feature-arrow">→</div>
        </Link>

        <Link to="/adds-on" className="feature-card">
          <div className="feature-icon">🔧</div>
          <h3>{t("addsOn")}</h3>
          <p>{t("addsOnDesc")}</p>
          <div className="feature-arrow">→</div>
        </Link>

        <Link to="/faucet" className="feature-card">
          <div className="feature-icon">💧</div>
          <h3>{t("faucet")}</h3>
          <p>{t("faucetDesc")}</p>
          <div className="feature-arrow">→</div>
        </Link>

        <div className="feature-card">
          <div className="feature-icon">🔗</div>
          <h3>Blockchain Explorer</h3>
          <p>
            Search wallets, transactions, and explore the blockchain in
            real-time
          </p>
          <div className="feature-arrow">→</div>
        </div>
      </div>

      {/* Blockchain Explorer Section */}
      <div className="content-section">
        <h2 className="text-center mb-4">Live Blockchain Data</h2>
        <BlockchainExplorer />
      </div>

      {/* Info Section */}
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
            <span className="tech-item">Web3</span>
            <span className="tech-item">Solidity</span>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <h2>Ready to Explore?</h2>
        <p>Connect your wallet and start exploring the blockchain</p>
        <Link to="/explorer" className="cta-button">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
