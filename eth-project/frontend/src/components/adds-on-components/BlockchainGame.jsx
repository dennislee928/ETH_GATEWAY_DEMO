import React, { useState } from "react";
import { ethers } from "ethers";
import { useTranslation } from "react-i18next";
import "./component-css/BlockchainGame.css";

const BlockchainGame = () => {
  const { t } = useTranslation();
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [showMetaMaskWarning, setShowMetaMaskWarning] = useState(false);

  // 猜數字遊戲合約 ABI
  const gameABI = [
    "function guess(uint256 number) public payable",
    "function getResult() public view returns (bool)",
    "event GuessResult(address player, bool won)",
  ];

  // Sepolia 測試網上的遊戲合約地址
  const GAME_CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

  // 連接錢包
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setShowMetaMaskWarning(true);
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
      setConnected(true);

      // 監聽帳號變更
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
      });
    } catch (err) {
      console.error(err);
      setResult(t("connectionError"));
    }
  };

  // 玩遊戲
  const playGame = async () => {
    if (!connected) {
      setResult(t("pleaseConnect"));
      return;
    }

    if (!number || number < 1 || number > 10) {
      setResult(t("invalidNumber"));
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const gameContract = new ethers.Contract(
        GAME_CONTRACT_ADDRESS,
        gameABI,
        signer
      );

      // 發送交易，包含 0.01 ETH 的遊戲費用
      const tx = await gameContract.guess(number, {
        value: ethers.parseEther("0.01"),
      });

      setResult(t("waiting"));

      // 等待交易確認
      await tx.wait();

      // 獲取遊戲結果
      const won = await gameContract.getResult();
      setResult(won ? t("youWon") : t("youLost"));
    } catch (err) {
      console.error(err);
      setResult(t("gameError"));
    }
    setLoading(false);
  };

  return (
    <div className="blockchain-game">
      {showMetaMaskWarning && (
        <div
          className="metamask-warning"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 1000,
            border: "1px solid #ff9800",
            maxWidth: "400px",
            width: "90%",
          }}
        >
          <h3 style={{ color: "#ff9800", marginTop: 0 }}>
            {t("metamaskRequired")}
          </h3>
          <p>{t("metamaskInstallMessage")}</p>
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
          >
            <button
              onClick={() =>
                window.open("https://metamask.io/download/", "_blank")
              }
              style={{
                padding: "8px 16px",
                backgroundColor: "#ff9800",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#f57c00")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#ff9800")}
            >
              {t("installMetamask")}
            </button>
            <button
              onClick={() => setShowMetaMaskWarning(false)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#f5f5f5",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#e0e0e0")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
            >
              {t("close")}
            </button>
          </div>
        </div>
      )}

      <h3>{t("guessNumber")}</h3>
      <p className="game-description">{t("gameDescription")}</p>

      {!connected ? (
        <button onClick={connectWallet} className="connect-button">
          {t("connectWallet")}
        </button>
      ) : (
        <div className="connected-info">
          {t("connectedAs")}: {account.slice(0, 6)}...{account.slice(-4)}
        </div>
      )}

      <div className="game-container">
        <div className="input-section">
          <input
            type="number"
            min="1"
            max="10"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder={t("enterNumberPlaceholder")}
            disabled={!connected || loading}
          />
          <button
            onClick={playGame}
            disabled={!connected || loading || !number}
            className="play-button"
          >
            {loading ? t("playing") : t("play")}
          </button>
        </div>

        {result && (
          <div className={`result ${result.includes("won") ? "won" : "lost"}`}>
            {result}
          </div>
        )}

        <div className="game-rules">
          <h4>{t("gameRules")}</h4>
          <ul>
            <li>{t("gameRule1")}</li>
            <li>{t("gameRule2")}</li>
            <li>{t("gameRule3")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlockchainGame;
