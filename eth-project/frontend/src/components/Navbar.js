import React from "react";
import { Link } from "react-router-dom";
import "./component-css/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          ETH Gateway
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              首頁
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/faucet" className="nav-link">
              水龍頭
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
