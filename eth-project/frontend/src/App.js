import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BlockchainExplorer from "./components/BlockchainExplorer";
import AdvancedFeatures from "./components/AdvancedFeatures";
import AddsOn from "./components/adds-on";
import Footer from "./components/footer";
import Faucet from "./components/Faucet";
import "./App.css";

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
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
