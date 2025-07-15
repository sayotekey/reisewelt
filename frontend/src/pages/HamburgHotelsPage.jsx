import React, { useState, useMemo } from "react";
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
} from "react-icons/fa";

const hotels = [
  {
    id: 1,
    name: "Hotel Elbblick",
    location: "Hamburg, Deutschland",
    rating: "95%",
    nights: "7 Nächte vom 13.08 bis 19.08",
    price: "ab 320€",
    priceValue: 320,
    image: "/src/images/hamburg-1.jpg",
    stars: 5,
    district: "Altstadt",
    amenities: ["WLAN", "Frühstück", "Parkplatz", "Spa"],
    roomType: "Deluxe",
    breakfast: "Frühstück",
    parking: true,
    petFriendly: true,
    businessCenter: true,
    pool: false,
    wifi: true,
    airConditioning: true,
    checkIn: "15:00",
    checkOut: "11:00",
  },
  {
    id: 2,
    name: "Hotel St.Annen",
    location: "Hamburg, Deutschland",
    rating: "90%",
    nights: "7 Nächte vom 13.08 bis 19.08",
    price: "ab 310€",
    priceValue: 310,
    image: "/src/images/hamburg-2.jpg",
    stars: 4,
    district: "Speicherstadt",
    amenities: ["WLAN", "Halbpension", "Fitnessstudio"],
    roomType: "Standard",
    breakfast: "Halbpension",
    parking: false,
    petFriendly: false,
    businessCenter: true,
    pool: true,
    wifi: true,
    airConditioning: true,
    checkIn: "14:00",
    checkOut: "12:00",
  },
  {
    id: 3,
    name: "Alster Hof",
    location: "Hamburg, Deutschland",
    rating: "87%",
    nights: "7 Nächte vom 13.08 bis 19.08",
    price: "ab 280€",
    priceValue: 280,
    image: "/src/images/hamburg-3.jpg",
    stars: 3,
    district: "Rotherbaum",
    amenities: ["WLAN", "Frühstück"],
    roomType: "Economy",
    breakfast: "Frühstück",
    parking: true,
    petFriendly: true,
    businessCenter: false,
    pool: false,
    wifi: true,
    airConditioning: false,
    checkIn: "15:00",
    checkOut: "11:00",
  },
  {
    id: 4,
    name: "Hotel Hafen",
    location: "Hamburg, Deutschland",
    rating: "92%",
    nights: "7 Nächte vom 13.08 bis 19.08",
    price: "ab 350€",
    priceValue: 350,
    image: "/src/images/hamburg-4.jpg",
    stars: 4,
    district: "St. Pauli",
    amenities: ["WLAN", "All-Inclusive", "Spa", "Fitnessstudio"],
    roomType: "Suite",
    breakfast: "All-Inclusive",
    parking: true,
    petFriendly: false,
    businessCenter: true,
    pool: true,
    wifi: true,
    airConditioning: true,
    checkIn: "14:00",
    checkOut: "12:00",
  },
  {
    id: 5,
    name: "The George Hotel",
    location: "Hamburg, Deutschland",
    rating: "88%",
    nights: "7 Nächte vom 13.08 bis 19.08",
    price: "ab 330€",
    priceValue: 330,
    image: "/src/images/hamburg-5.jpg",
    stars: 5,
    district: "Neustadt",
    amenities: ["WLAN", "Frühstück", "Spa", "Parkplatz"],
    roomType: "Deluxe",
    breakfast: "Frühstück",
    parking: true,
    petFriendly: true,
    businessCenter: true,
    pool: false,
    wifi: true,
    airConditioning: true,
    checkIn: "15:00",
    checkOut: "11:00",
  },
  {
    id: 6,
    name: "Reichshof Hotel",
    location: "Hamburg, Deutschland",
    rating: "91%",
    nights: "7 Nächte vom 13.08 bis 19.08",
    price: "ab 340€",
    priceValue: 340,
    image: "/src/images/hamburg-6.jpg",
    stars: 4,
    district: "Altstadt",
    amenities: ["WLAN", "Halbpension", "Fitnessstudio"],
    roomType: "Standard",
    breakfast: "Halbpension",
    parking: false,
    petFriendly: false,
    businessCenter: true,
    pool: true,
    wifi: true,
    airConditioning: true,
    checkIn: "14:00",
    checkOut: "12:00",
  },
  {
    id: 7,
    name: "Mövenpick Hamburg",
    location: "Hamburg, Deutschland",
    rating: "85%",
    nights: "7 Nächte vom 13.08 bis 19.08",
    price: "ab 300€",
    priceValue: 300,
    image: "/src/images/hamburg-7.jpg",
    stars: 3,
    district: "Harburg",
    amenities: ["WLAN", "Frühstück"],
    roomType: "Economy",
    breakfast: "Frühstück",
    parking: true,
    petFriendly: true,
    businessCenter: false,
    pool: false,
    wifi: true,
    airConditioning: false,
    checkIn: "15:00",
    checkOut: "11:00",
  },
  {
    id: 8,
    name: "Empire Riverside",
    location: "Hamburg, Deutschland",
    rating: "89%",
    nights: "7 Nächte vom 13.08 bis 19.08",
    price: "ab 360€",
    priceValue: 360,
    image: "/src/images/hamburg-8.jpg",
    stars: 5,
    district: "St. Pauli",
    amenities: ["WLAN", "All-Inclusive", "Spa", "Parkplatz"],
    roomType: "Suite",
    breakfast: "All-Inclusive",
    parking: true,
    petFriendly: false,
    businessCenter: true,
    pool: true,
    wifi: true,
    airConditioning: true,
    checkIn: "14:00",
    checkOut: "12:00",
  },
  {
    id: 9,
    name: "25hours Hotel",
    location: "Hamburg, Deutschland",
    rating: "93%",
    nights: "7 Nächte vom 13.08 bis 19.08",
    price: "ab 325€",
    priceValue: 325,
    image: "/src/images/hamburg-9.jpg",
    stars: 4,
    district: "Speicherstadt",
    amenities: ["WLAN", "Frühstück", "Fitnessstudio"],
    roomType: "Deluxe",
    breakfast: "Frühstück",
    parking: false,
    petFriendly: true,
    businessCenter: true,
    pool: false,
    wifi: true,
    airConditioning: true,
    checkIn: "15:00",
    checkOut: "11:00",
  },
  {
    id: 10,
    name: "Hotel Reichs-Hof",
    location: "Hamburg, Deutschland",
    rating: "96%",
    nights: "7 Nächte vom 13.08 bis 19.08",
    price: "ab 370€",
    priceValue: 370,
    image: "/src/images/hamburg-10.jpg",
    stars: 5,
    district: "Rotherbaum",
    amenities: ["WLAN", "All-Inclusive", "Spa", "Parkplatz", "Fitnessstudio"],
    roomType: "Suite",
    breakfast: "All-Inclusive",
    parking: true,
    petFriendly: true,
    businessCenter: true,
    pool: true,
    wifi: true,
    airConditioning: true,
    checkIn: "14:00",
    checkOut: "12:00",
  },
];

