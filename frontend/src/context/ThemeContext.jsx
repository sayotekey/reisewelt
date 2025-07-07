import React, { createContext, useContext, useState, useEffect } from "react";

// Create context for the topic
const ThemeContext = createContext();

//  Hook for using the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme should be used inside ThemeProvider");
  }
  return context;
};

// Theme provider
export const ThemeProvider = ({ children }) => {
  // Get the saved theme from localStorage or use “light” by default
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  // Function to toggle the theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Apply the theme to document.documentElement and save to localStorage
  useEffect(() => {
    // Apply the data-theme attribute to the html element
    document.documentElement.setAttribute("data-theme", theme);

    // Save the user's choice
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = {
    theme,
    toggleTheme,
    isLight: theme === "light",
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
