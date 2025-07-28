import React from "react";
import { useTranslation } from "react-i18next";
import useWallet from "../hooks/useWallet";
import "./component-css/WalletConnect.css";

const WalletConnect = ({
  onConnect,
  onDisconnect,
  showNetworkSwitch = true,
}) => {
  const { t } = useTranslation();
  const {
    account,
    isConnected,
    isConnecting,
    chainId,
    error,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    isMetaMaskAvailable,
  } = useWallet();

  const handleConnect = async () => {
    const success = await connectWallet();
    if (success && onConnect) {
      onConnect(account);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    if (onDisconnect) {
      onDisconnect();
    }
  };

  const handleSwitchToSepolia = async () => {
    await switchNetwork(11155111);
  };

  const handleSwitchToMainnet = async () => {
    await switchNetwork(1);
  };

  const getNetworkName = (chainId) => {
    switch (chainId) {
      case 1:
        return "Ethereum Mainnet";
      case 11155111:
        return "Sepolia Testnet";
      default:
        return `Chain ID: ${chainId}`;
    }
  };

  const getNetworkColor = (chainId) => {
    switch (chainId) {
      case 1:
        return "#4CAF50"; // Green for mainnet
      case 11155111:
        return "#FF9800"; // Orange for testnet
      default:
        return "#9E9E9E"; // Grey for unknown
    }
  };

  if (!isMetaMaskAvailable()) {
    return (
      <div className="wallet-connect">
        <div className="metamask-warning">
          <h3>{t("metamaskRequired")}</h3>
          <p>{t("metamaskInstallMessage")}</p>
          <div className="button-group">
            <button
              onClick={() =>
                window.open("https://metamask.io/download/", "_blank")
              }
              className="install-button"
            >
              {t("installMetamask")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wallet-connect">
      {error && (
        <div className="error-message">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            重試
          </button>
        </div>
      )}

      {!isConnected ? (
        <div className="connect-section">
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="connect-button"
          >
            {isConnecting ? t("connecting") : t("connectWallet")}
          </button>
          {isConnecting && (
            <div className="connecting-indicator">
              <div className="spinner"></div>
              <span>{t("checkMetamask")}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="connected-section">
          <div className="account-info">
            <div className="account-address">
              {account.slice(0, 6)}...{account.slice(-4)}
            </div>
            {chainId && (
              <div
                className="network-badge"
                style={{ backgroundColor: getNetworkColor(chainId) }}
              >
                {getNetworkName(chainId)}
              </div>
            )}
          </div>

          {showNetworkSwitch && (
            <div className="network-switch">
              <button
                onClick={handleSwitchToSepolia}
                className={`network-button ${
                  chainId === 11155111 ? "active" : ""
                }`}
              >
                Sepolia
              </button>
              <button
                onClick={handleSwitchToMainnet}
                className={`network-button ${chainId === 1 ? "active" : ""}`}
              >
                Mainnet
              </button>
            </div>
          )}

          <button onClick={handleDisconnect} className="disconnect-button">
            {t("disconnect")}
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
