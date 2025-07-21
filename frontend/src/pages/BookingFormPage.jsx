import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import hotels from "../data/hotels";
import {
  FaMapMarkerAlt,
  FaStar,
  FaCar,
  FaDog,
  FaWifi,
  FaUtensils,
  FaSwimmingPool,
  FaSpa,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const BookingFormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const searchParams = new URLSearchParams(location.search);

  // erhaltene Parameter
  const hotelId = searchParams.get("hotelId");
  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");
  const adultsParam = searchParams.get("adults");
  const childrenParam = searchParams.get("children");

  // SUCHE HOTEL
  const selectedHotel =
    hotels.find((h) => h.id === parseInt(hotelId)) || hotels[0];

  // Daten und Nächte
  const startDate = startDateParam ? new Date(startDateParam) : null;
  const endDate = endDateParam ? new Date(endDateParam) : null;
  const nights =
    startDate && endDate
      ? Math.round((endDate - startDate) / (1000 * 60 * 60 * 24))
      : 2;

  // Format Datum
  const formatDate = (date) => {
    if (!date) return "";
    const options = {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("de-DE", options);
  };

  // Erwachsene und Kinder
  const adults = parseInt(adultsParam) || 2;
  const children = parseInt(childrenParam) || 0;

  // Preis
  const totalPrice = selectedHotel.priceValue * nights;

  // Bewertung
  const getRatingLabel = (score) => {
    if (score >= 9) return "Hervorragend";
    if (score >= 8) return "Sehr gut";
    if (score >= 7) return "Gut";
    if (score >= 6) return "Befriedigend";
    return "Ausreichend";
  };

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = "Required";
    if (!form.address) newErrors.address = "Required";
    if (!form.phone) newErrors.phone = "Required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Übergang zur Zahlungsseite mit Datenübergabe
      navigate("/payment", {
        state: {
          hotel: selectedHotel,
          startDate: startDateParam,
          endDate: endDateParam,
          nights,
          adults,
          children,
          totalPrice,
          form,
        },
      });
    }
  };

  return (
    <div
      className={`pt-15 min-h-screen ${isDark ? "bg-[#242424]" : "bg-gray-50"}`}
    >
      <div className="p-4 md:p-8">
        {/* Kopfzeile */}
        <div
          className={`rounded-lg shadow-md p-6 mb-6 ${
            isDark ? "bg-[#232323] text-white" : "bg-white"
          }`}
        >
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? "text-gray-200" : "text-gray-600"
            }`}
          >
            Buchung bestätigen
          </h1>
          <p className={isDark ? "text-gray-300" : "text-gray-600"}>
            Vervollständigen Sie Ihre Buchung für das {selectedHotel.name}
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Linke Spalte */}
            <div
              className={`w-full lg:w-1/3 shadow-lg rounded-xl p-6 h-fit ${
                isDark ? "bg-[#232323] text-white" : "bg-white"
              }`}
            >
              <div className="space-y-4 mb-6">
                <h2
                  className={`text-2xl font-bold ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {selectedHotel.name}
                </h2>
                <div className="flex items-center">
                  {[...Array(selectedHotel.stars)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>
                <p
                  className={`flex items-center ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <FaMapMarkerAlt className="text-red-500 mr-2" />
                  {selectedHotel.district}, {selectedHotel.location}
                </p>
                <p className="text-blue-500 font-semibold">
                  {getRatingLabel(selectedHotel.ratingScore)} —{" "}
                  {selectedHotel.ratingScore}
                </p>
                <p className="bg-blue-400 text-white px-3 py-1 inline-block rounded text-sm">
                  {selectedHotel.ratingScore}{" "}
                  {getRatingLabel(selectedHotel.ratingScore)} •{" "}
                  {selectedHotel.reviewsCount} Bewertungen
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedHotel.petFriendly && (
                    <div
                      className={`flex items-center text-blue-400 border px-3 py-1 rounded-full
                      ${
                        isDark
                          ? "bg-[#232323] border-amber-700"
                          : "bg-white border-amber-500"
                      }`}
                    >
                      <FaDog className="mr-1" />
                      <span
                        className={`text-sm font-medium ${
                          isDark ? "text-gray-200" : ""
                        }`}
                      >
                        Haustiere erlaubt
                      </span>
                    </div>
                  )}
                  {selectedHotel.wifi && (
                    <div
                      className={`flex items-center text-blue-400 border px-3 py-1 rounded-full
                      ${
                        isDark
                          ? "bg-[#232323] border-amber-700"
                          : "bg-white border-amber-500"
                      }`}
                    >
                      <FaWifi className="mr-1" />
                      <span
                        className={`text-sm font-medium ${
                          isDark ? "text-gray-200" : ""
                        }`}
                      >
                        Kostenloses WLAN
                      </span>
                    </div>
                  )}
                  {selectedHotel.parking && (
                    <div
                      className={`flex items-center text-blue-400 border px-3 py-1 rounded-full
                      ${
                        isDark
                          ? "bg-[#232323] border-amber-700"
                          : "bg-white border-amber-500"
                      }`}
                    >
                      <FaCar className="mr-1" />
                      <span
                        className={`text-sm font-medium ${
                          isDark ? "text-gray-200" : ""
                        }`}
                      >
                        Parkplätze
                      </span>
                    </div>
                  )}
                  {selectedHotel.amenities &&
                    selectedHotel.amenities.includes("Restaurant") && (
                      <div
                        className={`flex items-center text-blue-400 border px-3 py-1 rounded-full
                      ${
                        isDark
                          ? "bg-[#232323] border-amber-700"
                          : "bg-white border-amber-500"
                      }`}
                      >
                        <FaUtensils className="mr-1" />
                        <span
                          className={`text-sm font-medium ${
                            isDark ? "text-gray-200" : ""
                          }`}
                        >
                          Restaurant
                        </span>
                      </div>
                    )}
                  {selectedHotel.pool && (
                    <div
                      className={`flex items-center text-blue-400 border px-3 py-1 rounded-full
                      ${
                        isDark
                          ? "bg-[#232323] border-amber-700"
                          : "bg-white border-amber-500"
                      }`}
                    >
                      <FaSwimmingPool className="mr-1" />
                      <span
                        className={`text-sm font-medium ${
                          isDark ? "text-gray-200" : ""
                        }`}
                      >
                        Pool
                      </span>
                    </div>
                  )}
                  {selectedHotel.spa && (
                    <div
                      className={`flex items-center text-blue-400 border px-3 py-1 rounded-full
                      ${
                        isDark
                          ? "bg-[#232323] border-amber-700"
                          : "bg-white border-amber-500"
                      }`}
                    >
                      <FaSpa className="mr-1" />
                      <span
                        className={`text-sm font-medium ${
                          isDark ? "text-gray-200" : ""
                        }`}
                      >
                        Spa
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <hr
                className={`my-6 ${
                  isDark ? "border-gray-700" : "border-gray-200"
                }`}
              />

              <div className="text-sm space-y-3">
                <h3
                  className={`font-semibold text-lg ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Ihre Buchungsdetails
                </h3>
                <div
                  className={`${
                    isDark ? "bg-[#232323] text-gray-200" : "bg-gray-50"
                  } p-4 rounded-lg`}
                >
                  <p className="mb-2">
                    <strong>Check-in:</strong>{" "}
                    {startDate ? formatDate(startDate) : selectedHotel.checkIn}{" "}
                    <br />
                    <span
                      className={isDark ? "text-gray-400" : "text-gray-600"}
                    >
                      Ab {selectedHotel.checkIn}
                    </span>
                  </p>
                  <p className="mb-2">
                    <strong>Check-out:</strong>{" "}
                    {endDate ? formatDate(endDate) : selectedHotel.checkOut}{" "}
                    <br />
                    <span
                      className={isDark ? "text-gray-400" : "text-gray-600"}
                    >
                      Bis {selectedHotel.checkOut}
                    </span>
                  </p>
                  <p className="mb-2">
                    Gesamtdauer des Aufenthalts:{" "}
                    <strong>{nights} Nächte</strong>
                  </p>
                  <p>
                    Sie haben{" "}
                    <strong>
                      1 Zimmer für {adults} Erwachsene
                      {children > 0 ? `, ${children} Kinder` : ""}
                    </strong>{" "}
                    ausgewählt
                  </p>
                </div>
                <button className="text-blue-600 text-sm underline hover:text-blue-800">
                  Auswahl ändern
                </button>
              </div>

              <hr
                className={`my-6 ${
                  isDark ? "border-gray-700" : "border-gray-200"
                }`}
              />

              <div className="text-sm space-y-3">
                <h3
                  className={`font-semibold text-lg ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Ihre Preisübersicht
                </h3>
                <div
                  className={`${
                    isDark ? "bg-[#232323] text-gray-200" : "bg-gray-50"
                  } p-4 rounded-lg`}
                >
                  <div className="pt-1 mt-1">
                    <p className="text-2xl font-bold text-blue-500 pb-1">
                      {totalPrice}€
                    </p>
                    <p
                      className={isDark ? "text-gray-400" : "text-gray-600"}
                      style={{ fontSize: "0.75rem" }}
                    >
                      Zusätzliche Gebühren können anfallen
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rechte Spalte */}
            <div
              className={`w-full lg:w-2/3 shadow-lg rounded-xl p-6 md:p-8 ${
                isDark ? "bg-[#232323] text-white" : "bg-white"
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-6 ${
                  isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Geben Sie Ihre Daten ein
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label
                      className={`block font-semibold mb-2 ${
                        isDark ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Vorname *
                    </label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className={`w-full border ${
                        isDark
                          ? "bg-[#232323] text-white border-gray-700"
                          : "border-gray-300"
                      } ${
                        errors.firstName ? "border-red-500" : ""
                      } p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      placeholder="Geben Sie Ihren Vornamen ein"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">Erforderlich</p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label
                      className={`block font-semibold mb-2 ${
                        isDark ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Nachname
                    </label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className={`w-full border ${
                        isDark
                          ? "bg-[#232323] text-white border-gray-700"
                          : "border-gray-300"
                      } p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      placeholder="Geben Sie Ihren Nachnamen ein"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block font-semibold mb-2 ${
                      isDark ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    E-Mail-Adresse
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full border ${
                      isDark
                        ? "bg-[#232323] text-white border-gray-700"
                        : "border-gray-300"
                    } p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    type="email"
                    placeholder="Geben Sie Ihre E-Mail-Adresse ein"
                  />
                </div>

                <div>
                  <label
                    className={`block font-semibold mb-2 ${
                      isDark ? "text-gray-200" : "text-gray-600"
                    }`}
                  >
                    Adresse *
                  </label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className={`w-full border ${
                      isDark
                        ? "bg-[#232323] text-white border-gray-700"
                        : "border-gray-300"
                    } ${
                      errors.address ? "border-red-500" : ""
                    } p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    placeholder="Geben Sie Ihre Adresse ein"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">Erforderlich</p>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label
                      className={`block font-semibold mb-2 ${
                        isDark ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Stadt
                    </label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className={`w-full border ${
                        isDark
                          ? "bg-[#232323] text-white border-gray-700"
                          : "border-gray-300"
                      } p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      placeholder="Geben Sie Ihre Stadt ein"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      className={`block font-semibold mb-2 ${
                        isDark ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      Postleitzahl
                    </label>
                    <input
                      name="zip"
                      value={form.zip}
                      onChange={handleChange}
                      className={`w-full border ${
                        isDark
                          ? "bg-[#232323] text-white border-gray-700"
                          : "border-gray-300"
                      } p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      placeholder="Geben Sie Ihre Postleitzahl ein"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block font-semibold mb-2 ${
                      isDark ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Telefonnummer *
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full border ${
                      isDark
                        ? "bg-[#232323] text-white border-gray-700"
                        : "border-gray-300"
                    } ${
                      errors.phone ? "border-red-500" : ""
                    } p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    placeholder="Geben Sie Ihre Telefonnummer ein"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">Erforderlich</p>
                  )}
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition-colors font-medium shadow-md hover:shadow-lg"
                  >
                    Buchung abschließen
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFormPage;
