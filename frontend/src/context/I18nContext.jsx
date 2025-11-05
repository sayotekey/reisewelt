import React, { useState } from "react";
import { I18nContext } from "./i18nStore.jsx";
export const I18nProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("de"); //default ist deutsch

  //A simple function for changing the language
  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    isEnglish: currentLanguage === "en",
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

//1.Create a ‘storage’ for the current language of the website (German or English)
//We give any component the ability to:
//Find out what language is currently being used (currentLanguage)
//Switch languages (changeLanguage)
//Check whether English is currently being used (isEnglish)
