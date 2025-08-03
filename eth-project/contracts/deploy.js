const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment...");

  // Get the contract factory
  const GuessNumberGame = await hre.ethers.getContractFactory(
    "GuessNumberGame"
  );

  console.log("📦 Deploying GuessNumberGame...");

  // Deploy the contract
  const gameContract = await GuessNumberGame.deploy();

  // Wait for deployment to finish
  await gameContract.waitForDeployment();

  const contractAddress = await gameContract.getAddress();

  console.log("✅ GuessNumberGame deployed to:", contractAddress);
  console.log("📋 Contract details:");
  console.log("   - Network:", hre.network.name);
  console.log("   - Address:", contractAddress);

  // Verify the contract on Etherscan (if not on local network)
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("🔍 Verifying contract on Etherscan...");

    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
      });
      console.log("✅ Contract verified on Etherscan");
    } catch (error) {
      console.log("⚠️ Contract verification failed:", error.message);
    }
  }

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    contractAddress: contractAddress,
    deployer: await gameContract.runner.getAddress(),
    timestamp: new Date().toISOString(),
    contractName: "GuessNumberGame",
  };

  // Write to deployment.json
  const fs = require("fs");
  fs.writeFileSync("deployment.json", JSON.stringify(deploymentInfo, null, 2));

  console.log("💾 Deployment info saved to deployment.json");
  console.log("\n🎮 Game Contract Ready!");
  console.log("   - Players can now guess numbers 1-10");
  console.log("   - Game fee: 0.01 ETH");
  console.log("   - Win reward: 0.02 ETH");
  console.log("   - Contract owner can fund the contract for rewards");

  return contractAddress;
}

// Handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
