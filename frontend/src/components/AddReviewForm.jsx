import { useState } from "react";
import axios from "axios";

const StarRaiting = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((num) => (
        <span
          key={num}
          onClick={() => setRating(num)}
          className={`cursor-pointer text-2xl ${
            num <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const AddReviewForm = ({ tripId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await axios.post(
        `/api/reviews`,
        { tripId, rating, comment },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setSuccess(true);
      setComment("");
      setRating(5);
      onReviewAdded();
    } catch (err) {
      console.error("Fehler beim Abgeben der Bewertung:", err);
      setError("Fehler beim Absenden. Bitte versuche es erneut.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 space-y-4">
      {/* Bewertungsauswahl */}
      <div>
        <label className="block font-medium"> Bewertung: </label>
        <StarRaiting rating={rating} setRating={setRating} />
      </div>

      {/* Kommentar */}
      <div>
        <label className="block font-medium"> Kommentar: </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border w-full px-2 py-1"
          rows="3"
        />
      </div>

      {/* Senden-Button */}
      <button
        type="submit"
        disabled={loading} // blockieren des Buttons während des Ladens
        className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
      >
        {loading ? "Wird gesendet..." : "Bewertung absenden"}
      </button>

      {/* Nachricht bei Erfolg oder Fehler */}
      {success && (
        <p className="text-green-600">Bewertung erfolgreich hinzugefügt!</p>
      )}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default AddReviewForm;
