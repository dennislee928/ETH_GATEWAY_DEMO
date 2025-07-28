import React, { useState } from "react";
import { ethers } from "ethers";
import { useTranslation } from "react-i18next";
import useWallet from "../../hooks/useWallet";
import "./component-css/BlockchainGame.css";

const BlockchainGame = () => {
  const { t } = useTranslation();
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // 使用集中化的錢包 hook
  const {
    account,
    isConnected,
    signer,
    chainId,
    error: walletError,
    connectWallet,
    switchNetwork,
  } = useWallet();

  // 猜數字遊戲合約 ABI
  const gameABI = [
    "function guess(uint256 number) public payable",
    "function getResult() public view returns (bool)",
    "event GuessResult(address player, bool won)",
  ];

  // Sepolia 測試網上的遊戲合約地址
  const GAME_CONTRACT_ADDRESS = "0x9377e92D7Dc8976CD9B96Ff29D65dF8908a48d7d";

  // 連接錢包
  const handleConnectWallet = async () => {
    await connectWallet();
  };

  // 切換到 Sepolia 網路
  const handleSwitchToSepolia = async () => {
    await switchNetwork(11155111);
  };

  // 玩遊戲
  const playGame = async () => {
    if (!isConnected) {
      setResult(t("pleaseConnect"));
      return;
    }

    if (!signer) {
      setResult("請先連接錢包");
      return;
    }

    if (chainId !== 11155111) {
      setResult("請切換到 Sepolia 測試網路");
      return;
    }

    if (!number || number < 1 || number > 10) {
      setResult(t("invalidNumber"));
      return;
    }

    setLoading(true);
    setResult("");

    try {
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
      console.error("遊戲錯誤:", err);

      if (err.code === 4001) {
        setResult("用戶拒絕交易");
      } else if (err.message.includes("insufficient funds")) {
        setResult("餘額不足，需要至少 0.01 ETH");
      } else {
        setResult("遊戲執行失敗: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blockchain-game">
      <h3>{t("guessNumber")}</h3>
      <p className="game-description">{t("gameDescription")}</p>

      {/* 錢包連接狀態 */}
      {walletError && <div className="error-message">{walletError}</div>}

      {!isConnected ? (
        <button onClick={handleConnectWallet} className="connect-button">
          {t("connectWallet")}
        </button>
      ) : (
        <div className="connected-info">
          <div>
            {t("connectedAs")}: {account.slice(0, 6)}...{account.slice(-4)}
          </div>
          <div className="network-info">
            網路: {chainId === 11155111 ? "Sepolia" : `Chain ID: ${chainId}`}
          </div>
          {chainId !== 11155111 && (
            <button
              onClick={handleSwitchToSepolia}
              className="switch-network-button"
            >
              切換到 Sepolia
            </button>
          )}
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
            disabled={!isConnected || loading || chainId !== 11155111}
          />
          <button
            onClick={playGame}
            disabled={
              !isConnected || loading || !number || chainId !== 11155111
            }
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
            <li>需要 Sepolia 測試網路的 ETH</li>
            <li>每次遊戲費用: 0.01 ETH</li>
            <li>猜中可獲得 0.02 ETH 獎勵</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlockchainGame;
