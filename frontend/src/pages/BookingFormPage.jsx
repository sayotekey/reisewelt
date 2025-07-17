import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaThumbsUp,
  FaStar,
  FaCar,
  FaDog,
  FaWifi,
  FaUtensils,
} from "react-icons/fa";

const BookingFormPage = () => {
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
      console.log("Form Submitted:", form);
    }
  };

  return (
    <div className="pt-15 bg-gray-50 min-h-screen">
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-600 mb-2">
            Buchung bestätigen
          </h1>
          <p className="text-gray-600">
            Vervollständigen Sie Ihre Buchung für das Reichshof Hotel Hamburg
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left panel - Hotel Info */}
            <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-xl p-6 h-fit">
              <div className="space-y-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-700">
                  Reichshof Hotel Hamburg
                </h2>
                <div className="flex items-center">
                  {[...Array(4)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>
                <p className="text-gray-600 flex items-center">
                  <FaMapMarkerAlt className="text-red-500 mr-2" />
                  Kirchenallee 34-36, St. Georg, 20099 Hamburg, Germany
                </p>
                <p className="text-blue-500 font-semibold">
                  Hervorragende Lage — 9,4
                </p>
                <p className="bg-blue-400 text-white px-3 py-1 inline-block rounded text-sm">
                  8,6 Hervorragend • 8.132 Bewertungen
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  <div className="flex items-center text-blue-400 border bg-white border-amber-500 px-3 py-1 rounded-full">
                    <FaDog className="mr-1" />
                    <span className="text-sm font-medium">
                      Haustiere erlaubt
                    </span>
                  </div>
                  <div className="flex items-center text-blue-400 border bg-white border-amber-500 px-3 py-1 rounded-full">
                    <FaWifi className="mr-1" />
                    <span className="text-sm font-medium">
                      Kostenloses WLAN
                    </span>
                  </div>
                  <div className="flex items-center text-blue-400 border bg-white border-amber-500 px-3 py-1 rounded-full">
                    <FaCar className="mr-1" />
                    <span className="text-sm font-medium">Parkplätze</span>
                  </div>
                  <div className="flex items-center text-blue-400 border bg-white border-amber-500 px-3 py-1 rounded-full">
                    <FaUtensils className="mr-1" />
                    <span className="text-sm font-medium">Restaurant</span>
                  </div>
                </div>
              </div>

              <hr className="my-6 border-gray-200" />

              <div className="text-sm space-y-3">
                <h3 className="font-semibold text-gray-800 text-lg">
                  Ihre Buchungsdetails
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2">
                    <strong>Check-in:</strong> Mo., 28. Juli 2025 <br />
                    <span className="text-gray-600">Ab 15:00 Uhr</span>
                  </p>
                  <p className="mb-2">
                    <strong>Check-out:</strong> Mi., 30. Juli 2025 <br />
                    <span className="text-gray-600">Bis 12:00 Uhr</span>
                  </p>
                  <p className="mb-2">
                    Gesamtdauer des Aufenthalts: <strong>2 Nächte</strong>
                  </p>
                  <p>
                    Sie haben <strong>1 Zimmer für 2 Erwachsene</strong>{" "}
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
                  <p className="text-gray-700">Originalpreis: 351,20 €</p>
                  <p className="text-blue-600 font-medium">
                    Booking.com zahlt: – 35,12 €
                  </p>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <p className="text-2xl font-bold text-blue-500">316,08 €</p>
                    <p className="text-gray-600 text-xs">
                      Zusätzliche Gebühren können anfallen
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right panel - Form */}
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
                      } p-3  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
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
