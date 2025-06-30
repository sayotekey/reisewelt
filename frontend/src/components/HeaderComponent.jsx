import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import germany from "../images/germany.png";
import unitedStates from "../images/united-states.png";
import ukraine from "../images/ukraine.png";
import france from "../images/france.png";
import turkey from "../images/turkey.png";
import { useAuth } from "../context/AuthContext.jsx";

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
    <header className="w-full sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between w-full">
        <nav className="flex items-center gap-5">
          <NavLink to="/">Logo</NavLink>
          <NavLink to="/contact"> Kontakt </NavLink>
          {/* hier später Pfad anpassen auf Login-Pfad des Benutzers!! */}
          <NavLink to="/account/wishlist">Merkliste</NavLink>
          <div className="relative w-auto" ref={languageDropdownRef}>
            <div
              className="flex items-center h-8 px-3 py-2 cursor-pointer rounded"
              onClick={() => {
                setOpenLanguage((prev) => !prev);
                setOpenCurrency(false); //
              }}
              tabIndex={0}
              role="button"
            >
              <img
                src={selectedLanguage.img}
                alt={selectedLanguage.label}
                className="w-6 h-6"
              />
            </div>
            {openLanguage && (
              <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 h-50 w-auto ">
                {languages.map((lang) => (
                  <div
                    key={lang.value}
                    className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-300 ${
                      selectedLanguage.value === lang.value ? "bg-gray-100" : ""
                    }`}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setOpenCurrency(false);
                      setOpenLanguage(false);
                      // Optional: Sprache wechseln
                    }}
                  >
                    <img
                      src={lang.img}
                      alt={`${lang.label} flag`}
                      className="w-6 h-6"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative w-auto" ref={currencyDropdownRef}>
            <div
              className="flex items-center border h-9 px-3 py-2 cursor-pointer rounded"
              onClick={() => {
                setOpenCurrency((prev) => !prev);
                setOpenLanguage(false);
              }}
              tabIndex={0}
              role="button"
            >
              <img
                src={selectedCurrency.img}
                alt={selectedCurrency.value}
                className="w-6 h-6"
              />
            </div>
            {openCurrency && (
              <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-xl z-10 h-40 w-auto ">
                {currencyDark.map((curr) => (
                  <div
                    key={curr.value}
                    className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-300 ${
                      selectedCurrency.value === curr.value ? "bg-gray-100" : ""
                    }`}
                    onClick={() => {
                      setSelectedCurrency(curr);
                      setOpenLanguage(false);
                      setOpenCurrency(false);
                      //Optional: Währung wechseln
                    }}
                  >
                    <img
                      src={curr.img}
                      alt={`${curr.value} currency`}
                      className="w-6 h-6"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* hier später Umschalter für Light/Dark-Mode einfügen
           */}
          <div className="text-black">Dark/Light</div>
          {/* // */}
          {/* <NavLink to="/login">Login/Olena</NavLink> */}
          {user ? (
            <>
              <NavLink to="/profile"> {user.name || "Profile"} </NavLink>
              {/* <button onClick={logout} className="ml-2 text-blue-600">
                Logout
              </button> */}
            </>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
          {/* /login=http://localhost:5173/login */}
        </nav>
      </div>
    </header>
  );
};
export default HeaderComponent;
