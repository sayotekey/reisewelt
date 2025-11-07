import { useEffect, useState } from "react";
import axios from "axios";
import { FavoritesContext } from "./FavoritesShared.jsx";

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Funktion zum Laden der Favoriten Hotels
  const fetchFavorites = async () => {
    try {
      const res = await axios.get("/api/favorites", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFavorites(res.data);
    } catch (err) {
      console.error("Error fetching favorites", err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Funktion zum Überprüfen, ob ein Hotel Favorit ist
  const isFavorite = (hotelId) =>
    favorites?.some((hotel) => hotel._id === hotelId || hotel.id === hotelId);

  // Funktion zum Hinzufügen/Entfernen eines Hotels von den Favoriten
  const toggleFavorite = async (hotel) => {
    let hotelId = hotel._id;
    hotelId = String(hotelId);

    // Validierung der hotelId
    if (!hotelId) {
      console.warn("Ungültige hotelId:", hotelId);
      return;
    }

    try {
      if (isFavorite(hotelId)) {
        // Hotel von Favoriten entfernen
        await axios.delete(`/api/favorites/${hotelId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setFavorites((prev) =>
          prev.filter((fav) => fav._id !== hotelId && fav.id !== hotelId)
        );
      } else {
        // Hotel zu Favoriten hinzufügen
        await axios.post(
          `/api/favorites`,
          { hotelId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFavorites((prev) => [...prev, hotel]);
      }
    } catch (err) {
      console.error("Error toggling favorite", err);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite, fetchFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
