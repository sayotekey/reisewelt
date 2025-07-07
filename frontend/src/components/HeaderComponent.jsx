import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import germany from "../images/germany.png";
import unitedStates from "../images/united-states.png";
import ukraine from "../images/ukraine.png";
import france from "../images/france.png";
import turkey from "../images/turkey.png";
import { useAuth } from "../context/AuthContext.jsx";
import { logoutButton } from "../utils/logout.js";
import ThemeToggle from "./ThemeToggle.jsx";

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
  // console.log(currencyDark, currencyDark.length);

  //
  return (
    <header className="header-full-width w-full sticky top-0 z-50 bg-purple-100 border-b border-gray-200 shadow-sm">
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-18">
          {/* Logo - слева */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              Reisewelt
            </NavLink>
          </div>

          {/* Навигация посередине, сдвинутая вправо */}
          <nav className="hidden md:flex items-center space-x-10 ml-20">
            <NavLink
              to="/contact"
              className="text-gray-700 hover:text-blue-600 font-semibold text-lg transition-colors duration-200"
            >
              Kontakt
            </NavLink>

            <NavLink
              to="/account/wishlist"
              className="text-gray-700 hover:text-blue-600 font-semibold text-lg transition-colors duration-200"
            >
              Merkliste
            </NavLink>

            {/* Выбор языка */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                className="flex items-center p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200"
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
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[140px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.value}
                      className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200 ${
                        selectedLanguage.value === lang.value
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                      onClick={() => {
                        setSelectedLanguage(lang);
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
                className="flex items-center p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200"
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
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[140px]">
                  {currencyDark.map((curr) => (
                    <button
                      key={curr.value}
                      className={`flex items-center w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200 ${
                        selectedCurrency.value === curr.value
                          ? "bg-blue-50"
                          : ""
                      }`}
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
                  className="flex items-center px-5 py-3 text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors duration-200"
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
                  className="flex items-center px-5 py-3 bg-black text-white rounded-lg hover:bg-blue-700 font-semibold text-lg transition-colors duration-200 shadow-sm"
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
                className="flex items-center px-7 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg transition-colors duration-200 shadow-sm"
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
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
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
