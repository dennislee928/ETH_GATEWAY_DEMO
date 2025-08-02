import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "../styles/LanguageSelector.css";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "zh", name: "繁體中文", flag: "🇹🇼" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);

    // Save language preference to localStorage
    localStorage.setItem("preferredLanguage", languageCode);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button
        className="language-selector-button"
        onClick={toggleDropdown}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="language-flag">{currentLanguage.flag}</span>
        <span className="language-name">{currentLanguage.name}</span>
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}></span>
      </button>

      <div className={`language-dropdown ${isOpen ? "show" : ""}`}>
        {languages.map((language) => (
          <button
            key={language.code}
            className={`language-option ${
              language.code === currentLanguage.code ? "active" : ""
            }`}
            onClick={() => handleLanguageChange(language.code)}
            aria-label={`Switch to ${language.name}`}
          >
            <span className="language-flag">{language.flag}</span>
            <span className="language-name">{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
