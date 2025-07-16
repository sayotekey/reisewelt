import axios from "axios";
import { useState } from "react";

const FavoriteHotels = ({ user, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  // Eine Reise aus den Merkzettel entfernen
  const removeFavorite = async (hotelId) => {
    try {
      await axios.delete(`/api/user/favoriteHotels/${hotelId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      onUpdate(); // Callback zum Aktualisieren der Favoritenliste
    } catch (error) {
      console.error("Error removing favorite hotel:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Merkzettel</h2>
      {!user?.favoriteHotels ? (
        <p>Loading...</p>
      ) : user.favoriteHotels.length === 0 ? (
        <p>Keine Reisen auf dem Merkzettel.</p>
      ) : (
        <ul className="space-y-2">
          {user.favoriteHotels.map((hotel) => (
            <li key={hotel._id} className="flex justify-between items-center">
              <span>
                {hotel.title} - {hotel.location}
              </span>
              <button
                onClick={() => removeFavorite(hotel._id)}
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
