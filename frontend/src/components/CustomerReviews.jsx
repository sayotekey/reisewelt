import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CustomerReviews() {
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
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
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
    setSuccessMessage("Vielen Dank! Ihr Feedback wurde erfolgreich gespeichert.");
setTimeout(() => setSuccessMessage(""), 3000); 
  } catch (err) {
    console.error(err);
    alert("Netzwerkfehler. Bitte versuchen Sie es später erneut.");
  }
};

  return (
    <div className=" py-10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6 relative">
          <h2 className="text-2xl font-semibold text-white text-center w-full">
            Das sagen unsere Kunden
          </h2>
          <button
            onClick={handleReviewClick}
            className="absolute right-6 p-2 bg-amber-100 text-blue-700 hover:underline font-semibold rounded-md"
          > {successMessage}
            Bewertung schreiben
          </button>
        </div>

        {/* form*/}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white  text-black p-4 rounded shadow mb-6"
          >
            <label className="block mb-2">
              <span className="text-gray-700 font-medium">Ihr Feedback:</span>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                className="w-full border rounded p-2 mt-1"
                rows="4"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700 font-medium">Bewertung:</span>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border rounded p-2 mt-1 ml-2"
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
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Absenden
            </button>
          </form>
        )}

        {/* Стрелки */}
        <button
          onClick={scrollLeft}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2 shadow hover:bg-gray-400 z-10"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2 shadow hover:bg-gray-400 z-10"
        >
          <ArrowRight size={20} />
        </button>

        {/* Слайдер отзывов */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scroll-smooth pb-4 hide-scrollbar"
        >
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-xl shadow-md p-5 min-w-[300px] max-w-[320px] flex-shrink-0"
            >
              <div className="flex items-center mb-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-blue-500 font-bold mr-3"
                  style={{ backgroundColor: getRandomColor(review.text) }}
                >
                  {review.name ? review.name[0].toUpperCase() : "U"}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {review.name || "Unbekannt"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-yellow-400 mb-2">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <p className="text-sm text-gray-800">
                {review.text.length > 180
                  ? review.text.slice(0, 180) + "..."
                  : review.text}
              </p>
            </div>
          ))}
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
