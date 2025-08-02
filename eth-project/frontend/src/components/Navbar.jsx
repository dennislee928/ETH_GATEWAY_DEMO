import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          ETH Gateway
        </Link>

        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
            >
              {t("home")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/explorer"
              className={`nav-link ${isActive("/explorer") ? "active" : ""}`}
            >
              {t("blockchainExplorer")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/game"
              className={`nav-link ${isActive("/game") ? "active" : ""}`}
            >
              {t("game")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/adds-on"
              className={`nav-link ${isActive("/adds-on") ? "active" : ""}`}
            >
              {t("addsOn")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/faucet"
              className={`nav-link ${isActive("/faucet") ? "active" : ""}`}
            >
              {t("faucet")}
            </Link>
          </li>
        </ul>

        <div className="nav-right">
          <LanguageSelector />
          <div
            className={`menu-icon ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
