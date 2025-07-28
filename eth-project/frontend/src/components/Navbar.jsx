import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          ETH Gateway
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              {t("home")}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/explorer" className="nav-link">
              {t("blockchainExplorer")}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/game" className="nav-link">
              {t("game")}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/adds-on" className="nav-link">
              {t("addsOn")}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/faucet" className="nav-link">
              {t("faucet")}
            </Link>
          </li>
        </ul>
        <div className="nav-right">
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
