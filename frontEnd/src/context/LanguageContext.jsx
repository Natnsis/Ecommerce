import React, { createContext, useState } from "react";
import en from "../transaltions/en.json";
import am from "../transaltions/am.json";

export const LanguageContext = createContext();

const translations = {
  en,
  am,
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};