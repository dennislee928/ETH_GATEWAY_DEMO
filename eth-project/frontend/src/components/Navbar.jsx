import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useTranslation } from "react-i18next";
import WalletConnect from "./WalletConnect";

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
            <Link to="/faucet" className="nav-link">
              {t("faucet")}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/ens" className="nav-link">
              {t("ens")}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/prices" className="nav-link">
              {t("prices")}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/game" className="nav-link">
              {t("game")}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/swap" className="nav-link">
              {t("swap")}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
