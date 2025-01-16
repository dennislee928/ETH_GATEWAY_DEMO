import React, { useState } from "react";
import { ethers } from "ethers";
import { useTranslation } from "react-i18next";
import "./component-css/ENSResolver.css";

const ENSResolver = () => {
  const { t } = useTranslation();
  const [address, setAddress] = useState("");
  const [ensName, setEnsName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const provider = new ethers.JsonRpcProvider(
    "https://ethereum-mainnet.publicnode.com"
  );

  const resolveENS = async () => {
    setLoading(true);
    setError("");
    try {
      const name = await provider.lookupAddress(address);
      setEnsName(name || t("noENSFound"));
    } catch (err) {
      setError(t("ensError"));
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="ens-resolver">
      <h3>{t("ensReverse")}</h3>
      <div className="input-group">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={t("enterEthAddress")}
        />
        <button onClick={resolveENS} disabled={loading}>
          {loading ? t("resolving") : t("resolve")}
        </button>
      </div>
      {ensName && (
        <div className="result">
          {t("ensName")}: {ensName}
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ENSResolver;
