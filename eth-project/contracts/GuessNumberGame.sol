// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GuessNumberGame {
    uint256 private winningNumber;
    mapping(address => bool) public playerResults;
    
    event GuessResult(address player, bool won);
    
    constructor() {
        // 初始化隨機數 (1-10)
        winningNumber = (uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))) % 10) + 1;
    }
    
    function guess(uint256 number) public payable {
        require(msg.value == 0.01 ether, "Please send exactly 0.01 ETH");
        require(number >= 1 && number <= 10, "Number must be between 1 and 10");
        
        bool won = (number == winningNumber);
        playerResults[msg.sender] = won;
        
        if (won) {
            payable(msg.sender).transfer(0.02 ether);
        }
        
        // 重新生成隨機數
        winningNumber = (uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender))) % 10) + 1;
        
        emit GuessResult(msg.sender, won);
    }
    
    function getResult() public view returns (bool) {
        return playerResults[msg.sender];
    }
    
    // 合約擁有者可以提取剩餘的 ETH
    function withdraw() public {
        payable(msg.sender).transfer(address(this).balance);
    }
} 