import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import hotels from "../data/hotels";
import ReviewHotel from "../components/ReviewHotel";
import {
  FaMapMarkerAlt,
  FaThumbsUp,
  FaCar,
  FaDog,
  FaSwimmingPool,
  FaWifi,
  FaSnowflake,
  FaSpa,
  FaDumbbell,
  FaBuilding,
  FaStar,
  FaUtensils,
  FaBed,
  FaClock,
  FaHotel,
  FaHome,
  FaKey,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const HotelDetailPage = () => {
  const { id } = useParams();
  const hotelData = hotels.find((h) => h.id === parseInt(id));
  const [mainImage, setMainImage] = useState(hotelData?.image || "");
  const location = useLocation();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const { isDark } = useTheme();

  const searchParams = new URLSearchParams(location.search);
  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");
  const adultsParam = searchParams.get("adults");
  const childrenParam = searchParams.get("children");

  const nights =
    startDateParam && endDateParam
      ? Math.round(
          (new Date(endDateParam) - new Date(startDateParam)) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const from = startDateParam ? new Date(startDateParam) : null;
  const to = endDateParam ? new Date(endDateParam) : null;

  const formatDate = (date) =>
    date
      ? `${String(date.getDate()).padStart(2, "0")}.${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`
      : "";

  const dateRange =
    from && to
      ? `${nights} Nächte vom ${formatDate(from)} bis ${formatDate(to)}`
      : "";

  const peopleInfo = () => {
    if (adultsParam || childrenParam) {
      const adults = parseInt(adultsParam) || 0;
      const children = parseInt(childrenParam) || 0;

      if (adults > 0 && children > 0) {
        return `${adults} Erwachsene, ${children} Kinder`;
      } else if (adults > 0) {
        return `${adults} Erwachsene`;
      } else if (children > 0) {
        return `${children} Kinder`;
      }
    }
    return "";
  };

  const calculatePrice = () => {
    if (nights > 0 && hotelData.priceValue) {
      const totalPrice = hotelData.priceValue * nights;
      return `Gesamt: ${totalPrice}€ `;
    }
    return hotelData.price;
  };

  const getRatingLabel = (score) => {
    if (score >= 9) return "Hervorragend";
    if (score >= 8) return "Sehr gut";
    if (score >= 7) return "Gut";
    if (score >= 6) return "Befriedigend";
    return "Ausreichend";
  };

  const stars = (stars) => {
    const totalStars = 5;
    return (
      <div className="flex gap-1">
        {[...Array(totalStars)].map((_, index) =>
          index < stars ? (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-yellow-400"
            >
              <path
                fillRule="evenodd"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557L3.04 10.385a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={
                isDark ? "w-5 h-5 text-gray-500" : "w-5 h-5 text-gray-700"
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          )
        )}
      </div>
    );
  };

  if (!hotelData) {
    return (
      <div
        className={`text-center p-12 pt-36 ${
          isDark ? "bg-[#232323] text-gray-200" : ""
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Hotel nicht gefunden</h2>
        <p className="text-base">
          Das angeforderte Hotel konnte nicht gefunden werden.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`pt-20 px-4 max-w-7xl mx-auto mt-8 ${
        isDark ? "bg-[#242424] text-white" : ""
      }`}
    >
      <div className="flex gap-8 flex-wrap lg:flex-nowrap items-start">
        {/* Linke Seite */}
        <div className="flex-2 min-w-[400px]">
          {/* Hotelsname */}
          <div className="mb-6">
            <h2
              className={`text-3xl font-bold mb-2 ${
                isDark ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {hotelData.name}
            </h2>
            <p
              className={`text-base mb-2 flex items-center gap-2 ${
                isDark ? "text-gray-400" : "text-gray-700"
              }`}
            >
              <FaMapMarkerAlt className="w-5 h-5 text-red-500" />
              {hotelData.location}
            </p>
            <div className="text-yellow-500 text-base">
              {stars(hotelData.ratingScore)}
            </div>
          </div>

          {/* Bildergalerie */}
          <div className="grid grid-cols-4 gap-x-4 gap-y-2 pt-5 max-h-[550px] overflow-hidden">
            <div className="col-span-2 row-span-2 overflow-hidden rounded-lg shadow-lg h-full max-h-[550px] ">
              <img
                src={mainImage}
                alt={hotelData.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            {hotelData.gallery?.slice(0, 4).map((img, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg shadow-lg cursor-pointer h-[136px]"
                onClick={() => setMainImage(img)}
              >
                <img
                  src={img}
                  alt={`${hotelData.name} image ${index + 1}`}
                  className={`w-full h-full object-cover transition-all duration-300 hover:scale-105 ${
                    mainImage === img ? "ring-4 ring-blue-500" : ""
                  }`}
                />
              </div>
            ))}
            {hotelData.gallery?.slice(4, 8).map((img, index) => (
              <div
                key={index + 4}
                className="overflow-hidden rounded-lg shadow-lg cursor-pointer h-[136px]"
                onClick={() => setMainImage(img)}
              >
                <img
                  src={img}
                  alt={`${hotelData.name} image ${index + 5}`}
                  className={`w-full h-full object-cover transition-all duration-300 hover:scale-105 ${
                    mainImage === img ? "ring-4 ring-blue-500" : ""
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Ausstattung und Beschreibung */}
          <div className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  key: "parking",
                  label: "Parkplatz",
                  value: hotelData.parking,
                  icon: <FaCar className="text-blue-400" />,
                },
                {
                  key: "petFriendly",
                  label: "Haustierfreundlich",
                  value: hotelData.petFriendly,
                  icon: <FaDog className="text-blue-400" />,
                },
                {
                  key: "businessCenter",
                  label: "Business Center",
                  value: hotelData.businessCenter,
                  icon: <FaBuilding className="text-blue-400" />,
                },
                {
                  key: "pool",
                  label: "Pool",
                  value: hotelData.pool,
                  icon: <FaSwimmingPool className="text-blue-400" />,
                },
                {
                  key: "wifi",
                  label: "WLAN",
                  value: hotelData.wifi,
                  icon: <FaWifi className="text-blue-400" />,
                },
                {
                  key: "airConditioning",
                  label: "Klimaanlage",
                  value: hotelData.airConditioning,
                  icon: <FaSnowflake className="text-blue-400" />,
                },
                {
                  key: "spa",
                  label: "Spa",
                  value: hotelData.spa,
                  icon: <FaSpa className="text-blue-400" />,
                },
                {
                  key: "fitness",
                  label: "Fitnessstudio",
                  value: hotelData.fitness,
                  icon: <FaDumbbell className="text-blue-400" />,
                },
              ]
                .filter((f) => f.value)
                .map((filter) => (
                  <div
                    key={filter.key}
                    className={`flex items-center space-x-3 p-2 rounded-md border-1 border-orange-400 transition-colors
                      ${
                        isDark
                          ? "bg-[#232323] text-gray-200"
                          : "bg-white text-gray-700"
                      }`}
                  >
                    {filter.icon}
                    <span className="font-medium text-base">
                      {filter.label}
                    </span>
                  </div>
                ))}
            </div>
            <p
              className={`mt-6 leading-relaxed text-justify text-base ${
                isDark ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {hotelData.fullDescription}
            </p>
          </div>
        </div>

        {/* Rechte Seite */}
        <div className="flex-1 min-w-[300px] space-y-5 mt-32 pt-3">
          <a href="#bewertungen" className="block">
            <div
              className={`flex items-center justify-between p-4 rounded-lg shadow-lg border cursor-pointer transition-colors
              ${
                isDark
                  ? "bg-[#232323] border-gray-700 hover:bg-[#232323]/80"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex flex-col">
                <span
                  className={`text-base font-semibold ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {getRatingLabel(hotelData.ratingScore)}
                </span>
                <span
                  className={`text-base ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {hotelData.reviewsCount} Bewertungen
                </span>
              </div>
              <div className="text-white px-4 py-3 rounded-lg font-bold text-base shadow-lg bg-blue-400">
                {hotelData.ratingScore}
              </div>
            </div>
          </a>

          <div
            className={`h-64 rounded-lg flex items-center justify-center shadow-lg border
            ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-300 border-gray-300"
            }`}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d151676.79043810876!2d9.763016637588567!3d53.55866268463536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b161837e1813b9%3A0x4263df27bd63aa0!2sHamburg!5e0!3m2!1sen!2sde!4v1752608765193!5m2!1sen!2sde"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="flex gap-4 items-center">
            <button
              className={`bg-white border cursor-pointer text-4xl transition-transform duration-200 hover:scale-110 p-3 rounded-lg shadow-lg
                ${
                  isDark
                    ? "border-gray-700 text-gray-200 bg-[#232323]"
                    : "border-gray-300 text-gray-700"
                }`}
              style={{
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#ea580c";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = isDark ? "#374151" : "#d1d5db";
              }}
              title="Favoriten hinzufügen"
              onClick={() => setIsFavorite(!isFavorite)} // ← Toggle
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isFavorite ? "#ef4444" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={isFavorite ? "#ef4444" : "currentColor"}
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
            <button
              className="flex-1 border-none font-bold cursor-pointer px-4 py-3 rounded-md text-base"
              style={{
                backgroundColor: "var(--accent-color)",
                color: "white",
              }}
              onClick={() => {
                const params = new URLSearchParams();
                params.append("hotelId", hotelData.id);
                if (startDateParam) params.append("startDate", startDateParam);
                if (endDateParam) params.append("endDate", endDateParam);
                if (adultsParam) params.append("adults", adultsParam);
                if (childrenParam) params.append("children", childrenParam);
                navigate(`/booking?${params.toString()}`);
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "var(--accent-hover)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "var(--accent-color)";
              }}
            >
              Jetzt buchen
            </button>
          </div>

          <div
            className={`p-4 rounded-lg shadow-lg border mt-7
            ${
              isDark
                ? "bg-[#232323] border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <div className="text-center">
              {peopleInfo() && (
                <p
                  className={`text-base font-medium mb-2 ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {peopleInfo()}
                </p>
              )}
              {dateRange && (
                <p
                  className={`text-base font-medium mb-2 ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {dateRange}
                </p>
              )}
              {!dateRange && !peopleInfo() && (
                <p
                  className={`text-base mb-1 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {hotelData.nights}
                </p>
              )}
              <div className="text-2xl font-bold text-blue-400">
                {calculatePrice()}
              </div>
            </div>
          </div>

          <div
            className={`mt-5 p-4 rounded-lg shadow-lg border space-y-3
            ${
              isDark
                ? "bg-[#232323] border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            {[
              {
                label: `Check-in: ${hotelData.checkIn}`,
                icon: <FaClock className="text-blue-400 " />,
              },
              {
                label: `Check-out: ${hotelData.checkOut}`,
                icon: <FaKey className="text-blue-400 " />,
              },
              {
                label: `Zimmer: ${hotelData.roomType}`,
                icon: <FaBed className="text-blue-400 " />,
              },
              {
                label: `${hotelData.breakfast}`,
                icon: <FaUtensils className="text-blue-400 " />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 ${
                  isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {item.icon}
                <span className="text-base font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ReviewHotel reviews={hotelData.reviews} />
    </div>
  );
};

export default HotelDetailPage;
