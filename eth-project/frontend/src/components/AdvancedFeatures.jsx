import React, { useState, useEffect, useMemo } from "react";
import { ethers } from "ethers";
import { useTranslation } from "react-i18next";
import "./component-css/advanced-features.css";
import {
  getRpcEndpoint,
  getNetworkConfig,
  formatErrorMessage,
} from "../config/blockchain";

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

  // 使用 useMemo 來避免每次渲染都重新創建 provider
  const provider = useMemo(() => {
    const gateway = getRpcEndpoint();
    const networkConfig = getNetworkConfig();

    return new ethers.JsonRpcProvider(gateway, {
      chainId: networkConfig.chainId,
      name: networkConfig.name,
    });
  }, []);

  // 1. 交易相關功能
  const getTransactionDetails = async (txHash) => {
    setLoading(true);
    try {
      const tx = await provider.getTransaction(txHash);
      setData((prev) => ({ ...prev, transactions: tx }));
    } catch (error) {
      setError(formatErrorMessage(error));
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
      setError(formatErrorMessage(error));
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
      setError(formatErrorMessage(error));
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
      setError(formatErrorMessage(error));
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
      setError(formatErrorMessage(error));
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

    return () => {
      if (unsubscribe) {
        provider.removeListener("block", unsubscribe);
      }
    };
  }, [provider]);

  // 使用說明內容
  const instructions = {
    transaction: {
      title: t("transactionInstructionsTitle"),
      steps: [t("transactionInstruction1"), t("transactionInstruction2")],
    },
    block: {
      title: t("networkInstructionsTitle"),
      steps: [t("networkInstruction1"), t("networkInstruction2")],
    },
    gas: {
      title: t("gasInstructions"),
      steps: [t("gasInstruction1"), t("gasInstruction2")],
    },
    token: {
      title: t("tokenInstructions"),
      steps: [t("tokenInstruction1"), t("tokenInstruction2")],
    },
    ens: {
      title: t("ensInstructions"),
      steps: [t("ensInstruction1"), t("ensInstruction2")],
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
              <button onClick={getGasPrice}>{t("refresh")}</button>
              {data.gasInfo && (
                <pre className="result-display">
                  {JSON.stringify(data.gasInfo, null, 2)}
                </pre>
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
                <pre className="result-display">{data.ensAddress}</pre>
              )}
            </div>
          </section>
        </div>
      )}

      {loading && <div className="loading">{t("loading")}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default AdvancedFeatures;
