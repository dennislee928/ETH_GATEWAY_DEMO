import React, { useState } from "react";
import useBlockchain from "../hooks/useBLockchain";

const WalletInfo = () => {
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
      <h2>錢包餘額查詢</h2>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="請輸入以太坊地址"
      />
      <button onClick={handleCheckBalance}>查詢餘額</button>

      {balance && (
        <div>
          <h3>餘額：{balance} ETH</h3>
        </div>
      )}
    </div>
  );
};

export default WalletInfo;
