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
        { rating, text: comment },
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
    <form
      onSubmit={handleSubmit}
      className="border p-4 space-y-4 review-form shadow-2xl"
    >
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
          className="border w-full px-2 py-1 review-form"
          rows="3"
        />
      </div>

      {/* Senden-Button */}
      <button
        type="submit"
        disabled={loading} // blockieren des Buttons während des Ladens
        className="px-4 py-2 rounded-md"
        style={{
          backgroundColor: "var(--accent-color)",
          color: "white",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "var(--accent-hover)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "var(--accent-color)";
        }}
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
