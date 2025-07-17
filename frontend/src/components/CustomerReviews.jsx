import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function CustomerReviews() {
  const { isDark } = useTheme();
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch(console.error);
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -1320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 1320, behavior: "smooth" });
  };

  const handleReviewClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setShowForm(!showForm);
    } else {
      navigate("/login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, rating }),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        alert("Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.");
        navigate("/login");
        return;
      } else if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message || "Fehler beim Absenden der Bewertung");
        return;
      }

      const newReview = await res.json();
      setReviews((prev) => [newReview, ...prev]);
      setText("");
      setRating(5);
      setShowForm(false);
      setSuccessMessage(
        "Vielen Dank! Ihr Feedback wurde erfolgreich gespeichert."
      );
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      alert("Netzwerkfehler. Bitte versuchen Sie es später erneut.");
    }
  };

  return (
    <div
      id="customer-reviews"
      className="py-15 mt-16"
      style={{ backgroundColor: isDark ? "#242424" : "#ffffff" }}
    >
      <div className="max-w-[1360px] mx-auto px-4 relative">
        <div className="flex justify-between items-center mb-6 relative">
          <h2
            className="text-2xl font-medium text-left w-full mb-10 transition-all duration-500 hover:scale-105"
            style={{
              color: "var(--text-light)",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            Das sagen unsere Kunden
          </h2>
          <button
            onClick={handleReviewClick}
            className="absolute right-6 px-6 py-3 rounded-lg font-bold text-sm hover:scale-105 transition-all duration-300 shadow-lg"
            style={{
              background: "linear-gradient(135deg, #ff7626, #ff5722)",
              color: "#ffffff",
              boxShadow: "grey",
            }}
            onMouseEnter={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, #ff8747, #ff6843)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, #ff7626, #ff5722)";
            }}
          >
            {successMessage}
            Bewertung schreiben
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="p-4 rounded shadow mb-6"
            style={{
              backgroundColor: isDark ? "#242424" : "#ffffff",
              color: isDark ? "rgba(255, 255, 255, 0.87)" : "#000000",
            }}
          >
            <label className="block mb-2">
              <span
                className="font-medium"
                style={{
                  color: isDark ? "rgba(255, 255, 255, 0.87)" : "#374151",
                }}
              >
                Ihr Feedback:
              </span>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                className="w-full border rounded p-2 mt-1"
                style={{
                  backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
                  color: isDark ? "rgba(255, 255, 255, 0.87)" : "#000000",
                  borderColor: isDark ? "#444" : "#d1d5db",
                }}
                rows="4"
              />
            </label>
            <label className="block mb-4">
              <span
                className="font-medium"
                style={{
                  color: isDark ? "rgba(255, 255, 255, 0.87)" : "#374151",
                }}
              >
                Bewertung:
              </span>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border rounded p-2 mt-1 ml-2"
                style={{
                  backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
                  color: isDark ? "rgba(255, 255, 255, 0.87)" : "#000000",
                  borderColor: isDark ? "#444" : "#d1d5db",
                }}
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Sterne
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="px-4 py-2 rounded font-semibold hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: isDark ? "#ff7626" : "#2563eb",
                color: "#ffffff",
              }}
            >
              Absenden
            </button>
          </form>
        )}

        {/* container */}
        <div className="relative">
          {/* arrow left */}
          <button
            onClick={scrollLeft}
            className="absolute -left-11 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow z-20 transition-colors hover:opacity-80"
            style={{
              backgroundColor: isDark ? "#333" : "#d1d5db",
              color: isDark ? "rgba(255, 255, 255, 0.87)" : "#000000",
            }}
          >
            <ArrowLeft size={20} />
          </button>

          {/* slider */}
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto scroll-smooth pb-4 hide-scrollbar"
          >
            {reviews.map((review) => (
              <div
                key={review._id}
                className="rounded-xl shadow-md p-5 w-[300px] flex-shrink-0"
                style={{
                  backgroundColor: isDark ? "#242424" : "#ffffff",
                  color: isDark ? "rgba(255, 255, 255, 0.87)" : "#000000",
                  border: isDark ? "1px solid #444" : "1px solid #e5e7eb",
                }}
              >
                <div className="flex items-center mb-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold mr-3"
                    style={{
                      backgroundColor: getRandomColor(review.text),
                      color: "#ffffff",
                    }}
                  >
                    {review.name ? review.name[0].toUpperCase() : "U"}
                  </div>
                  <div>
                    <p
                      className="font-semibold"
                      style={{
                        color: isDark ? "rgba(255, 255, 255, 0.87)" : "#111827",
                      }}
                    >
                      {review.name || "Unbekannt"}
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        color: isDark ? "rgba(255, 255, 255, 0.6)" : "#6b7280",
                      }}
                    >
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-yellow-400 mb-2">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
                <p
                  className="text-sm"
                  style={{
                    color: isDark ? "rgba(255, 255, 255, 0.6)" : "#374151",
                  }}
                >
                  {review.text.length > 180
                    ? review.text.slice(0, 180) + "..."
                    : review.text}
                </p>
              </div>
            ))}
          </div>

          {/* arrow right */}
          <button
            onClick={scrollRight}
            className="absolute -right-11 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow z-20 transition-colors hover:opacity-80"
            style={{
              backgroundColor: isDark ? "#333" : "#d1d5db",
              color: isDark ? "rgba(255, 255, 255, 0.87)" : "#000000",
            }}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

function getRandomColor(str) {
  const colors = ["#06b6d4", "#2563eb", "#9333ea", "#f59e0b", "#10b981"];
  let index = str.charCodeAt(0) % colors.length;
  return colors[index];
}
