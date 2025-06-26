import { useState } from "react";
import { reviews } from "../data/reviews";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const CustomerReviews = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleReviews = reviews.slice(startIndex, startIndex + 3);

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + 3 < reviews.length) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <section className="py-12 bg-gray-400">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">⭐ Das sagen unsere Kunden</h2>
          <button className="text-blue-600 font-medium hover:underline">
            Bewertung schreiben
          </button>
        </div>

        <div className="relative">
          <div className="flex gap-4 overflow-hidden">
            {visibleReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white shadow-md rounded-2xl p-4 flex-1 min-w-[30%]"
              >
                <div className="flex items-center mb-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3 ${review.color}`}
                  >
                    {review.initial}
                  </div>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center text-yellow-400 mb-2">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm">{review.text}</p>
              </div>
            ))}
          </div>

          {/* Кнопки влево/вправо */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-200"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-200"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
