# Blockchain Game Troubleshooting Guide

## Transaction Execution Reverted Error

If you're experiencing the error: `transaction execution reverted`, here are the most common causes and solutions:

### 🔍 **Common Causes**

1. **Insufficient Contract Balance**

   - The contract doesn't have enough ETH to pay rewards
   - Solution: Fund the contract using the `fund-contract.js` script

2. **Network Issues**

   - Wrong network (must be Sepolia testnet)
   - RPC endpoint problems
   - Solution: Check network connection and switch to Sepolia

3. **Gas Issues**

   - Insufficient gas limit
   - Gas price too low
   - Solution: Increase gas limit or wait for network congestion to clear

4. **Contract State Issues**
   - Contract not properly deployed
   - ABI mismatch
   - Solution: Redeploy contract with updated code

### 🛠️ **Solutions**

#### 1. Fund the Contract

```bash
# Navigate to contracts directory
cd eth-project/contracts

# Update the contract address in fund-contract.js
# Then run:
npx hardhat run fund-contract.js --network sepolia
```

#### 2. Check Contract Balance

```javascript
// In the browser console or your app
const contract = new ethers.Contract(contractAddress, abi, provider);
const balance = await contract.getContractBalance();
console.log("Contract balance:", ethers.formatEther(balance), "ETH");
```

#### 3. Redeploy Contract

```bash
# Compile contracts
npx hardhat compile

# Deploy to Sepolia
npx hardhat run deploy.js --network sepolia

# Fund the new contract
npx hardhat run fund-contract.js --network sepolia
```

#### 4. Update Frontend Contract Address

After redeploying, update the contract address in:

- `src/components/adds-on-components/BlockchainGame.jsx`
- Line 25: `GAME_CONTRACT_ADDRESS`

### 🔧 **Contract Improvements Made**

The updated contract includes:

1. **Balance Checks**: Prevents reverts when contract has insufficient funds
2. **Better Error Handling**: More descriptive error messages
3. **Owner Functions**: Allow contract owner to fund and manage the contract
4. **Improved Random Number Generation**: More reliable random number generation
5. **Event Logging**: Better tracking of game events

### 📋 **Contract Functions**

```solidity
// Player functions
function guess(uint256 number) public payable
function getResult() public view returns (bool)

// Owner functions
function getContractBalance() public view returns (uint256)
function getWinningNumber() public view onlyOwner returns (uint256)
function fundContract() public payable onlyOwner
function withdraw() public onlyOwner
```

### 🎮 **Game Rules**

- **Numbers**: 1-10
- **Game Fee**: 0.01 ETH
- **Win Reward**: 0.02 ETH (if contract has sufficient balance)
- **Network**: Sepolia testnet only

### 🚨 **Error Messages**

| Error                             | Cause                    | Solution                                   |
| --------------------------------- | ------------------------ | ------------------------------------------ |
| "Please send exactly 0.01 ETH"    | Wrong amount sent        | Send exactly 0.01 ETH                      |
| "Number must be between 1 and 10" | Invalid number           | Choose number 1-10                         |
| "Insufficient balance"            | Not enough ETH in wallet | Get more Sepolia ETH                       |
| "Transaction reverted"            | Contract issues          | Check contract balance, redeploy if needed |

### 💡 **Testing Tips**

1. **Use Sepolia Faucet**: Get test ETH from faucets
2. **Check Network**: Always use Sepolia testnet
3. **Monitor Gas**: Use reasonable gas limits
4. **Test Small Amounts**: Start with small transactions
5. **Check Contract Balance**: Ensure contract has funds for rewards

### 🔗 **Useful Links**

- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Sepolia Etherscan](https://sepolia.etherscan.io/)
- [Hardhat Documentation](https://hardhat.org/docs)

### 📞 **Support**

If issues persist:

1. Check the browser console for detailed error messages
2. Verify contract deployment on Etherscan
3. Ensure you're using the correct network and contract address
4. Check that the contract has sufficient balance for rewards
