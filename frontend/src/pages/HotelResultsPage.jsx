import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

// import wishlistHeartFull from "../icons/heart-solid-black.svg";
import wishlistHeartEmpty from "../icons/heart-regular-black.svg";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaThumbsUp,
  FaBed,
  FaUtensils,
  FaCar,
  FaDog,
  FaSwimmingPool,
  FaWifi,
} from "react-icons/fa";
import gptExample from "../images/chat-gpt-example.png";

import MiniSearchbar from "../components/MiniSearchbar";
import hotelRooms from "../data/hotelRooms";
import validCities from "../utils/validCities";
import { FaSpinner } from "react-icons/fa";

// handleEdit

const HotelResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const myCity = query.get("city");
  const startDate = query.get("start");
  const endDate = query.get("end");
  const adults = query.get("adults");
  const children = query.get("children");

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const [myUuid, setMyUuid] = useState(null);

  useEffect(() => {
    const lastHotels = JSON.parse(localStorage.getItem("lastHotels")) || [];
    setHotels(lastHotels);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Nur ausführen, wenn alle Parameter vorhanden sind
    if (myCity && startDate && endDate && adults && children) {
      setLoading(true);
      setError("");
      setHotels([]);

      axios
        .get("http://localhost:3000/api/uuid/generate", {
          params: {
            cityName: myCity,
            startDate: startDate,
            endDate: endDate,
            adults: adults,
            children: children,
          },
        })
        .then((response) => {
          // Beispiel: Hotels aus response extrahieren
          // Passe das an deine Backend-Response an!
          setHotels(response.data.hotels || []);
          setLoading(false);
        })
        .catch((err) => {
          setError("Fehler beim Laden der Hotels.", err);
          setLoading(false);
        });
    }
  }, [myCity, startDate, endDate, adults, children]);

  return (
    <div className="block w-full mt-24">
      <aside></aside>
      <section>
        <MiniSearchbar />
      </section>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Gefundene Hotels</h1>
        {loading && (
          <div className="flex items-center gap-2 text-blue-600 text-lg mb-4">
            <FaSpinner className="animate-spin" />
            Hotels werden geladen...
          </div>
        )}
        {error && <div className="text-red-600 mb-4">{error}</div>}

        {hotels.length === 0 ? (
          <p>Keine Hotels gefunden.</p>
        ) : (
          hotels.map((hotel) => (
            <div key={hotel.hotel.dupeId}>
              <div
                className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                onClick={() =>
                  (window.location.href = `/hotel/${hotel.hotel.dupeId}`)
                }
              ></div>
              <div className="w-full md:w-[320px] h-[250px] md:h-[220px] overflow-hidden rounded-lg ml-4 mt-4">
                <div className="flex absolute top-2 right-2">
                  <img
                    src={wishlistHeartEmpty}
                    alt="icon: heart"
                    className="h-5 w-5 z-10"
                    // onClick={handleAddToWishlist} => kommt noch !!
                  />
                </div>
                <img
                  src={gptExample}
                  alt="gpt-example-picture"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-8 flex flex-col justify-between flex-1 ml-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-700">
                      {hotel.hotel.name
                        .toLowerCase()
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </h3>
                    {/* <p>{Bewertung später}</p> */}

                    <div className="flex items-center">
                      {/*  {[...Array(hotel.stars)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-400 text-lg" />
                                          ))}
                                        </div>
                  */}
                    </div>
                    <p className="text-gray-600 mb-1 flex items-center">
                      <FaMapMarkerAlt className="text-red-500 mr-2" />
                      {/* {hotel.district}, {hotel.location} */}
                    </p>
                    <p className="text-blue-400 font-semibold mb-2 flex items-center">
                      <FaThumbsUp className="text-blue-400 mr-2" />
                      {/* {hotel.rating} */}positive Bewertungen
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      {hotel.offers?.[0]?.checkInDate
                        ? new Date(
                            hotel.offers[0].checkInDate
                          ).toLocaleDateString("de-DE", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : ""}
                      &#32; &#45;&#32;
                      {hotel.offers?.[0]?.checkOutDate
                        ? new Date(
                            hotel.offers[0].checkOutDate
                          ).toLocaleDateString("de-DE", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : ""}
                    </p>

                    <h4 className="block w-full">
                      &#40;
                      {
                        // Finde den passenden Stadtnamen zum CityCode
                        validCities.find((city) =>
                          city
                            .toLowerCase()
                            .includes(hotel.hotel.cityCode.toLowerCase())
                        ) || hotel.hotel.cityCode
                      }
                      &#41;&#44;
                    </h4>
                    {/* Anzahl + Erwachsene(r) */}
                    {/* Kinder und Erwachsene zusammen als Personen zählen */}
                    <p>
                      {hotel.offers[0].guests.adults}&#32;
                      {hotel.offers[0].guests.adults > 1
                        ? "Personen"
                        : "Person"}
                    </p>
                    {/* Kinder normalerweise extra */}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {/*} {hotel.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200"
                      >*/}
                    {/* {amenity} */}
                    {/* </span> */}
                    <p className="text-sm text-gray-600 flex items-center">
                      <FaBed className="text-gray-500 mr-2" />
                      {/* Zeige den passenden Wert aus hotelRooms basierend auf category */}
                      {hotelRooms[hotel.offers[0].roomEstimated?.category] ||
                        hotelRooms.STANDARD_ROOM}

                      <FaUtensils className="text-gray-500 mx-2" />
                      {hotel.offers[0].boardtype?.toLowerCase() === "breakfast"
                        ? "Frühstück inklusive"
                        : ""}
                    </p>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        <p>
                          Preis ab:{" "}
                          {hotel.offers[0].price.total
                            ? hotel.offers[0].price.total.replace(".", ",")
                            : ""}
                          {hotel.offers[0].price.currency}{" "}
                          {hotel.offers[0]?.price.currency.replace("EUR", "€")}
                        </p>{" "}
                      </div>

                      <button className="mt-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition-colors font-medium shadow-md hover:shadow-lg">
                        Buchen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HotelResultsPage;
