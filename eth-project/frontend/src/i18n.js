import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      title: "Holesky Explorer",
      subtitle: "Explore the Ethereum Test Network",
      walletInfo: "Wallet Information",
      blockchainExplorer: "Blockchain Explorer",
    },
  },
  zh: {
    translation: {
      title: "Holesky 瀏覽器",
      subtitle: "探索以太坊測試網路的世界",
      walletInfo: "錢包資訊",
      blockchainExplorer: "區塊鏈瀏覽器",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // 預設語言
  fallbackLng: "zh",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
