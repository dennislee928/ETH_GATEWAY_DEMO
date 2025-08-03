const hre = require("hardhat");

async function main() {
  console.log("💰 Funding game contract...");

  // Contract address (update this with your deployed contract address)
  const CONTRACT_ADDRESS = "0x9377e92D7Dc8976CD9B96Ff29D65dF8908a48d7d"; // Update this

  // Amount to fund (in ETH)
  const FUND_AMOUNT = "0.1"; // 0.1 ETH

  try {
    // Get the contract
    const GuessNumberGame = await hre.ethers.getContractFactory(
      "GuessNumberGame"
    );
    const gameContract = GuessNumberGame.attach(CONTRACT_ADDRESS);

    // Get the signer
    const [deployer] = await hre.ethers.getSigners();

    console.log("📋 Contract details:");
    console.log("   - Address:", CONTRACT_ADDRESS);
    console.log("   - Fund amount:", FUND_AMOUNT, "ETH");
    console.log("   - Deployer:", await deployer.getAddress());

    // Check current balance
    const currentBalance = await hre.ethers.provider.getBalance(
      CONTRACT_ADDRESS
    );
    console.log(
      "   - Current contract balance:",
      hre.ethers.formatEther(currentBalance),
      "ETH"
    );

    // Fund the contract
    console.log("💸 Funding contract...");
    const fundTx = await gameContract.fundContract({
      value: hre.ethers.parseEther(FUND_AMOUNT),
    });

    console.log("⏳ Waiting for transaction confirmation...");
    await fundTx.wait();

    // Check new balance
    const newBalance = await hre.ethers.provider.getBalance(CONTRACT_ADDRESS);
    console.log("✅ Contract funded successfully!");
    console.log(
      "   - New contract balance:",
      hre.ethers.formatEther(newBalance),
      "ETH"
    );
    console.log("   - Transaction hash:", fundTx.hash);

    // Calculate how many games can be played
    const gamesPossible = Math.floor(
      parseFloat(hre.ethers.formatEther(newBalance)) / 0.02
    );
    console.log("🎮 Games possible with current balance:", gamesPossible);
  } catch (error) {
    console.error("❌ Funding failed:", error.message);

    if (error.message.includes("insufficient funds")) {
      console.log("💡 Make sure your deployer account has enough ETH");
    } else if (error.message.includes("nonce")) {
      console.log(
        "💡 Try increasing the gas limit or wait for pending transactions"
      );
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });
