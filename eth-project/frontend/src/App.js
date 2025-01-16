import "./App.css";
import WalletInfo from "./components/walletInfo";
import BlockchainExplorer from "./components/BlockchainExplorer";

function App() {
  return (
    <div className="container">
      <nav className="header">
        <h1 className="main-title">Sepolia Explorer</h1>
        <p className="subtitle">探索以太坊測試網路的世界</p>
      </nav>

      <div className="content-wrapper">
        <section className="card wallet-section">
          <h2 className="section-title">錢包資訊</h2>
          <WalletInfo />
        </section>

        <section className="card explorer-section">
          <h2 className="section-title">區塊鏈瀏覽器</h2>
          <BlockchainExplorer />
        </section>
      </div>
    </div>
  );
}

export default App;
