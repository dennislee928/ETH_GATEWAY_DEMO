import "./App.css";
import { useTranslation } from "react-i18next";
import WalletInfo from "./components/walletInfo";
import BlockchainExplorer from "./components/BlockchainExplorer";
import i18n from "./i18n";
import AdvancedFeatures from "./components/AdvancedFeatures";
import AddsOn from "./components/adds-on";

function App() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "zh" ? "en" : "zh";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="container">
      <nav className="header">
        <div className="header-content">
          <div>
            <h1 className="main-title">{t("title")}</h1>
            <p className="subtitle">{t("subtitle")}</p>
          </div>
          <button onClick={toggleLanguage} className="language-toggle">
            {i18n.language === "zh" ? "English" : "中文"}
          </button>
        </div>
      </nav>

      <div className="content-wrapper">
        <section className="card wallet-section">
          <h2 className="section-title">{t("walletInfo")}</h2>
          <WalletInfo />
        </section>

        <section className="card explorer-section">
          <h2 className="section-title">{t("blockchainExplorer")}</h2>
          <BlockchainExplorer />
        </section>

        <section className="card advanced-section">
          <h2 className="section-title">{t("advancedFeatures")}</h2>
          <AdvancedFeatures />
        </section>
        <section className="card adds-on-section">
          <h2 className="section-title">{t("addsOn")}</h2>
          <AddsOn />
        </section>
      </div>
    </div>
  );
}

export default App;
