import { createContext, useContext } from "react";

// Create the context with a null default so we can detect missing provider
export const FavoritesContext = createContext(null);

// Safe hook that throws a clear error when used outside of the provider
export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (ctx === null) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return ctx;
};
