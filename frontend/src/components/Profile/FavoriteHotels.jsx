import axios from "axios";
import { useState, useEffect } from "react";
import { useFavorites } from "../../context/FavoritesContext.jsx";


const FavoriteHotels = ({ user, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const { favorites, fetchFavorites } = useFavorites();

  useEffect(() => {
  fetchFavorites();
}, []);

  // Eine Reise aus den Merkzettel entfernen
 const removeFavorite = async (hotelId) => {
  setLoading(true);
  try {
    await axios.delete(`/api/user/favoriteHotels/${hotelId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchFavorites(); // Aktualisiere die Favoritenliste
  } catch (error) {
    console.error("Error removing favorite hotel:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Merkzettel</h2>
      {!favorites ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-sm mx-auto">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Noch keine Merkzettel</h3>
            <p className="text-gray-500 text-sm">
              Sie haben noch keine Hotels zu Ihrem Merkzettel hinzugefügt. Entdecken Sie tolle Hotels und speichern Sie Ihre Favoriten!
            </p>
          </div>
        </div>
      ) : (
        <ul className="space-y-2">
          {favorites.map((hotel) => (
            <li key={hotel.id || hotel._id} className="flex justify-between items-center">
              <span>
                {hotel.name || hotel.title} - {hotel.location}
              </span>
              <button
                onClick={() => removeFavorite(hotel.id || hotel._id)}
                className="text-red-500 hover:text-red-700"
                disabled={loading}
              >
                Entfernen
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FavoriteHotels;
