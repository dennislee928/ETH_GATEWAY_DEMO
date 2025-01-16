import { ethers } from "ethers";

const useBlockchain = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_ETH_GATEWAY
  );

  const getBalance = async (address) => {
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
  };

  return { provider, getBalance };
};

export default useBlockchain;
