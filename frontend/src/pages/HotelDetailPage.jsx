import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
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

const HotelDetailPage = () => {
  const { id } = useParams(); // Erhalte die Hotel-ID aus der URL
  const hotelData = hotels.find((h) => h.id === parseInt(id)); // Finde das Hotel anhand der ID
  const [mainImage, setMainImage] = useState(hotelData?.image || "");

  // Label für die Bewertung basierend auf der Punktzahl
  const getRatingLabel = (score) => {
    if (score >= 9) return "Hervorragend";
    if (score >= 8) return "Sehr gut";
    if (score >= 7) return "Gut";
    if (score >= 6) return "Befriedigend";
    return "Ausreichend";
  };

  // Sterne
  const stars = (stars) => {
    const totalStars = 5;
    return (
      <div className="flex gap-1">
        {[...Array(totalStars)].map((_, index) =>
          index < stars ? (
            // Gefüllte Stern
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
            // Leerer Stern
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-700"
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

  // Fehlerbehandlung, falls das Hotel nicht gefunden wird
  if (!hotelData) {
    return (
      <div className="text-center p-12 pt-36">
        <h2 className="text-2xl font-bold mb-4">Hotel nicht gefunden</h2>
        <p className="text-base">
          Das angeforderte Hotel konnte nicht gefunden werden.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto mt-8">
      <div className="flex gap-8 flex-wrap lg:flex-nowrap items-start">
        {/* Linke Seite */}
        <div className="flex-2 min-w-[400px]">
          {/* Hotelsname */}
          <div className="mb-6">
            <h2 className="text-3xl text-gray-700 font-bold mb-2">
              {hotelData.name}
            </h2>
            <p className="text-base mb-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              {hotelData.location}
            </p>
            <div className="text-yellow-500 text-base">
              {stars(hotelData.ratingScore)}
            </div>
          </div>

          {/* Bildergalerie */}
          <div className="grid grid-cols-4 gap-x-4 gap-y-2 pt-5 max-h-[550px] overflow-hidden">
            {/* Hauptbild */}
            <div className="col-span-2 row-span-2 overflow-hidden rounded-lg shadow-lg h-full max-h-[550px] ">
              <img
                src={mainImage}
                alt={hotelData.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Erste 4 Bilder rechts vom Hauptbild */}
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
            {/* Zweite 4 Bilder unter dem Hauptbild */}
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
            {/* Ausstattung Grid */}
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
                    className="flex items-center space-x-3 p-2 rounded-md border-1 border-orange-400 transition-colors"
                  >
                    {filter.icon}
                    <span className="text-gray-700 font-medium text-base">
                      {filter.label}
                    </span>
                  </div>
                ))}
            </div>

            {/* Hotelsbeschreibung */}
            <p className="mt-6 leading-relaxed text-gray-700 text-justify text-base">
              {hotelData.fullDescription}
            </p>
          </div>
        </div>

        {/* Rechte Seite */}
        <div className="flex-1 min-w-[300px] space-y-5 mt-32 pt-3">
          {/* Rating */}
          <a href="#bewertungen" className="block">
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex flex-col">
                <span className="text-base font-semibold text-gray-700">
                  {getRatingLabel(hotelData.ratingScore)}
                </span>
                <span className="text-base text-gray-700">
                  {hotelData.reviewsCount} Bewertungen
                </span>
              </div>

              <div
                className="text-white px-4 py-3 rounded-lg font-bold text-base shadow-lg"
                style={{ backgroundColor: "var(--blue-light)" }}
              >
                {hotelData.ratingScore}
              </div>
            </div>
          </a>

          {/* Karte */}
          <div className="h-64 bg-gray-300 rounded-lg flex items-center justify-center shadow-lg border border-gray-300">
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
            {/* Merkzettel */}
            <button
              className="bg-white border border-gray-300 cursor-pointer text-4xl text-gray-700 transition-transform duration-200 hover:scale-110 p-3 rounded-lg shadow-lg"
              style={{
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#ea580c";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "#d1d5db";
              }}
              title="Favoriten hinzufügen"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>

            {/* Reservierung Button */}
            <button
              className="flex-1 border-none font-bold cursor-pointer px-4 py-3 rounded-md text-base"
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
              Jetzt buchen
            </button>
          </div>

          {/* Preis */}
          <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-300 mt-7">
            <div className="text-center">
              <p className="text-base text-gray-600 mb-1">{hotelData.nights}</p>
              <div className="text-2xl font-bold text-blue-600">
                {hotelData.price}
              </div>
            </div>
          </div>

          {/* Zusätzliche Informationen */}
          <div className="mt-5 bg-white p-4 rounded-lg shadow-lg border border-gray-300 space-y-3">
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
              <div key={index} className="flex items-center gap-3">
                {item.icon}
                <span className="text-base font-medium text-gray-700">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bewertungen Sektion */}

      <ReviewHotel reviews={hotelData.reviews} />
    </div>
  );
};

export default HotelDetailPage;
