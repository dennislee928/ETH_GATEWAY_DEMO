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
        throw new Error(t("noMetamask"));
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
