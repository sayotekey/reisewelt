import { useState, useEffect } from "react";
import { reviews } from "../data/reviews";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom"; //navigieren zu bewertung oder login

const CustomerReviews = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleReviews = reviews.slice(startIndex, startIndex + 3);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //new state for showing the review modal
  const [showReviewModal, setShowReviewModal] = useState(false);

  //new state for review text and rating
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handlePrev = () => {
    if (startIndex >= 3) {
      setStartIndex(startIndex - 3);
    }
  };

  const handleNext = () => {
    if (startIndex + 3 < reviews.length) {
      setStartIndex(startIndex + 3);
    }
  };

  /*   useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // wenn token vorhanden ist, dann ist der Nutzer eingeloggt
  }, []); */

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
  }, []);

  const handleWriteReviewClick = () => {
    if (isLoggedIn) {
      //open the review modal
      setShowReviewModal(true);
    } else {
      navigate("/login");
    }
  };

  // Функция отправки формы
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    // Здесь отправляем данные на сервер — пример с fetch
    const token = localStorage.getItem("token");

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // отправляем токен, если нужно
      },
      body: JSON.stringify({ text: reviewText, rating }),
    });

    if (response.ok) {
      alert("Отзыв успешно отправлен!");
      setShowReviewModal(false);
      setReviewText("");
      setRating(0);
      // Здесь можно обновить список отзывов или перезагрузить страницу
    } else {
      alert("Ошибка при отправке отзыва.");
    }
  };

  return (
    <section className="py-12 bg-gray-400">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-center w-full">
            {" "}
            Das sagen unsere Kunden
          </h2>
          <button
            onClick={handleWriteReviewClick}
            className="text-blue-600 font-medium hover:underline  whitespace-nowrap"
          >
            <span>Bewertung schreiben</span>
          </button>
        </div>

        <div className="relative overflow-hidden">
          {/* arrow left */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 -translate-y-1/2 -translate-x-1/2 z-10 text-white p-2 rounded-full shadow hover:bg-fuchsia-400 transition hidden md:block"
          >
            <ChevronLeft size={20} />
          </button>

          {/* cards */}
          <div className="flex gap-4 justify-center mx-10">
            {visibleReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white shadow-md rounded-2xl p-4 w-[340px] h-[250px] flex flex-col "
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3 ${review.color}`}
                    >
                      {review.initial}
                    </div>
                    <div>
                      <p className="text-yellow-900 font-semibold">
                        {review.name}
                      </p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill="currentColor"
                        stroke="none"
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 text-sm line-clamp-4 overflow-hidden mt-6">
                  {review.text}
                </p>
              </div>
            ))}
          </div>

          {/* arrow right */}
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 translate-x-1/2 z-10 text-white p-2 rounded-full shadow hover:bg-fuchsia-400 transition hidden md:block"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      {/* Модальное окно для отзыва */}
      {showReviewModal && (
        <div
          className="fixed inset-0 bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setShowReviewModal(false)} // закрываем при клике на фон
        >
          <div
            className="bg-emerald-700 rounded-lg p-6 w-[400px]"
            onClick={(e) => e.stopPropagation()} // чтобы клик по модалке не закрывал её
          >
            <h3 className="text-xl text-amber-400 font-semibold mb-4">
              Bewertung schreiben
            </h3>
            <form onSubmit={handleSubmitReview}>
              <textarea
                required
                rows={4}
                className="w-full border rounded p-2 mb-4"
                placeholder="Schreibe deine Bewertung hier..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>

              <label className="block mb-2">
                Bewertung:
                <select
                  required
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="ml-2 border  text-black bg-blue-200 rounded p-1"
                >
                  <option value={0}>Bitte wählen</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r} Stern{r > 1 ? "e" : ""}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300"
                  onClick={() => setShowReviewModal(false)}
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white"
                >
                  Senden
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default CustomerReviews;
