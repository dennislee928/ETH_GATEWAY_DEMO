// SPDX-License-Identifier: MIT
/// @custom:dev-run-script scripts/deploy.js
pragma solidity ^0.8.19;

contract GuessNumberGame {
    address private owner;
    uint256 private constant GAME_COST = 0.00001 ether;
    uint256 private constant MIN_NUMBER = 1;
    uint256 private constant MAX_NUMBER = 10;
    
    mapping(address => bool) private lastGameResult;
    mapping(address => bool) private hasGuessed;
    
    event GuessResult(address indexed player, bool won);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    // 生成隨機數 (1-10)
    function generateRandomNumber() private view returns (uint256) {
        return uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.prevrandao,
                    msg.sender
                )
            )
        ) % 10 + 1;
    }
    
    // 猜數字
    function guess(uint256 number) public payable {
        require(msg.value == GAME_COST, "Please send exactly 0.01 ETH");
        require(number >= MIN_NUMBER && number <= MAX_NUMBER, "Number must be between 1 and 10");
        
        uint256 winningNumber = generateRandomNumber();
        bool won = (number == winningNumber);
        
        lastGameResult[msg.sender] = won;
        hasGuessed[msg.sender] = true;
        
        if (won) {
            // 贏了返回雙倍金額
            payable(msg.sender).transfer(GAME_COST * 2);
        }
        
        emit GuessResult(msg.sender, won);
    }
    
    // 獲取上次遊戲結果
    function getResult() public view returns (bool) {
        require(hasGuessed[msg.sender], "You haven't played yet");
        return lastGameResult[msg.sender];
    }
    
    // 合約餘額
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    // 允許合約擁有者提取資金
    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
    
    // 接收 ETH
    receive() external payable {}
}