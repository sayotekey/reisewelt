import axios from 'axios';
import { useState} from 'react';

const FavoriteTrips = ({user, onUpdate}) => {
  const [loading, setLoading] = useState(false);

   // Eine Reise aus den Merkzettel entfernen
  const removeFavorite = async (tripId) => {
    try {
      await axios.delete(`/api/user/favoriteTrips/${tripId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      onUpdate(); // Callback zum Aktualisieren der Favoritenliste
    } catch (error) {
      console.error("Error removing favorite trip:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">Merkzettel</h2>
      {!user?.favoriteTrips ? (
        <p>Loading...</p>
      ) : user.favoriteTrips.length === 0 ? (
        <p>Keine Reisen auf dem Merkzettel.</p>
      ) : (
        <ul className="space-y-2">
          {user.favoriteTrips.map((trip) => (
            <li key={trip._id} className="flex justify-between items-center">
              <span>
                {trip.title} - {trip.location}
              </span>
              <button
                onClick={() => removeFavorite(trip._id)}
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

export default FavoriteTrips;
