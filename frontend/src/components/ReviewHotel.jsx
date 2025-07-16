import { useRef } from "react";

const ReviewHotel = ({ reviews }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth / 4 + 24;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 10; i += 2) {
      stars.push(
        <span key={i} className="text-yellow-400 text-md">
          {rating >= i ? "★" : "☆"}
        </span>
      );
    }

    return <div className="flex gap-1">{stars}</div>;
  };

  if (!reviews || reviews.length === 0) {
    return <p>Keine Bewertungen vorhanden.</p>;
  }

  return (
    <section
      id="bewertungen"
      className="my-10 relative w-full max-w-[1200px] mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4">Bewertungen</h2>
      <div className="relative flex items-center justify-center">
        {/* Links Pfeil */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white text-2xl rounded-full w-10 h-10 flex items-center justify-center shadow-md border border-gray-300"
        >
          ‹
        </button>

        {/* Bewertungskarten */}
        <div className="w-full max-w-[calc(100%-120px)] mx-auto overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth transition-all duration-300 ease-in-out"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="w-[calc(25%-18px)] flex-shrink-0 border border-gray-200 rounded-lg p-4 shadow-sm bg-white flex flex-col justify-between h-48"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-m text-gray-700 font-semibold">
                      {review.name}
                    </h3>
                    <span className="text-sm text-gray-700">{review.date}</span>
                  </div>
                  <p className="text-base text-gray-700 font-semibold mb-2">
                    {review.title}
                  </p>
                  <p className="text-gray-700 text-m">{review.text}</p>
                </div>
                <div className="mt-4">{renderStars(review.rating)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rechts Pfeil */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white text-2xl rounded-full w-10 h-10 flex items-center justify-center shadow-md border border-gray-300"
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default ReviewHotel;