const HamburgHotelsPage = () => {
  const [filters, setFilters] = useState({
    priceRange: "all",
    stars: "all",
    rating: "all",
    district: "all",
    breakfast: "all",
    roomType: "all",
    parking: false,
    petFriendly: false,
    businessCenter: false,
    pool: false,
    wifi: false,
    airConditioning: false,
    spa: false,
    fitness: false,
    sortBy: "rating",
  });

  const filteredHotels = useMemo(() => {
    let filtered = hotels.filter((hotel) => {
      // filter in price range
      if (filters.priceRange === "under300" && hotel.priceValue >= 300)
        return false;
      if (
        filters.priceRange === "300-350" &&
        (hotel.priceValue < 300 || hotel.priceValue > 350)
      )
        return false;
      if (filters.priceRange === "over350" && hotel.priceValue <= 350)
        return false;

      // Filter by stars
      if (filters.stars !== "all" && hotel.stars !== parseInt(filters.stars))
        return false;

      // Filter by rating
      if (filters.rating === "above80" && parseInt(hotel.rating) < 80)
        return false;
      if (filters.rating === "above90" && parseInt(hotel.rating) < 90)
        return false;
      if (filters.rating === "above95" && parseInt(hotel.rating) < 95)
        return false;

      // Filter by district
      if (filters.district !== "all" && hotel.district !== filters.district)
        return false;

      // Filter by breakfast
      if (filters.breakfast !== "all" && hotel.breakfast !== filters.breakfast)
        return false;

      // Filter by room type
      if (filters.roomType !== "all" && hotel.roomType !== filters.roomType)
        return false;

      // Boolean filters
      if (filters.parking && !hotel.parking) return false;
      if (filters.petFriendly && !hotel.petFriendly) return false;
      if (filters.businessCenter && !hotel.businessCenter) return false;
      if (filters.pool && !hotel.pool) return false;
      if (filters.wifi && !hotel.wifi) return false;
      if (filters.airConditioning && !hotel.airConditioning) return false;
      if (filters.spa && !hotel.amenities.includes("Spa")) return false;
      if (filters.fitness && !hotel.amenities.includes("Fitnessstudio"))
        return false;

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price_low":
          return a.priceValue - b.priceValue;
        case "price_high":
          return b.priceValue - a.priceValue;
        case "rating":
          return parseInt(b.rating) - parseInt(a.rating);
        case "stars":
          return b.stars - a.stars;
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceRange: "all",
      stars: "all",
      rating: "all",
      district: "all",
      breakfast: "all",
      roomType: "all",
      parking: false,
      petFriendly: false,
      businessCenter: false,
      pool: false,
      wifi: false,
      airConditioning: false,
      spa: false,
      fitness: false,
      sortBy: "rating",
    });
  };

  return (
    <div className="pt-15">
      <div className="flex flex-col lg:flex-row p-4 gap-6 bg-gray-50 min-h-screen">
        {/* Filters */}
        <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Filter</h2>
            <button
              onClick={resetFilters}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Zurücksetzen
            </button>
          </div>

          <div className="space-y-6">
            {/* 1. Preiskategorie */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Preiskategorie
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) =>
                  handleFilterChange("priceRange", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Alle Preise</option>
                <option value="under300">Unter 300€</option>
                <option value="300-350">300€ - 350€</option>
                <option value="over350">Über 350€</option>
              </select>
            </div>

            {/* 2. Sterne */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Sterne
              </label>
              <select
                value={filters.stars}
                onChange={(e) => handleFilterChange("stars", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Alle Sterne</option>
                <option value="3">3 Sterne</option>
                <option value="4">4 Sterne</option>
                <option value="5">5 Sterne</option>
              </select>
            </div>

            {/* 3. Bewertung */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Bewertung
              </label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange("rating", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Alle Bewertungen</option>
                <option value="above80">Ab 80%</option>
                <option value="above90">Ab 90%</option>
                <option value="above95">Ab 95%</option>
              </select>
            </div>

            {/* 4. Stadtteil */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Stadtteil
              </label>
              <select
                value={filters.district}
                onChange={(e) => handleFilterChange("district", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Alle Stadtteile</option>
                <option value="Altstadt">Altstadt</option>
                <option value="Speicherstadt">Speicherstadt</option>
                <option value="St. Pauli">St. Pauli</option>
                <option value="Rotherbaum">Rotherbaum</option>
                <option value="Neustadt">Neustadt</option>
                <option value="Harburg">Harburg</option>
              </select>
            </div>

            {/* 5. Verpflegung */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Verpflegung
              </label>
              <select
                value={filters.breakfast}
                onChange={(e) =>
                  handleFilterChange("breakfast", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Alle Optionen</option>
                <option value="Frühstück">Frühstück</option>
                <option value="Halbpension">Halbpension</option>
                <option value="All-Inclusive">All-Inclusive</option>
              </select>
            </div>

            {/* 6. Zimmertyp */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Zimmertyp
              </label>
              <select
                value={filters.roomType}
                onChange={(e) => handleFilterChange("roomType", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Alle Zimmertypen</option>
                <option value="Economy">Economy</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
              </select>
            </div>

            {/* Ausstattung */}
            <div>
              <label className="block font-semibold text-gray-700 mb-3">
                Ausstattung
              </label>
              <div className="space-y-3">
                {[
                  {
                    key: "parking",
                    label: "Parkplatz",
                    value: filters.parking,
                    icon: <FaCar className="text-blue-600" />,
                  },
                  {
                    key: "petFriendly",
                    label: "Haustierfreundlich",
                    value: filters.petFriendly,
                    icon: <FaDog className="text-blue-600" />,
                  },
                  {
                    key: "businessCenter",
                    label: "Business Center",
                    value: filters.businessCenter,
                    icon: <FaBuilding className="text-blue-600" />,
                  },
                  {
                    key: "pool",
                    label: "Pool",
                    value: filters.pool,
                    icon: <FaSwimmingPool className="text-blue-600" />,
                  },
                  {
                    key: "wifi",
                    label: "WLAN",
                    value: filters.wifi,
                    icon: <FaWifi className="text-blue-600" />,
                  },
                  {
                    key: "airConditioning",
                    label: "Klimaanlage",
                    value: filters.airConditioning,
                    icon: <FaSnowflake className="text-blue-600" />,
                  },
                  {
                    key: "spa",
                    label: "Spa",
                    value: filters.spa,
                    icon: <FaSpa className="text-blue-600" />,
                  },
                  {
                    key: "fitness",
                    label: "Fitnessstudio",
                    value: filters.fitness,
                    icon: <FaDumbbell className="text-blue-600" />,
                  },
                ].map((filter) => (
                  <label
                    key={filter.key}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filter.value}
                      onChange={(e) =>
                        handleFilterChange(filter.key, e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    {filter.icon}
                    <span className="text-gray-700">{filter.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sortierung */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Sortieren nach
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="rating">Bewertung (höchste zuerst)</option>
                <option value="price_low">Preis (niedrigste zuerst)</option>
                <option value="price_high">Preis (höchste zuerst)</option>
                <option value="stars">Sterne (höchste zuerst)</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Результаты */}
        <section className="w-full lg:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Hotels in Hamburg
            </h1>
            <p className="text-gray-600">
              {filteredHotels.length} von {hotels.length} Hotels gefunden
            </p>
          </div>

          <div className="grid gap-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-full md:w-[320px] h-[250px] md:h-[220px] overflow-hidden rounded-lg ml-4 mt-4">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-8 flex flex-col justify-between flex-1 ml-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center">
                        {[...Array(hotel.stars)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 text-lg" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-1 flex items-center">
                      <FaMapMarkerAlt className="text-red-500 mr-2" />
                      {hotel.district}, {hotel.location}
                    </p>
                    <p className="text-green-600 font-semibold mb-2 flex items-center">
                      <FaThumbsUp className="text-green-500 mr-2" />
                      {hotel.rating} positive Bewertungen
                    </p>
                    <p className="text-sm text-gray-500 mb-3">{hotel.nights}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {hotel.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 flex items-center">
                      <FaBed className="text-gray-500 mr-2" />
                      {hotel.roomType} •
                      <FaUtensils className="text-gray-500 mx-2" />
                      {hotel.breakfast}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-3">
                      {hotel.parking && (
                        <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
                          <FaCar className="mr-1" />
                          <span className="text-sm font-medium">Parkplatz</span>
                        </div>
                      )}
                      {hotel.petFriendly && (
                        <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
                          <FaDog className="mr-1" />
                          <span className="text-sm font-medium">
                            Haustierfreundlich
                          </span>
                        </div>
                      )}
                      {hotel.pool && (
                        <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
                          <FaSwimmingPool className="mr-1" />
                          <span className="text-sm font-medium">Pool</span>
                        </div>
                      )}
                      {hotel.wifi && (
                        <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
                          <FaWifi className="mr-1" />
                          <span className="text-sm font-medium">WLAN</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {hotel.price}
                      </div>
                      <button className="mt-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition-colors font-medium shadow-md hover:shadow-lg">
                        Buchen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredHotels.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500 text-lg">
                Keine Hotels gefunden. Versuchen Sie andere Filter.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HamburgHotelsPage;
