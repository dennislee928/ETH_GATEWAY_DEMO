import React from "react";
import { useTranslation } from "react-i18next";
import "./component-css/footer.css";

const Footer = () => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/dennislee928",
      icon: "🐱",
    },

    {
      name: "Discord",
      url: "https://discord.gg/sgJHRwHk",
      icon: "💬",
    },
    {
      name: "Portfolio",
      url: "https://next-js-portfolio-pi-ten.vercel.app/",
      icon: "🦖",
    },
  ];

  const resources = [
    {
      name: t("etherscan"),
      url: "https://sepolia.etherscan.io/",
    },
    {
      name: t("docs"),
      url: "https://docs.ethers.org/v6/",
    },
    {
      name: t("faucet"),
      url: "https://sepoliafaucet.com/",
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* 左側：資源連結 */}
        <div className="footer-section">
          <h4>{t("usefulResources")}</h4>
          <ul className="resource-links">
            {resources.map((resource, index) => (
              <li key={index}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 中間：網站資訊 */}
        <div className="footer-section">
          <div className="footer-logo">🔍 {t("explorerName")}</div>
          <p className="footer-description">{t("footerDescription")}</p>
          <div className="network-status">
            <span className="status-dot"></span>
            {t("networkStatus")}
          </div>
        </div>

        {/* 右側：社交連結 */}
        <div className="footer-section">
          <h4>{t("followUs")}</h4>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <span className="social-icon">{social.icon}</span>
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 底部版權資訊 */}
      <div className="footer-bottom">
        <p>{t("copyright", { year: currentYear })}</p>
        <div className="footer-links">
          <a href="/privacy">{t("privacy")}</a>
          <a href="/terms">{t("terms")}</a>
          <a href="/contact">{t("contact")}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
