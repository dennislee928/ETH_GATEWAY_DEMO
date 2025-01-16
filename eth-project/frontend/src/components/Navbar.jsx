import React from "react";
import { Link } from "react-router-dom";
import "./component-css/navbar.css";
import { useTranslation } from "react-i18next";

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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
