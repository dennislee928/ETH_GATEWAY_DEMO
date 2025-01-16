import React, { useState } from "react";
import { ethers } from "ethers";
import { useTranslation } from "react-i18next";
import "./component-css/BlockchainGame.css";

const BlockchainGame = () => {
  const { t } = useTranslation();
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // 簡單的猜數字遊戲合約 ABI
  const gameABI = [
    "function guess(uint256 number) public payable",
    "function getResult() public view returns (bool)",
    "event GuessResult(address player, bool won)",
  ];

  const playGame = async () => {
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const gameContract = new ethers.Contract(
        "YOUR_GAME_CONTRACT_ADDRESS",
        gameABI,
        signer
      );

      const tx = await gameContract.guess(number, {
        value: ethers.parseEther("0.01"),
      });
      await tx.wait();

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
      <div className="game-container">
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder={t("enterNumber")}
        />
        <button onClick={playGame} disabled={loading}>
          {loading ? t("playing") : t("play")}
        </button>
      </div>
      {result && <div className="result">{result}</div>}
    </div>
  );
};

export default BlockchainGame;
