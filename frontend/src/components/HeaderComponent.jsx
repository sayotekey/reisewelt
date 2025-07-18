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
import { useTranslate } from "../locales/index.js";
import {
  FaEuroSign,
  FaSterlingSign,
  FaLiraSign,
  FaRubleSign,
} from "react-icons/fa6";

const languages = [
  { value: "de", img: germany, label: "German" },
  { value: "en", img: unitedStates, label: "English" },
  { value: "uk", img: ukraine, label: "Ukrainian" },
  { value: "fr", img: france, label: "French" },
  { value: "tr", img: turkey, label: "Turkish" },
];

const currencyIcons = [
  {
    value: "eu",
    icon: (color) => <FaEuroSign size={22} color={color} />,
  },
  {
    value: "st",
    icon: (color) => <FaSterlingSign size={22} color={color} />,
  },
  {
    value: "tl",
    icon: (color) => <FaLiraSign size={22} color={color} />,
  },
  {
    value: "ru",
    icon: (color) => <FaRubleSign size={22} color={color} />,
  },
];

const HeaderComponent = () => {
  const { t, changeLanguage } = useTranslate();
  const { isDark } = useTheme();
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openCurrency, setOpenCurrency] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencyIcons[0]);

  const languageDropdownRef = useRef(null);
  const currencyDropdownRef = useRef(null);

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

  return (
    <header
      className="header-full-width w-full fixed top-0 left-0 right-0 z-51 shadow-sm"
      style={{
        background: isDark
          ? "var(--bg-secondary)"
          : "linear-gradient( var(--blue-light) 10%, var(--blue-light-hover) 10%, var(--blue-light) 10%)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="flex items-center space-x-2 group transition-colors duration-200"
              style={{ textDecoration: "none" }}
              onMouseEnter={(e) => {
                e.target.querySelector("h3").style.background =
                  "linear-gradient(to right, #ea580c, #ef4444)";
                e.target.querySelector("h3").style.webkitBackgroundClip =
                  "text";
                e.target.querySelector("h3").style.webkitTextFillColor =
                  "transparent";
              }}
              onMouseLeave={(e) => {
                e.target.querySelector("h3").style.background = "";
                e.target.querySelector("h3").style.webkitBackgroundClip = "";
                e.target.querySelector("h3").style.webkitTextFillColor = "";
              }}
            >
              <img
                src="/logo.png"
                alt="Reisewelt Logo"
                className="h-8 w-8"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">
                Reisewelt
              </h3>
            </NavLink>
          </div>

          <nav className="hidden md:flex items-center space-x-10 ml-20">
            <NavLink
              to="/contact"
              className="circle-btn font-semibold text-lg transition-colors duration-200"
              style={{
                color: "var(--text-color)",
                backgroundColor: isDark ? "var(--bg-secondary)" : "white",
                border: isDark
                  ? "1px solid #444"
                  : "1px solid var(--border-color)",
              }}
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
              className="circle-btn font-semibold text-lg transition-colors duration-200"
              style={{
                color: "var(--text-color)",
                backgroundColor: isDark ? "var(--bg-secondary)" : "white",
                border: isDark
                  ? "1px solid #444"
                  : "1px solid var(--border-color)",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "var(--accent-color)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "var(--text-color)";
              }}
            >
              {t("header.wishlist") || "Merkzettel"}
            </NavLink>

            {/* language selection */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                className="circle-btn flex items-center transition-colors duration-200"
                style={{
                  backgroundColor: isDark ? "var(--bg-secondary)" : "white",
                  color: "var(--text-color)",
                  border: isDark
                    ? "1px solid #444"
                    : "1px solid var(--border-color)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = isDark
                    ? "var(--bg-color)"
                    : "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = isDark
                    ? "var(--bg-secondary)"
                    : "white";
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
                    border: isDark
                      ? "1px solid #444"
                      : "1px solid var(--border-color)",
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

            {/* currency selection */}
            <div className="relative" ref={currencyDropdownRef}>
              <button
                className="circle-btn flex items-center transition-colors duration-200"
                style={{
                  backgroundColor: isDark ? "var(--bg-secondary)" : "white",
                  color: "var(--text-color)",
                  border: isDark
                    ? "1px solid #444"
                    : "1px solid var(--border-color)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = isDark
                    ? "var(--bg-color)"
                    : "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = isDark
                    ? "var(--bg-secondary)"
                    : "white";
                }}
                onClick={() => {
                  setOpenCurrency((prev) => !prev);
                  setOpenLanguage(false);
                }}
                aria-label="Select currency"
              >
                <span className="w-7 h-7 flex items-center justify-center">
                  {selectedCurrency.icon(isDark ? "#fff" : "#222")}
                </span>
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
                    border: isDark
                      ? "1px solid #444"
                      : "1px solid var(--border-color)",
                  }}
                >
                  {currencyIcons.map((curr) => (
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
                      <span className="w-6 h-6 mr-3 flex items-center justify-center">
                        {curr.icon(isDark ? "#fff" : "#222")}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <ThemeToggle />
          </nav>

          {/* Sign in / Logout / Profile */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center px-4 py-2 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-sm"
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  myKonto
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-sm"
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

          {/* Mobile menu */}
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
