import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useTranslation } from "react-i18next";
import "../components/component-css/AdvancedFeatures.css";

const AdvancedFeatures = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("instructions");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    transactions: null,
    blockDetails: null,
    tokenBalance: null,
    gasInfo: null,
    ensAddress: null,
  });

  const QUICKNODE_HTTP_URL =
    "https://tiniest-fragrant-isle.ethereum-sepolia.quiknode.pro/019655654452530d858bf60fe8a110d43ffad364/";
  const provider = new ethers.JsonRpcProvider(QUICKNODE_HTTP_URL);

  // 1. 交易相關功能
  const getTransactionDetails = async (txHash) => {
    setLoading(true);
    try {
      const tx = await provider.getTransaction(txHash);
      setData((prev) => ({ ...prev, transactions: tx }));
    } catch (error) {
      setError(t("txError"));
    } finally {
      setLoading(false);
    }
  };

  // 2. 區塊相關功能
  const getBlockDetails = async (blockNumber) => {
    setLoading(true);
    try {
      const block = await provider.getBlock(blockNumber);
      setData((prev) => ({ ...prev, blockDetails: block }));
    } catch (error) {
      setError(t("blockError"));
    } finally {
      setLoading(false);
    }
  };

  // 3. 智能合約互動
  const getTokenBalance = async (tokenAddress, walletAddress) => {
    setLoading(true);
    try {
      const erc20Abi = ["function balanceOf(address) view returns (uint256)"];
      const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);
      const balance = await contract.balanceOf(walletAddress);
      setData((prev) => ({
        ...prev,
        tokenBalance: ethers.formatEther(balance),
      }));
    } catch (error) {
      setError(t("tokenError"));
    } finally {
      setLoading(false);
    }
  };

  // 4. Gas 相關功能
  const getGasPrice = async () => {
    setLoading(true);
    try {
      const gasPrice = await provider.getFeeData();
      setData((prev) => ({
        ...prev,
        gasInfo: {
          gasPrice: ethers.formatUnits(gasPrice.gasPrice, "gwei"),
          maxFeePerGas: ethers.formatUnits(gasPrice.maxFeePerGas, "gwei"),
          maxPriorityFeePerGas: ethers.formatUnits(
            gasPrice.maxPriorityFeePerGas,
            "gwei"
          ),
        },
      }));
    } catch (error) {
      setError(t("gasError"));
    } finally {
      setLoading(false);
    }
  };

  // 5. ENS 解析
  const resolveEns = async (ensName) => {
    setLoading(true);
    try {
      const address = await provider.resolveName(ensName);
      setData((prev) => ({ ...prev, ensAddress: address }));
    } catch (error) {
      setError(t("ensError"));
    } finally {
      setLoading(false);
    }
  };

  // 監聽新區塊
  useEffect(() => {
    let unsubscribe;

    const subscribeToBlocks = async () => {
      try {
        unsubscribe = provider.on("block", (blockNumber) => {
          console.log("New block:", blockNumber);
        });
      } catch (error) {
        console.error("Block subscription error:", error);
      }
    };

    subscribeToBlocks();

    // 清理函數
    return () => {
      if (unsubscribe) {
        provider.removeListener("block", unsubscribe);
      }
    };
  }, [provider]);

  // 使用說明內容
  const instructions = {
    transaction: {
      title: t("transactionInstructions"),
      steps: [t("enterTxHashInstruction"), t("viewTxDetailsInstruction")],
    },
    block: {
      title: t("blockInstructions"),
      steps: [
        t("enterBlockNumberInstruction"),
        t("viewBlockDetailsInstruction"),
      ],
    },
    gas: {
      title: t("gasInstructions"),
      steps: [t("clickRefreshInstruction"), t("viewGasPricesInstruction")],
    },
    token: {
      title: t("tokenInstructions"),
      steps: [
        t("enterTokenAddressInstruction"),
        t("viewTokenBalanceInstruction"),
      ],
    },
    ens: {
      title: t("ensInstructions"),
      steps: [t("enterEnsNameInstruction"), t("viewEnsAddressInstruction")],
    },
  };

  return (
    <div className="advanced-features">
      <div className="features-nav">
        <button
          className={`nav-button ${
            activeTab === "instructions" ? "active" : ""
          }`}
          onClick={() => setActiveTab("instructions")}
        >
          {t("instructions")}
        </button>
        <button
          className={`nav-button ${activeTab === "features" ? "active" : ""}`}
          onClick={() => setActiveTab("features")}
        >
          {t("features")}
        </button>
      </div>

      {activeTab === "instructions" ? (
        <div className="instructions-container">
          <h3>{t("howToUse")}</h3>

          {Object.entries(instructions).map(([key, section]) => (
            <div key={key} className="instruction-section">
              <h4>{section.title}</h4>
              <ol>
                {section.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      ) : (
        <div className="features-container">
          {/* 交易查詢 */}
          <section className="feature-section">
            <h3>{t("transactionDetails")}</h3>
            <div className="feature-content">
              <input
                type="text"
                placeholder={t("enterTxHash")}
                onChange={(e) => getTransactionDetails(e.target.value)}
              />
              {data.transactions && (
                <pre className="result-display">
                  {JSON.stringify(data.transactions, null, 2)}
                </pre>
              )}
            </div>
          </section>

          {/* 區塊查詢 */}
          <section className="feature-section">
            <h3>{t("blockDetails")}</h3>
            <div className="feature-content">
              <input
                type="number"
                placeholder={t("enterBlockNumber")}
                onChange={(e) => getBlockDetails(e.target.value)}
              />
              {data.blockDetails && (
                <pre className="result-display">
                  {JSON.stringify(data.blockDetails, null, 2)}
                </pre>
              )}
            </div>
          </section>

          {/* Gas 價格 */}
          <section className="feature-section">
            <h3>{t("gasPrice")}</h3>
            <div className="feature-content">
              <button onClick={getGasPrice} className="refresh-button">
                {t("refreshGasPrice")}
              </button>
              {data.gasInfo && (
                <div className="gas-info">
                  <p>Gas Price: {data.gasInfo.gasPrice} Gwei</p>
                  <p>Max Fee: {data.gasInfo.maxFeePerGas} Gwei</p>
                  <p>Priority Fee: {data.gasInfo.maxPriorityFeePerGas} Gwei</p>
                </div>
              )}
            </div>
          </section>

          {/* Token 餘額 */}
          <section className="feature-section">
            <h3>{t("tokenBalance")}</h3>
            <div className="feature-content">
              <input
                type="text"
                placeholder={t("enterTokenAddress")}
                onChange={(e) =>
                  getTokenBalance(e.target.value, "YOUR_WALLET_ADDRESS")
                }
              />
              {data.tokenBalance && (
                <p className="token-balance">
                  Token Balance: {data.tokenBalance}
                </p>
              )}
            </div>
          </section>

          {/* ENS 解析 */}
          <section className="feature-section">
            <h3>{t("ensLookup")}</h3>
            <div className="feature-content">
              <input
                type="text"
                placeholder={t("enterEnsName")}
                onChange={(e) => resolveEns(e.target.value)}
              />
              {data.ensAddress && (
                <p className="ens-result">Address: {data.ensAddress}</p>
              )}
            </div>
          </section>
        </div>
      )}

      {loading && <div className="loading-indicator">{t("loading")}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default AdvancedFeatures;
