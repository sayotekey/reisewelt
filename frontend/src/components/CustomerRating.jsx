import { useState } from "react";
import { reviews } from "../data/reviews";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const CustomerReviews = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleReviews = reviews.slice(startIndex, startIndex + 3);

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

  return (
    <section className="py-12 bg-gray-400">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-center w-full">
            {" "}
            Das sagen unsere Kunden
          </h2>
          <button className="text-blue-600 font-medium hover:underline  whitespace-nowrap">
            Bewertung schreiben
          </button>
        </div>

        <div className="relative overflow-hidden">
          {/* Стрелка ВЛЕВО */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 -translate-y-1/2 -translate-x-1/2 z-10 text-white p-2 rounded-full shadow hover:bg-fuchsia-400 transition hidden md:block"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Карточки */}
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

          {/* Стрелка ВПРАВО */}
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 translate-x-1/2 z-10 text-white p-2 rounded-full shadow hover:bg-fuchsia-400 transition hidden md:block"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
