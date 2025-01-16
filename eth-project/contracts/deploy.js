async function main() {
  const GuessNumberGame = await ethers.getContractFactory("GuessNumberGame");
  console.log("Deploying GuessNumberGame...");
  const game = await GuessNumberGame.deploy();
  await game.deployed();
  console.log("GuessNumberGame deployed to:", game.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
