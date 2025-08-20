import axios from "axios";
import { useState, useEffect } from "react";
import { useFavorites } from "../../context/FavoritesContext.jsx";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaThumbsUp,
  FaCar,
  FaDog,
  FaSwimmingPool,
  FaWifi,
  FaTrash,
  FaEye,
  FaBed,
  FaUtensils,
} from "react-icons/fa";

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
      const token =
        localStorage.getItem("token") || localStorage.getItem("authToken");
      await axios.delete(
        // `http://localhost:5000/api/user/favoriteHotels/${hotelId}`,
        `${
          import.meta.env.VITE_BACKEND_API_URL
        }api/user/favoriteHotels/${hotelId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchFavorites(); // Aktualisiere die Favoritenliste
    } catch (error) {
      console.error("Error removing favorite hotel:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Merkzettel</h2>
        <div className="text-sm text-gray-500">
          {favorites.length} {favorites.length === 1 ? "Hotel" : "Hotels"}
        </div>
      </div>

      {!favorites ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading...</p>
        </div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-sm mx-auto">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Noch keine Merkzettel
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Sie haben noch keine Hotels zu Ihrem Merkzettel hinzugefügt.
              Entdecken Sie tolle Hotels und speichern Sie Ihre Favoriten!
            </p>
            <Link
              to={`/hotels/${hotel._id}`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Hotels entdecken
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {favorites.map((hotel) => (
            <div
              key={hotel.id || hotel._id}
              className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <Link
                to={`/hotels/${hotel._id}`}
                className="flex flex-col md:flex-row flex-1"
              >
                {/* Hotel Details */}
                <div className="w-full md:w-[280px] h-[160px] md:h-[140px] overflow-hidden rounded-lg ml-4 mt-4 relative">
                  <img
                    src={hotel.image || "/src/images/fallback.jpg"}
                    alt={hotel.name || hotel.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 ml-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-700">
                        {hotel.name || hotel.title}
                      </h3>

                      {/* Sterne */}
                      <div className="flex items-center">
                        {[...Array(hotel.stars || 4)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 text-xs" />
                        ))}
                      </div>

                      {/* Location */}
                    </div>
                    <p className="text-gray-600 mb-1 flex items-center text-sm">
                      <FaMapMarkerAlt className="text-red-500 mr-2 text-xs" />
                      {hotel.district && hotel.location
                        ? `${hotel.district}, ${hotel.location}`
                        : hotel.location}
                    </p>

                    {/* Bewertung */}
                    {hotel.rating && (
                      <p className="text-blue-400 font-semibold mb-2 flex items-center text-sm">
                        <FaThumbsUp className="text-blue-400 mr-2 text-xs" />
                        {hotel.rating} positive Bewertungen
                      </p>
                    )}

                    {/* Zeitraum */}
                    <p className="text-xs text-gray-500 mb-3">
                      7 Nächte vom 13.08 bis 19.08
                    </p>

                    {/* Annehmlichkeiten */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {hotel.amenities &&
                        hotel.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
                          >
                            {amenity}
                          </span>
                        ))}
                    </div>

                    <p className="text-xs text-gray-600 flex items-center">
                      <FaBed className="text-gray-500 mr-2 text-xs" />
                      {hotel.roomType || "Standard"} •
                      <FaUtensils className="text-gray-500 mx-2 text-xs" />
                      {hotel.breakfast || "Frühstück"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {hotel.parking && (
                        <div className="flex items-center text-blue-400 border bg-white border-amber-500 px-2 py-1 rounded-full">
                          <FaCar className="mr-1 text-xs" />
                          <span className="text-xs font-medium">Parkplatz</span>
                        </div>
                      )}
                      {hotel.petFriendly && (
                        <div className="flex items-center text-blue-400 border bg-white border-amber-500 px-2 py-1 rounded-full">
                          <FaDog className="mr-1 text-xs" />
                          <span className="text-xs font-medium">
                            Haustierfreundlich
                          </span>
                        </div>
                      )}
                      {hotel.pool && (
                        <div className="flex items-center text-blue-400 border bg-white border-amber-500 px-2 py-1 rounded-full">
                          <FaSwimmingPool className="mr-1 text-xs" />
                          <span className="text-xs font-medium">Pool</span>
                        </div>
                      )}
                      {hotel.wifi && (
                        <div className="flex items-center text-blue-400 border bg-white border-amber-500 px-2 py-1 rounded-full">
                          <FaWifi className="mr-1 text-xs" />
                          <span className="text-xs font-medium">WLAN</span>
                        </div>
                      )}
                    </div>

                    {/* Preis */}
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600 mb-1">
                        {hotel.price || "ab 170€"}
                      </div>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeFavorite(hotel.id || hotel._id);
                        }}
                        disabled={loading}
                        className="mt-2 px-4 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition-colors font-medium shadow-md hover:shadow-lg disabled:opacity-50 text-sm"
                      >
                        {loading ? "Entfernen..." : "Entfernen"}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FavoriteHotels;
