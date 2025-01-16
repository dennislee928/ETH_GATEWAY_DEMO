import React, { useState } from "react";
import { ethers } from "ethers";
import { useTranslation } from "react-i18next";
import "../components/component-css/adds-on.css";

const AddsOn = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("events");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    transfers: [],
    contractInfo: null,
    networkStats: null,
    addressInfo: null,
    transactionDetails: null,
  });
  const [address, setAddress] = useState("");
  const [txHash, setTxHash] = useState("");

  const provider = new ethers.JsonRpcProvider(
    "https://ethereum-sepolia.publicnode.com"
  );

  // 1. 事件監聽和歷史記錄
  const watchTransfers = async (address) => {
    setLoading(true);
    try {
      const filter = {
        address: address,
        topics: [ethers.id("Transfer(address,address,uint256)")],
      };

      provider.on(filter, (log) => {
        setData((prev) => ({
          ...prev,
          transfers: [...prev.transfers, log],
        }));
      });
    } catch (error) {
      setError(t("eventError"));
    } finally {
      setLoading(false);
    }
  };

  const getTransactionHistory = async (address) => {
    setLoading(true);
    try {
      const block = await provider.getBlockNumber();
      const startBlock = block - 100;

      const history = await provider.getLogs({
        fromBlock: startBlock,
        toBlock: "latest",
        address: address,
      });

      setData((prev) => ({ ...prev, transfers: history }));
    } catch (error) {
      setError(t("historyError"));
    } finally {
      setLoading(false);
    }
  };

  // 2. 智能合約互動增強
  const getContractInfo = async (address) => {
    setLoading(true);
    try {
      const [code, tokenInfo] = await Promise.all([
        provider.getCode(address),
        getTokenInfo(address),
      ]);

      setData((prev) => ({
        ...prev,
        contractInfo: {
          isContract: code !== "0x",
          ...tokenInfo,
        },
      }));
    } catch (error) {
      setError(t("contractError"));
    } finally {
      setLoading(false);
    }
  };

  const getTokenInfo = async (tokenAddress) => {
    try {
      const abi = [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function decimals() view returns (uint8)",
      ];
      const contract = new ethers.Contract(tokenAddress, abi, provider);

      const [name, symbol, decimals] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.decimals(),
      ]);

      return { name, symbol, decimals };
    } catch (error) {
      return { name: "N/A", symbol: "N/A", decimals: 0 };
    }
  };

  // 3. 區塊鏈狀態查詢
  const getNetworkStats = async () => {
    setLoading(true);
    try {
      const [blockNumber, gasPrice, feeData] = await Promise.all([
        provider.getBlockNumber(),
        provider.getGasPrice(),
        provider.getFeeData(),
      ]);

      setData((prev) => ({
        ...prev,
        networkStats: {
          currentBlock: blockNumber,
          gasPrice: ethers.formatUnits(gasPrice, "gwei"),
          baseFee: ethers.formatUnits(feeData.lastBaseFeePerGas || 0, "gwei"),
          priorityFee: ethers.formatUnits(
            feeData.maxPriorityFeePerGas || 0,
            "gwei"
          ),
        },
      }));
    } catch (error) {
      setError(t("networkError"));
    } finally {
      setLoading(false);
    }
  };

  const checkAddressType = async (address) => {
    setLoading(true);
    try {
      const [code, balance] = await Promise.all([
        provider.getCode(address),
        provider.getBalance(address),
      ]);

      setData((prev) => ({
        ...prev,
        addressInfo: {
          isContract: code !== "0x",
          hasBalance: balance > 0,
          balance: ethers.formatEther(balance),
        },
      }));
    } catch (error) {
      setError(t("addressError"));
    } finally {
      setLoading(false);
    }
  };

  // 4. 交易解析
  const parseTransaction = async (txHash) => {
    setLoading(true);
    try {
      const tx = await provider.getTransaction(txHash);
      const receipt = await provider.getTransactionReceipt(txHash);

      setData((prev) => ({
        ...prev,
        transactionDetails: {
          from: tx.from,
          to: tx.to,
          value: ethers.formatEther(tx.value),
          gasUsed: receipt.gasUsed.toString(),
          status: receipt.status === 1 ? t("success") : t("failed"),
          blockNumber: receipt.blockNumber,
          confirmations: tx.confirmations,
        },
      }));
    } catch (error) {
      setError(t("parseError"));
    } finally {
      setLoading(false);
    }
  };

  // 添加說明內容
  const instructions = {
    events: {
      title: t("eventInstructionsTitle"),
      content: [
        t("eventInstruction1"), // "輸入合約地址來監聽轉帳事件"
        t("eventInstruction2"), // "點擊 '監聽轉帳' 開始即時監控"
        t("eventInstruction3"), // "點擊 '獲取歷史' 查看過去的轉帳記錄"
      ],
      example: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    },
    contracts: {
      title: t("contractInstructionsTitle"),
      content: [
        t("contractInstruction1"), // "輸入智能合約地址"
        t("contractInstruction2"), // "獲取合約基本信息，包括名稱、符號和小數位"
      ],
      example: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", // Uniswap Token
    },
    network: {
      title: t("networkInstructionsTitle"),
      content: [
        t("networkInstruction1"), // "點擊 '刷新狀態' 獲取最新網絡信息"
        t("networkInstruction2"), // "輸入地址並點擊 '檢查地址' 查看詳情"
      ],
      example: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
    },
    transactions: {
      title: t("transactionInstructionsTitle"),
      content: [
        t("transactionInstruction1"), // "輸入交易哈希"
        t("transactionInstruction2"), // "查看交易詳細信息"
      ],
      example: "0x123...",
    },
  };

  return (
    <div className="adds-on">
      <div className="tabs">
        <button
          className={activeTab === "events" ? "active" : ""}
          onClick={() => setActiveTab("events")}
        >
          {t("events")}
        </button>
        <button
          className={activeTab === "contracts" ? "active" : ""}
          onClick={() => setActiveTab("contracts")}
        >
          {t("contracts")}
        </button>
        <button
          className={activeTab === "network" ? "active" : ""}
          onClick={() => setActiveTab("network")}
        >
          {t("network")}
        </button>
        <button
          className={activeTab === "transactions" ? "active" : ""}
          onClick={() => setActiveTab("transactions")}
        >
          {t("transactions")}
        </button>
      </div>

      <div className="content">
        {activeTab === "events" && (
          <div className="section">
            <h3>{t("transferEvents")}</h3>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t("enterContractAddress")}
            />
            <div className="button-group">
              <button onClick={() => watchTransfers(address)}>
                {t("watchTransfers")}
              </button>
              <button onClick={() => getTransactionHistory(address)}>
                {t("getHistory")}
              </button>
            </div>
            {data.transfers.length > 0 && (
              <pre>{JSON.stringify(data.transfers, null, 2)}</pre>
            )}
          </div>
        )}

        {activeTab === "contracts" && (
          <div className="section">
            <h3>{t("contractInfo")}</h3>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t("enterContractAddress")}
            />
            <button onClick={() => getContractInfo(address)}>
              {t("getContractInfo")}
            </button>
            {data.contractInfo && (
              <pre>{JSON.stringify(data.contractInfo, null, 2)}</pre>
            )}
          </div>
        )}

        {activeTab === "network" && (
          <div className="section">
            <h3>{t("networkStats")}</h3>
            <div className="button-group">
              <button onClick={getNetworkStats}>{t("refreshStats")}</button>
              <button onClick={() => checkAddressType(address)}>
                {t("checkAddress")}
              </button>
            </div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t("enterAddress")}
            />
            {data.networkStats && (
              <pre>{JSON.stringify(data.networkStats, null, 2)}</pre>
            )}
            {data.addressInfo && (
              <pre>{JSON.stringify(data.addressInfo, null, 2)}</pre>
            )}
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="section">
            <h3>{t("transactionDetails")}</h3>
            <input
              type="text"
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
              placeholder={t("enterTxHash")}
            />
            <button onClick={() => parseTransaction(txHash)}>
              {t("parseTransaction")}
            </button>
            {data.transactionDetails && (
              <pre>{JSON.stringify(data.transactionDetails, null, 2)}</pre>
            )}
          </div>
        )}

        {/* 添加說明部分 */}
        <div className="instructions-section">
          <h3 className="instructions-title">{t("instructions")}</h3>

          <div className="instructions-content">
            {/* 當前標籤頁的說明 */}
            <div className="current-tab-instructions">
              <h4>{instructions[activeTab].title}</h4>
              <ul>
                {instructions[activeTab].content.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
              <div className="example">
                <span className="example-label">{t("example")}:</span>
                <code>{instructions[activeTab].example}</code>
              </div>
              {/* 提示和建議 */}
              <div className="tips">
                <h4>{t("tips")}</h4>
                <ul>
                  <li>{t("tip1")}</li>
                  <li>{t("tip2")}</li>
                  <li>{t("tip3")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {loading && <div className="loading">{t("loading")}</div>}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default AddsOn;
