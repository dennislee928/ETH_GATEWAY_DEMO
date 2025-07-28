import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import BlockchainExplorer from "./components/BlockchainExplorer";
import AdvancedFeatures from "./components/AdvancedFeatures";
import AddsOn from "./components/adds-on";
import Faucet from "./components/Faucet";
import "./i18n"; // 導入 i18n 配置
import "./App.css";
import "./utils/testRpcEndpoints"; // 導入 RPC 測試工具
import "./utils/emergencyFix"; // 導入緊急修復工具
import "./utils/forceReload"; // 導入強制重新載入工具

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorer" element={<BlockchainExplorer />} />
          <Route path="/advanced" element={<AdvancedFeatures />} />
          <Route path="/adds-on" element={<AddsOn />} />
          <Route path="/faucet" element={<Faucet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
