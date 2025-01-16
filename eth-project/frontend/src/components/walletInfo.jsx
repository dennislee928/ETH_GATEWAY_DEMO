import React, { useState } from "react";
import useBlockchain from "../hooks/useBLockchain";
import { useTranslation } from "react-i18next";

const WalletInfo = () => {
  const { t } = useTranslation();
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const { getBalance } = useBlockchain();

  const handleCheckBalance = async () => {
    try {
      const result = await getBalance(address);
      setBalance(result);
    } catch (error) {
      console.error("獲取餘額失敗:", error);
    }
  };

  return (
    <div>
      <h2>{t("walletBalanceQuery")}</h2>
      <br />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder={t("enterEthAddress")}
      />
      <br />
      <br />
      <div className="example-address">
        {t("exampleAddress")}: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
      </div>
      <br />
      <button onClick={handleCheckBalance}>{t("checkBalance")}</button>
      <br />
      <br />
      {balance && (
        <div>
          <h3>
            {t("balance")}: {balance} ETH
          </h3>
        </div>
      )}
    </div>
  );
};

export default WalletInfo;
