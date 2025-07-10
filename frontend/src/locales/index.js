import { en } from './en.js';
import { useTranslation } from '../context/I18nContext.jsx';

export const useTranslate = () => {
  const { currentLanguage, changeLanguage, isEnglish } = useTranslation();

  const t = (key) => {
    if (!isEnglish) {
      // If the language is German, return null (we'll use the original text)
      return null;
    }

    // If it's English, we look for a translation.
    const keys = key.split('.');
    let translation = en;
    
    for (const k of keys) {
      translation = translation[k];
      if (!translation) return key;  // If no translation is found, return the key
    }
    
    return translation;
  };

  return {
    t,
    currentLanguage,
    changeLanguage,
    isEnglish
  };
};

//This will be the main file for working with translations. It combines:
//Import English translations from en.js
//The logic for switching languages from I18nContext.jsx