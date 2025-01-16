const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// 初始化 provider
const provider = new ethers.JsonRpcProvider(process.env.QUICKNODE_URL);

// API 路由
app.get("/api/gas-price", async (req, res) => {
  try {
    const gasPrice = await provider.getFeeData();
    res.json(gasPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/block/:number", async (req, res) => {
  try {
    const block = await provider.getBlock(req.params.number);
    res.json(block);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
