import React, { useState } from "react";
import { ethers } from "ethers";
import { useTranslation } from "react-i18next";
import "./component-css/ENSResolver.css";
import {
  getRpcEndpoint,
  getNetworkConfig,
  validateAddress,
  formatErrorMessage,
} from "../../config/blockchain";

const ENSResolver = () => {
  const { t } = useTranslation();
  const [address, setAddress] = useState("");
  const [ensName, setEnsName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resolveENS = async () => {
    if (!address) {
      setError("請輸入以太坊地址");
      return;
    }

    if (!validateAddress(address)) {
      setError("無效的以太坊地址格式");
      return;
    }

    setLoading(true);
    setError("");
    setEnsName("");

    try {
      // 使用主網路的 RPC 端點，因為 ENS 只在主網路可用
      const mainnetEndpoint = "https://ethereum.publicnode.com";
      const provider = new ethers.JsonRpcProvider(mainnetEndpoint, {
        chainId: 1,
        name: "mainnet",
      });

      const name = await provider.lookupAddress(address);
      setEnsName(name || t("noENSFound"));
    } catch (err) {
      console.error("ENS 解析錯誤:", err);
      setError(formatErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ens-resolver">
      <h3>{t("ensReverse")}</h3>
      <p className="ens-description">
        ENS (Ethereum Name Service) 反向解析，將以太坊地址轉換為人類可讀的名稱。
      </p>

      <div className="input-group">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={t("enterEthAddress")}
          className="address-input"
        />
        <button
          onClick={resolveENS}
          disabled={loading || !address}
          className="resolve-button"
        >
          {loading ? t("resolving") : t("resolve")}
        </button>
      </div>

      {ensName && (
        <div className="result">
          <h4>{t("ensName")}</h4>
          <div className="ens-name">{ensName}</div>
        </div>
      )}

      {error && (
        <div className="error">
          <span>⚠️ {error}</span>
        </div>
      )}

      <div className="ens-info">
        <h4>關於 ENS</h4>
        <ul>
          <li>ENS 是建立在以太坊上的去中心化命名系統</li>
          <li>可以將複雜的地址轉換為易記的名稱</li>
          <li>
            例如：vitalik.eth 對應到 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
          </li>
          <li>只有主網路支援 ENS 解析</li>
        </ul>
      </div>
    </div>
  );
};

export default ENSResolver;
