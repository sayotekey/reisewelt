import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import germany from "../images/germany.png";
import unitedStates from "../images/united-states.png";
import ukraine from "../images/ukraine.png";
import france from "../images/france.png";
import turkey from "../images/turkey.png";
import { useAuth } from "../context/useAuth.js";
import { logoutButton } from "../utils/logout.js";
import ThemeToggle from "./ThemeToggle.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useTranslate } from "../locales/index.js"; //translation context

import euroSignDark from "../icons/euro-sign-solid-black.svg";
// import euroSign from "../icons/euro-sign-solid-white.svg";
import sterlingSignDark from "../icons/sterling-sign-solid-black.svg";
// import sterlingSign from "../icons/sterling-sign-solid-white.svg";
import liraSignDark from "../icons/turkish-lira-sign-solid-black.svg";
// import liraSign from "../icons/turkish-lira-sign-solid-white.svg";
import rubleSignDark from "../icons/ruble-sign-solid-black.svg";
// import rubleSign from "../icons/ruble-sign-solid-white.svg";

const languages = [
  // label fuer accessibility
  { value: "de", img: germany, label: "German" },
  { value: "en", img: unitedStates, label: "English" },
  { value: "uk", img: ukraine, label: "Ukrainian" },
  { value: "fr", img: france, label: "French" },
  { value: "tr", img: turkey, label: "Turkish" },
];

const currencyDark = [
  {
    value: "eu-dark",
    img: euroSignDark,
  },
  {
    value: "st-dark",
    img: sterlingSignDark,
  },
  {
    value: "tl-dark",
    img: liraSignDark,
  },
  {
    value: "ru-dark",
    img: rubleSignDark,
  },
];

