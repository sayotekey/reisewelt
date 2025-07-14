import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logoutTimer, setLogoutTimer] = useState(null);

  //überprüfen, ob ein Token im Local Storage vorhanden ist
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          // Token ist abgelaufen
          logout();
        } else {
          // Token ist gültig, setze den Benutzer
          setUser(JSON.parse(storedUser));

          // Setze einen Timer, um den Benutzer nach Ablauf des Tokens abzumelden
          const timeUntilExpiration = decoded.exp * 1000 - Date.now();
          const timer = setTimeout(() => {
            logout();
          }, timeUntilExpiration);
          setLogoutTimer(timer);
        }
      } catch (error) {
        logout(); // Token ist ungültig, abmelden
      }
    }
  }, []);

  const login = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setUser(user);

    try {
      const decoded = jwtDecode(token);
      const timeUntilExpiration = decoded.exp * 1000 - Date.now();

      const timer = setTimeout(() => {
        logout();
      }, timeUntilExpiration);

      setLogoutTimer(timer);
    } catch (error) {
      console.error("Invalid token during login:", error);
      logout(); // Token ist ungültig, abmelden
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);

    if (logoutTimer) {
      clearTimeout(logoutTimer); // Timer löschen, wenn der Benutzer abgemeldet wird
    }

    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
