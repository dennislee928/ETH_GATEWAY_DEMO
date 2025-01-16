import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BlockchainExplorer from "./components/BlockchainExplorer";
import AdvancedFeatures from "./components/AdvancedFeatures";
import AddsOn from "./components/adds-on";
import Footer from "./components/footer";
import Faucet from "./components/Faucet.jsx";
import "./App.css";
import "./i18n"; // 確保導入 i18n 配置
import ENSResolver from "./components/adds-on-components/ENSResolver";
import TokenPriceTracker from "./components/adds-on-components/TokenPriceTracker";
import BlockchainGame from "./components/adds-on-components/BlockchainGame";
import TokenSwapCalculator from "./components/adds-on-components/TokenSwapCalculator";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <BlockchainExplorer />
                  <AdvancedFeatures />
                  <AddsOn />
                </>
              }
            />
            <Route path="/faucet" element={<Faucet />} />
            <Route path="/ens" element={<ENSResolver />} />
            <Route path="/prices" element={<TokenPriceTracker />} />
            <Route path="/game" element={<BlockchainGame />} />
            <Route path="/swap" element={<TokenSwapCalculator />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