const HeaderComponent = () => {
  const { t, changeLanguage } = useTranslate(); // translation context
  const { isDark } = useTheme();
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openCurrency, setOpenCurrency] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencyDark[0]);

  const languageDropdownRef = useRef(null);
  const currencyDropdownRef = useRef(null);
  // console.log(currencyDark);

  // Holt den aktuellen Benutzer und die Logout-Funktion aus dem Auth-Kontext
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutButton(logout, navigate);
  };

  useEffect(() => {
    function handleClickOutsideFlag(event) {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target)
      ) {
        setOpenLanguage(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideFlag);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideFlag);
  }, []);

  useEffect(() => {
    function handleClickOutsideCurrency(event) {
      if (
        currencyDropdownRef.current &&
        !currencyDropdownRef.current.contains(event.target)
      ) {
        setOpenCurrency(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideCurrency);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideCurrency);
  }, []);
  // console.loog(currencyDark, currencyDark.length);

  //
  return (
    <header
      className="header-full-width w-full fixed top-0 left-0 right-0 z-51 shadow-sm"
      style={{
        background: isDark
          ? "var(--bg-secondary)"
: "linear-gradient( #a8d5e2f0 10%, #a2cedaf0 10%, #a8d5e2f0 10%)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-18">
          {/* Logo - слева */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-3xl font-bold transition-colors duration-200"
              style={{
                color: "var(--accent-color)",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "var(--accent-hover)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "var(--accent-color)";
              }}
            >
              Reisewelt
            </NavLink>
          </div>

          <nav className="hidden md:flex items-center space-x-10 ml-20">
            <NavLink
              to="/contact"
              className="font-semibold text-lg transition-colors duration-200"
              style={{ color: "var(--text-color)" }}
              onMouseEnter={(e) => {
                e.target.style.color = "var(--accent-color)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "var(--text-color)";
              }}
            >
              {t("header.contact") || "Kontakt"}
            </NavLink>

            <NavLink
              to="/account/wishlist"
              className="font-semibold text-lg transition-colors duration-200"
              style={{ color: "var(--text-color)" }}
              onMouseEnter={(e) => {
                e.target.style.color = "var(--accent-color)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "var(--text-color)";
              }}
            >
              {t("header.wishlist") || "Merkliste"}
            </NavLink>

            {/* language selection */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                className="flex items-center p-3 rounded-lg transition-colors duration-200"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--text-color)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "var(--bg-color)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
                onClick={() => {
                  setOpenLanguage((prev) => !prev);
                  setOpenCurrency(false);
                }}
                aria-label="Select language"
              >
                <img
                  src={selectedLanguage.img}
                  alt={selectedLanguage.label}
                  className="w-7 h-7 rounded-sm"
                />
                <svg
                  className="w-5 h-5 ml-2 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openLanguage && (
                <div
                  className="absolute top-full left-0 mt-1 rounded-lg shadow-lg z-20 min-w-[140px]"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.value}
                      className={`flex items-center w-full px-4 py-3 text-left first:rounded-t-lg last:rounded-b-lg transition-colors duration-200`}
                      style={{
                        backgroundColor:
                          selectedLanguage.value === lang.value
                            ? "var(--accent-color)"
                            : "transparent",
                        color:
                          selectedLanguage.value === lang.value
                            ? "white"
                            : "var(--text-color)",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedLanguage.value !== lang.value) {
                          e.target.style.backgroundColor = "var(--bg-color)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedLanguage.value !== lang.value) {
                          e.target.style.backgroundColor = "transparent";
                        } else {
                          e.target.style.backgroundColor =
                            "var(--accent-color)";
                        }
                      }}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        changeLanguage(lang.value);
                        setOpenCurrency(false);
                        setOpenLanguage(false);
                      }}
                    >
                      <img
                        src={lang.img}
                        alt={`${lang.label} flag`}
                        className="w-6 h-6 mr-3 rounded-sm"
                      />
                      <span className="text-base font-medium">
                        {lang.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Выбор валюты */}
            <div className="relative" ref={currencyDropdownRef}>
              <button
                className="flex items-center p-3 rounded-lg transition-colors duration-200"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--text-color)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "var(--bg-color)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
                onClick={() => {
                  setOpenCurrency((prev) => !prev);
                  setOpenLanguage(false);
                }}
                aria-label="Select currency"
              >
                <img
                  src={selectedCurrency.img}
                  alt={selectedCurrency.value}
                  className="w-7 h-7"
                />
                <svg
                  className="w-5 h-5 ml-2 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openCurrency && (
                <div
                  className="absolute top-full left-0 mt-1 rounded-lg shadow-lg z-20 min-w-[140px]"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  {currencyDark.map((curr) => (
                    <button
                      key={curr.value}
                      className={`flex items-center w-full px-4 py-3 text-left first:rounded-t-lg last:rounded-b-lg transition-colors duration-200`}
                      style={{
                        backgroundColor:
                          selectedCurrency.value === curr.value
                            ? "var(--accent-color)"
                            : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedCurrency.value !== curr.value) {
                          e.target.style.backgroundColor = "var(--bg-color)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedCurrency.value !== curr.value) {
                          e.target.style.backgroundColor = "transparent";
                        } else {
                          e.target.style.backgroundColor =
                            "var(--accent-color)";
                        }
                      }}
                      onClick={() => {
                        setSelectedCurrency(curr);
                        setOpenLanguage(false);
                        setOpenCurrency(false);
                      }}
                    >
                      <img
                        src={curr.img}
                        alt={`${curr.value} currency`}
                        className="w-6 h-6 mr-3"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <ThemeToggle />
          </nav>

          {/* Sign in / Logout / Profile - справа */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <NavLink
                  to="/profile"
                  className="flex items-center px-5 py-3 font-semibold text-lg transition-colors duration-200"
                  style={{ color: "var(--accent-color)" }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "var(--accent-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "var(--accent-color)";
                  }}
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {user.name || "Profile"}
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="flex items-center px-5 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-sm"
                  style={{
                    backgroundColor: "var(--accent-color)",
                    color: "white",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "var(--accent-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "var(--accent-color)";
                  }}
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="flex items-center px-7 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-sm"
                style={{
                  backgroundColor: "var(--accent-color)",
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "var(--accent-hover)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "var(--accent-color)";
                }}
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Sign In
              </NavLink>
            )}
          </div>

          {/* Мобильное меню (для маленьких экранов) */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-lg transition-colors"
              style={{ color: "var(--text-color)" }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "var(--bg-color)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default HeaderComponent;
