import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useTranslation } from "react-i18next";
import useWallet from "../../hooks/useWallet";
import WalletConnect from "../WalletConnect";
import "./component-css/BlockchainGame.css";

const BlockchainGame = () => {
  const { t } = useTranslation();
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [contractBalance, setContractBalance] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);

  // Use centralized wallet hook
  const { isConnected, signer, chainId, error: walletError } = useWallet();

  // Updated game contract ABI
  const gameABI = [
    "function guess(uint256 number) public payable",
    "function getResult() public view returns (bool)",
    "function getContractBalance() public view returns (uint256)",
    "function getWinningNumber() public view returns (uint256)",
    "event GuessResult(address player, bool won, uint256 guess, uint256 winningNumber)",
    "event GamePlayed(address player, uint256 guess, bool won)",
  ];

  // Sepolia testnet game contract address
  const GAME_CONTRACT_ADDRESS = "0x9377e92D7Dc8976CD9B96Ff29D65dF8908a48d7d";

  // Check contract balance
  const checkContractBalance = async () => {
    if (!isConnected || !signer) return;

    try {
      const gameContract = new ethers.Contract(
        GAME_CONTRACT_ADDRESS,
        gameABI,
        signer
      );

      const balance = await gameContract.getContractBalance();
      setContractBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error("Error checking contract balance:", error);
    }
  };

  // Play game
  const playGame = async () => {
    if (!isConnected) {
      setResult(t("pleaseConnect"));
      return;
    }

    if (!signer) {
      setResult("Please connect your wallet first");
      return;
    }

    if (chainId !== 11155111) {
      setResult("Please switch to Sepolia testnet");
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

      // Check contract balance before playing
      const balance = await gameContract.getContractBalance();
      const minBalance = ethers.parseEther("0.02");

      if (balance < minBalance) {
        setResult(
          "⚠️ Contract has insufficient funds for rewards. Game may still work but rewards are not guaranteed."
        );
      }

      // Send transaction with 0.01 ETH game fee
      const tx = await gameContract.guess(number, {
        value: ethers.parseEther("0.01"),
      });

      setResult("⏳ Transaction submitted! Waiting for confirmation...");

      // Wait for transaction confirmation
      const receipt = await tx.wait();

      // Check if transaction was successful
      if (receipt.status === 1) {
        // Get game result
        const won = await gameContract.getResult();

        const resultMessage = won
          ? "🎉 Congratulations! You won! Check your wallet for the reward."
          : "😔 Sorry, you didn't guess correctly. Try again!";

        setResult(resultMessage);

        // Add to game history
        setGameHistory((prev) => [
          ...prev,
          {
            guess: number,
            won,
            timestamp: new Date().toLocaleTimeString(),
            txHash: receipt.hash,
          },
        ]);

        // Update contract balance
        await checkContractBalance();
      } else {
        setResult("❌ Transaction failed. Please try again.");
      }
    } catch (err) {
      console.error("Game error:", err);

      let errorMessage = "Game execution failed: ";

      if (err.code === 4001) {
        errorMessage = "User rejected the transaction";
      } else if (err.message.includes("insufficient funds")) {
        errorMessage = "Insufficient balance. You need at least 0.01 ETH";
      } else if (err.message.includes("execution reverted")) {
        errorMessage =
          "Transaction reverted. This might be due to insufficient contract balance or network issues.";
      } else if (err.message.includes("network")) {
        errorMessage =
          "Network error. Please check your connection and try again.";
      } else {
        errorMessage += err.message;
      }

      setResult(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Check contract balance on component mount and when wallet connects
  useEffect(() => {
    if (isConnected && chainId === 11155111) {
      checkContractBalance();
    }
  }, [isConnected, chainId]);

  return (
    <div className="blockchain-game">
      <h3>{t("guessNumber")}</h3>
      <p className="game-description">{t("gameDescription")}</p>

      {/* Wallet Connect Component */}
      <div className="wallet-section">
        <WalletConnect showNetworkSwitch={true} />
      </div>

      {/* Wallet Error Display */}
      {walletError && <div className="error-message">{walletError}</div>}

      {/* Contract Balance Display */}
      {contractBalance !== null && (
        <div className="contract-info">
          <h4>Contract Balance: {contractBalance} ETH</h4>
          {parseFloat(contractBalance) < 0.02 && (
            <p className="warning">
              ⚠️ Low contract balance. Rewards may not be available.
            </p>
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
            className="number-input"
          />
          <button
            onClick={playGame}
            disabled={
              !isConnected || loading || !number || chainId !== 11155111
            }
            className="play-button"
          >
            {loading ? "⏳ Playing..." : "🎮 Play Game"}
          </button>
        </div>

        {result && (
          <div
            className={`result ${
              result.includes("won") || result.includes("Congratulations")
                ? "won"
                : "lost"
            }`}
          >
            {result}
          </div>
        )}

        {/* Game History */}
        {gameHistory.length > 0 && (
          <div className="game-history">
            <h4>Recent Games</h4>
            <div className="history-list">
              {gameHistory
                .slice(-5)
                .reverse()
                .map((game, index) => (
                  <div
                    key={index}
                    className={`history-item ${game.won ? "won" : "lost"}`}
                  >
                    <span>Guess: {game.guess}</span>
                    <span>{game.won ? "🎉 Won" : "😔 Lost"}</span>
                    <span>{game.timestamp}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="game-rules">
          <h4>{t("gameRules")}</h4>
          <ul>
            <li>{t("gameRule1")}</li>
            <li>{t("gameRule2")}</li>
            <li>{t("gameRule3")}</li>
            <li>Requires Sepolia testnet ETH</li>
            <li>Game fee: 0.01 ETH per play</li>
            <li>Win reward: 0.02 ETH (if contract has sufficient balance)</li>
            <li>Numbers range: 1-10</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlockchainGame;
