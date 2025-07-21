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

const BookingFormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    <div className="pt-15 bg-gray-50 min-h-screen">
      <div className="p-4 md:p-8">
        {/* Kopfzeile */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-600 mb-2">
            Buchung bestätigen
          </h1>
          <p className="text-gray-600">
            Vervollständigen Sie Ihre Buchung für das {selectedHotel.name}
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Linke Spalte */}
            <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-xl p-6 h-fit">
              <div className="space-y-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-700">
                  {selectedHotel.name}
                </h2>
                <div className="flex items-center">
                  {[...Array(selectedHotel.stars)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>
                <p className="text-gray-600 flex items-center">
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
                    <div className="flex items-center text-blue-400 border bg-white border-amber-500 px-3 py-1 rounded-full">
                      <FaDog className="mr-1" />
                      <span className="text-sm font-medium">
                        Haustiere erlaubt
                      </span>
                    </div>
                  )}
                  {selectedHotel.wifi && (
                    <div className="flex items-center text-blue-400 border bg-white border-amber-500 px-3 py-1 rounded-full">
                      <FaWifi className="mr-1" />
                      <span className="text-sm font-medium">
                        Kostenloses WLAN
                      </span>
                    </div>
                  )}
                  {selectedHotel.parking && (
                    <div className="flex items-center text-blue-400 border bg-white border-amber-500 px-3 py-1 rounded-full">
                      <FaCar className="mr-1" />
                      <span className="text-sm font-medium">Parkplätze</span>
                    </div>
                  )}
                  {selectedHotel.amenities.includes("Restaurant") && (
                    <div className="flex items-center text-blue-400 border bg-white border-amber-500 px-3 py-1 rounded-full">
                      <FaUtensils className="mr-1" />
                      <span className="text-sm font-medium">Restaurant</span>
                    </div>
                  )}
                  {selectedHotel.pool && (
                    <div className="flex items-center text-blue-400 border bg-white border-amber-500 px-3 py-1 rounded-full">
                      <FaSwimmingPool className="mr-1" />
                      <span className="text-sm font-medium">Pool</span>
                    </div>
                  )}
                  {selectedHotel.spa && (
                    <div className="flex items-center text-blue-400 border bg-white border-amber-500 px-3 py-1 rounded-full">
                      <FaSpa className="mr-1" />
                      <span className="text-sm font-medium">Spa</span>
                    </div>
                  )}
                </div>
              </div>

              <hr className="my-6 border-gray-200" />

              <div className="text-sm space-y-3">
                <h3 className="font-semibold text-gray-800 text-lg">
                  Ihre Buchungsdetails
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2">
                    <strong>Check-in:</strong>{" "}
                    {startDate ? formatDate(startDate) : selectedHotel.checkIn}{" "}
                    <br />
                    <span className="text-gray-600">
                      Ab {selectedHotel.checkIn}
                    </span>
                  </p>
                  <p className="mb-2">
                    <strong>Check-out:</strong>{" "}
                    {endDate ? formatDate(endDate) : selectedHotel.checkOut}{" "}
                    <br />
                    <span className="text-gray-600">
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

              <hr className="my-6 border-gray-200" />

              <div className="text-sm space-y-3">
                <h3 className="font-semibold text-gray-800 text-lg">
                  Ihre Preisübersicht
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="pt-1 mt-1">
                    <p className="text-2xl font-bold text-blue-500 pb-1">
                      {totalPrice}€
                    </p>
                    <p className="text-gray-600 text-xs">
                      Zusätzliche Gebühren können anfallen
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rechte Spalte */}
            <div className="w-full lg:w-2/3 bg-white shadow-lg rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-700">
                Geben Sie Ihre Daten ein
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block font-semibold text-gray-700 mb-2">
                      Vorname *
                    </label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className={`w-full border ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      } p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                      placeholder="Geben Sie Ihren Vornamen ein"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">Erforderlich</p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block font-semibold text-gray-700 mb-2">
                      Nachname
                    </label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Geben Sie Ihren Nachnamen ein"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold  text-gray-700 mb-2">
                    E-Mail-Adresse
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    type="email"
                    placeholder="Geben Sie Ihre E-Mail-Adresse ein"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-600 mb-2">
                    Adresse *
                  </label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    } p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    placeholder="Geben Sie Ihre Adresse ein"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">Erforderlich</p>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block font-semibold text-gray-700 mb-2">
                      Stadt
                    </label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Geben Sie Ihre Stadt ein"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block font-semibold text-gray-700 mb-2">
                      Postleitzahl
                    </label>
                    <input
                      name="zip"
                      value={form.zip}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Geben Sie Ihre Postleitzahl ein"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Telefonnummer *
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
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
