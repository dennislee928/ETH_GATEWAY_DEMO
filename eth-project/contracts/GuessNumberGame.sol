// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GuessNumberGame {
    uint256 private winningNumber;
    mapping(address => bool) public playerResults;
    address public owner;
    
    event GuessResult(address player, bool won, uint256 guess, uint256 winningNumber);
    event GamePlayed(address player, uint256 guess, bool won);
    
    constructor() {
        owner = msg.sender;
        // Initialize with a simple random number (1-10)
        winningNumber = (uint256(keccak256(abi.encodePacked(block.timestamp, blockhash(block.number - 1)))) % 10) + 1;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    function guess(uint256 number) public payable {
        require(msg.value == 0.01 ether, "Please send exactly 0.01 ETH");
        require(number >= 1 && number <= 10, "Number must be between 1 and 10");
        
        bool won = (number == winningNumber);
        playerResults[msg.sender] = won;
        
        // Check if contract has enough balance to pay reward
        if (won && address(this).balance >= 0.02 ether) {
            payable(msg.sender).transfer(0.02 ether);
        } else if (won) {
            // If contract doesn't have enough balance, refund the player's bet
            payable(msg.sender).transfer(msg.value);
        }
        
        // Generate new winning number
        winningNumber = (uint256(keccak256(abi.encodePacked(
            block.timestamp, 
            blockhash(block.number - 1), 
            msg.sender,
            number
        ))) % 10) + 1;
        
        emit GuessResult(msg.sender, won, number, winningNumber);
        emit GamePlayed(msg.sender, number, won);
    }
    
    function getResult() public view returns (bool) {
        return playerResults[msg.sender];
    }
    
    function getWinningNumber() public view onlyOwner returns (uint256) {
        return winningNumber;
    }
    
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    // Owner can withdraw contract balance
    function withdraw() public onlyOwner {
        require(address(this).balance > 0, "No balance to withdraw");
        payable(owner).transfer(address(this).balance);
    }
    
    // Owner can fund the contract
    function fundContract() public payable onlyOwner {
        require(msg.value > 0, "Must send some ETH");
    }
    
    // Fallback function to receive ETH
    receive() external payable {
        // Allow contract to receive ETH
    }
} 