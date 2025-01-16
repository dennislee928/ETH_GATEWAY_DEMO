import "./App.css";
import WalletInfo from "./components/walletInfo";
import BlockchainExplorer from "./components/BlockchainExplorer";

function App() {
  return (
    <>
      <div className="App">
        <h1>以太坊錢包查詢</h1>
        <WalletInfo />
      </div>
      <div className="App">
        <h1>以太坊區塊鏈查詢</h1>
        <BlockchainExplorer />
      </div>
    </>
  );
}

export default App;
