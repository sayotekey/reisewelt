import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import { AnimatePresence, motion } from "framer-motion";
import SkeletonHotelCard from "../components/SkeletonHotelCard.jsx";
import xButtonDelete from "../icons/x-solid-black.svg";
import persons from "../icons/people-group-solid-black.svg";
import plane from "../icons/plane-solid-black.svg";
import travelGoal from "../icons/mountain-city-solid-black.svg";
import calendar from "../icons/calendar-days-solid-black.svg";
// import pencil from "../icons/pencil-solid-black.svg";
import pencil2 from "../icons/pencil-solid-white.svg";
import wishlistHeartFull from "../icons/heart-solid-black.svg";
import wishlistHeartEmpty from "../icons/heart-regular-black.svg";
import {
  // FaCalendarAlt,
  FaMapMarkerAlt,
  FaThumbsUp,
  FaBed,
  FaUtensils,
  FaSpinner,
  FaCar,
  FaDog,
  FaSwimmingPool,
  FaWifi,
  FaBuilding,
  FaSnowflake,
  FaSpa,
  FaDumbbell,
} from "react-icons/fa";
import validCities from "../utils/validCities.js";
import validCityNames from "../utils/validCityNames.js";
import hotelRooms from "../data/hotelRooms";

import { useTranslate } from "../locales/index.js"; // Import the translation context

import gptExample from "../images/chat-gpt-example.png";

// handleEdit

const HotelResultsPage = () => {
  // const [myUuid, setMyUuid] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [myCity, setMyCity] = useState(""); // State for my city (von wo ?)
  const [mock, setMock] = useState("");

  // aktive Suchparameter
  // const [searchCity, setSearchCity] = useState("");
  // const [searchDateRange, setSearchDateRange] = useState([null, null]);
  // const [searchAdults, setSearchAdults] = useState(2);
  // const [searchChildren, setSearchChildren] = useState(0);

  // const [activeSearch, setActiveSearch] = useState(null);

  const [cityError, setCityError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dateRange, setDateRange] = useState([null, null]); // State for date range
  const [startDate, endDate] = dateRange;
  const [loading, setLoading] = useState(true);
  const [errorInfo, setErrorInfo] = useState("");
  const [error, setError] = useState("");
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const { t } = useTranslate();
  const location = useLocation();

  // Suchparameter aus der URL automatisch in die React-States übernommen
  //sobald sich location.search ändert
  useEffect(() => {
    // const myCity = query.get("city");
    // const startDate = query.get("start");
    // const endDate = query.get("end");
    // const adults = query.get("adults");
    // const children = query.get("children");

    const query = new URLSearchParams(location.search);
    setMyCity(query.get("city") || "");
    setDateRange([query.get("startDate"), query.get("endDate")]);
    setAdults(Number(query.get("adults")) || 2);
    setChildren(Number(query.get("children")) || 0);
    setMock(query.get("mock")) || "";
  }, [location.search]);

  console.log("startDate:", startDate); // startDate:2025-08-18
  console.log("endDate:", endDate); // endDate: bla
  console.log("adults:", adults);
  console.log("children:", children);
  console.log("mock:", mock);

  // Wert aus localStorage übernehmen
  const togglePopup = () => {
    if (!showPopup && lastSearches[0]?.to) {
      setMyCity(lastSearches[0].to);
    }
    setShowPopup(!showPopup);
  };

  // Daten aus localStorage holen
  // useEffect(() => {
  //   setLoading(true);
  //   const lastHotels = JSON.parse(localStorage.getItem("lastHotels")) || [];
  //   setHotels(lastHotels);
  //   setLoading(false);
  // }, []);

  //dropdown functionality
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  // localStorage last-search-Hotellist
  useEffect(() => {
    if (hotels.length > 0) {
      localStorage.setItem("lastHotels", JSON.stringify(hotels));
    }
  }, [hotels]);

  // Filtere Vorschläge nach Eingabe (case-insensitive, enthält den Text)
  const suggestions = myCity
    ? validCities.filter((city) =>
        city.toLowerCase().includes(myCity.toLowerCase())
      )
    : [];

  const handleInputChange = (e) => {
    setMyCity(e.target.value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
    if (e.target.value.trim() !== "") {
      setErrorInfo("");
    }
  };

  ///
  useEffect(() => {
    // Nur ausführen, wenn alle Parameter vorhanden sind (children kann auch 0 sein)
    // if (!activeSearch) return;
    const getCombinedData = async () => {
      try {
        setLoading(true);
        setError("");
        setHotels([]);
        ///
        // const { city, dateRange, adults, children } = activeSearch;
        const timeoutMs = 20000;
        const startTime = Date.now();
        ///
        if (
          myCity &&
          startDate &&
          endDate &&
          typeof adults === "number" &&
          typeof children === "number"
        ) {
          console.log("alle Daten valide – weiter mit uuid/generate");

          const response = await axios.get(
            "http://localhost:3000/api/uuid/generate",
            {
              params: {
                cityName: myCity,
                // startDate: dateRange[0],
                // endDate: dateRange[1],
                startDate: startDate,
                endDate: endDate,
                adults,
                children,
                mock: mock?.toLowerCase() || "",
              },
            }
          );

          const myUuid = response.data.uuid;
          console.log("UUID:", myUuid); // Gibt die generierte UUID aus

          // 2. Endpunkt: Abfrage der Anzahl der Hotels, die unter dieser UUID gespeichert sind
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const url = `http://localhost:3000/api/uuid/status/${myUuid}`;
          const hotelCountResponse = await axios.get(url);
          const countRaw = hotelCountResponse.data.count; // {"count":3 }
          let flag = hotelCountResponse.data.flag; // false

          console.log("2.Endpunkt: aktueller Count", countRaw);
          console.log("2.Endpunkt: aktuelle flag", flag);

          let allHotels = []; // Array für alle Hotels
          let newCount = 0; // Variable für neuen Count
          //  let newCount = countRaw;
          console.log("hier beginnt while-loop");

          // while (!flag || newCount !== allHotels.length) { // amadeus
          while (flag || newCount !== allHotels.length) {
            // mock
            ///
            console.log("im while-loop");

            // TIMEOUT-CHECK
            if (Date.now() - startTime > timeoutMs) {
              setError("Es wurden keine Hotels gefunden (Timeout).");
              setLoading(false);
              return;
            }
            ///
            await new Promise((resolve) => setTimeout(resolve, 3000));
            const retryResponse = await axios.get(url); // erneute Abfrage der Anzahl der Hotels
            newCount = retryResponse.data.count; // aktualisiere neuen Count
            console.log("newCount aus while-loop:", newCount);
            flag = retryResponse.data.flag;
            ///
            if (newCount > allHotels.length) {
              const urlHotel = "http://localhost:3000/api/uuid/hotels";
              const hotelResponse = await axios.get(urlHotel, {
                params: {
                  uuid: myUuid,
                  count: allHotels.length,
                  limit: newCount - allHotels.length,
                },
              });

              console.log(
                "hotelResponse.data.hotels",
                hotelResponse.data.hotels
              );
              console.log(
                "Array.isArray",
                Array.isArray(hotelResponse.data.hotels)
              );

              hotelResponse.data.hotels.forEach((hotelArray) => {
                allHotels.push(hotelArray[0]); // hole Hotelobjekt aus innerem Array raus
              });

              setHotels([...allHotels]);
              // allHotels.push(...neueHotels);
            } else if (flag) {
              break; // alle Hotels geladen, Loop abbrechen
            } else {
              // Warten und nochmal prüfen (um API-Schleifen zu vermeiden)
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            ///
            // if (newCount > allHotels.length) {
            //   //3. endpunkt
            //   let hotelLength = allHotels.length;
            //   const urlHotel = "http://localhost:3000/api/uuid/hotels";
            //   const hotelResponse = await axios.get(urlHotel, {
            //     params: {
            //       uuid: myUuid,
            //       count: hotelLength,
            //       limit: newCount - hotelLength,
            //     },
            //   });
            //   console.log(
            //     "hotelResponse.data.hotels",
            //     hotelResponse.data.hotels
            //   );

            //   ///

            //   // const fetchedHotels = hotelResponse.data.hotels; // [[hotel1], [hotel2], ...]
            //   //  const fetchedHotels = hotelResponse.data.hotels.map((h) => h[0]);
            //   //  console.log("fetchedHotels:");
            //   // allHotels = [...allHotels, ...fetchedHotels];
            //   // setHotels((prev) => [...prev, ...fetchedHotels]);

            //   hotelLength = newCount;
            //   console.log(hotelResponse.data.hotels);
            //   console.log(
            //     "Array.isArray",
            //     Array.isArray(hotelResponse.data.hotels)
            //   );
            //   console.log(hotelResponse.data.hotels[0]); // sollte ein Array sein, z.B. [hotelObjekt]
            //   console.log(hotelResponse.data.hotels[0][0]); // sollte das Hotelobjekt sein
            //   console.log("Vorher allHotels.length:", allHotels.length);
            //   hotelResponse.data.hotels.forEach((hotelArray, index) => {
            //     console.log(`hotelArray[${index}]`, hotelArray);
            //     console.log(`hotelArray[${index}][0]`, hotelArray[0]);
            //     allHotels.push(hotelArray[0]);
            //   });
            //   console.log("Nachher allHotels.length:", allHotels.length);
            //   // hotelResponse.data.hotels.forEach((hotel, index) => {
            //   //   console.log(`Hotel ${index}:`, hotel);
            //   // });
            //   ///
            //   //// => ältere Umwandlung:
            //   hotelResponse.data.hotels.forEach((hotel) => {
            //     console.log(hotel);
            //     allHotels.push(hotel[0]);
            //     // setHotels((prevHotels) => [...prevHotels, hotel[0]]); //neu
            //   });
            //   setHotels([...allHotels]);
            // }
          }
          if (allHotels.length === 0) {
            setError("Es wurden keine Hotels gefunden.");
          } else {
            setHotels([...allHotels]);
          }

          localStorage.setItem("lastHotels", JSON.stringify(allHotels));
          console.log("Alle Hotels geladen:");

          // Lesen die zuletzt gespeicherten Suchen aus localStorage
          const previousSearches =
            JSON.parse(localStorage.getItem("lastSearches")) || [];

          // // Create a new search object
          // const newSearch = {
          //   to: searchCity,
          //   startDate: searchDateRange[0],
          //   endDate: searchDateRange[1],
          //   adults: searchAdults,
          //   children: searchChildren,
          // };
          const newSearch = {
            to: myCity,
            // startDate: dateRange[0],
            // endDate: dateRange[1],
            startDate: startDate,
            endDate: endDate,
            adults,
            children,
          };
          //

          const updatedSearches = [newSearch, ...previousSearches].slice(0, 3); // Limit to 3 searches
          localStorage.setItem("lastSearches", JSON.stringify(updatedSearches));
        }
      } catch (error) {
        console.error("Fehler beim Laden der Hotels:", error.message);
        setError(error?.message || "Fehler beim Laden der Hotels."); // Nachricht im Frontend anzeigen
        // return [];
      } finally {
        setLoading(false);
      }
    };
    getCombinedData();
  }, [myCity, startDate, endDate, adults, children, mock]);
  ///
  const handleSearchSubmit = () => {
    // Felder prüfen
    if (
      myCity &&
      // dateRange[0] &&
      // dateRange[1] &&
      startDate &&
      endDate &&
      typeof adults === "number" &&
      typeof children === "number"
    ) {
      const params = new URLSearchParams({
        city: myCity,
        startDate: startDate,
        endDate: endDate,
        adults: adults,
        children: children,
      });
      const lowerCity = myCity.toLowerCase();

      const validMocks = ["berlin", "genf", "kopenhagen"];
      const mockValue = validMocks.includes(lowerCity) ? lowerCity : "";

      params.append("mock", encodeURIComponent(mockValue));
      // setSearchCity(myCity);
      // setSearchDateRange(dateRange);
      // setSearchAdults(adults);
      // setSearchChildren(children);
      // Aktive Suche setzen → löst den API-Call via useEffect aus
      // setActiveSearch({
      // city: myCity,
      // // dateRange: dateRange,
      // adults: adults,
      // children: children,
      // });
      setShowPopup(false); // Popup schließen
      setError(""); // Vorherige Fehlermeldung zurücksetzen (optional)
      window.location.href = `/hotel-results?${params.toString()}`;
    }
  };

  // get combined data aufrufen, sobald seite neu geladen wird
  // flag auf true bei neuer datenlage
  // get comb. ändert/prüft das flag
  ///

  // Backend-Abfrage nach activeSearch-Änderung
  useEffect(
    () => {
      /*// Nur starten, wenn alle Parameter vorhanden sind
    // if (!activeSearch) return;

    const getCombinedData = async () => {
      try {
        setLoading(true);
        setError("");
        setHotels([]);
        ///
        // const { city, dateRange, adults, children } = activeSearch;
        const timeoutMs = 20000;
        const startTime = Date.now();
        ///
        const response = await axios.get(
          "http://localhost:3000/api/uuid/generate",
          {
            params: {
              cityName: myCity,
              startDate: dateRange[0],
              endDate: dateRange[1],
              adults: adults,
              children: children,
            },
          }
        );

        const myUuid = response.data.uuid;

        console.log("UUID:", myUuid); // Gibt die generierte UUID aus

        // 2. Endpunkt: Abfrage der Anzahl der Hotels, die unter dieser UUID gespeichert sind
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const url = `http://localhost:3000/api/uuid/status/${myUuid}`;
        const hotelCountResponse = await axios.get(url);
        const countRaw = hotelCountResponse.data.count; // {"count":3 }
        let flag = hotelCountResponse.data.flag; // false

        console.log("2.Endpunkt: aktueller Count", countRaw);
        console.log("2.Endpunkt: aktuelle flag", flag);

        let allHotels = []; // Array für alle Hotels
        let newCount = 0; // Variable für neuen Count
        //  let newCount = countRaw;
        console.log("hier beginnt while-loop");

        while (!flag || newCount !== allHotels.length) {
          ///
          // TIMEOUT-CHECK
          if (Date.now() - startTime > timeoutMs) {
            setError("Es wurden keine Hotels gefunden (Timeout).");
            setLoading(false);
            return;
          }
          ///
          await new Promise((resolve) => setTimeout(resolve, 3000));
          const retryResponse = await axios.get(url); // erneute Abfrage der Anzahl der Hotels
          newCount = retryResponse.data.count; // aktualisiere neuen Count
          console.log("newCount aus while-loop:", newCount);
          flag = retryResponse.data.flag;

          if (newCount > allHotels.length) {
            //3. endpunkt
            let hotelLength = allHotels.length;
            const urlHotel = "http://localhost:3000/api/uuid/hotels";
            const hotelResponse = await axios.get(urlHotel, {
              params: {
                uuid: myUuid,
                count: hotelLength,
                limit: newCount - hotelLength,
              },
            });
            console.log(hotelResponse.data.hotels);
            console.log(Array.isArray(hotelResponse.data.hotels));
            ///

            const fetchedHotels = hotelResponse.data.hotels.map((h) => h[0]);
            allHotels = [...allHotels, ...fetchedHotels];
            setHotels((prev) => [...prev, ...fetchedHotels]);
            hotelLength = newCount;

            ///
            //// => ältere Umwandlung:
            //  hotelResponse.data.hotels.forEach((hotel) => {
            //       console.log(hotel);
            //       setHotels((prevHotels) => [...prevHotels, hotel[0]]); //neu
            // allHotels.push(hotel[0]);
          }
          // setHotels([...allHotels]);
        }
        if (allHotels.length === 0) {
          setError("Es wurden keine Hotels gefunden.");
          setLoading(false);
        } else {
          setHotels([...allHotels]);
        }
        setLoading(false);

        localStorage.setItem("lastHotels", JSON.stringify(allHotels));
        console.log("Alle Hotels geladen:", allHotels);

        // Lesen die zuletzt gespeicherten Suchen aus localStorage
        const previousSearches =
          JSON.parse(localStorage.getItem("lastSearches")) || [];

        // // Create a new search object
        // const newSearch = {
        //   to: searchCity,
        //   startDate: searchDateRange[0],
        //   endDate: searchDateRange[1],
        //   adults: searchAdults,
        //   children: searchChildren,
        // };
        const newSearch = {
          to: myCity,
          startDate: dateRange[0],
          endDate: dateRange[1],
          adults,
          children,
        };
        //
        const updatedSearches = [newSearch, ...previousSearches].slice(0, 3); // Limit to 3 searches
        localStorage.setItem("lastSearches", JSON.stringify(updatedSearches));
      } catch (error) {
        console.error("Fehler beim Laden der Hotels:", error.message);
        setError(error?.message || "Fehler beim Laden der Hotels."); // Nachricht im Frontend anzeigen
        // return [];
      } finally {
        setLoading(false);
      }
    };

    // Nur starten, wenn alle Parameter vorhanden sind
    if (
      myCity &&
      dateRange[0] &&
      dateRange[1] &&
      typeof adults === "number" &&
      typeof children === "number"
    ) {
      getCombinedData();
    }*/
    }
    // ,
    // [myCity, dateRange, adults, children]
  );
  //   getCombinedData();
  // }, [searchAdults, searchChildren, searchCity, searchDateRange, activeSearch]);
  // }, [activeSearch]);
  ///
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      // Auswahl nach unten bewegen
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    }
    if (e.key === "ArrowUp") {
      // Auswahl nach oben bewegen
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    }
    if (e.key === "Enter" && selectedIndex >= 0) {
      setMyCity(suggestions[selectedIndex]);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (city) => {
    setMyCity(city);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    setError("");
  };

  const findCountryByCode = (iataCode) => {
    for (const country in validCityNames) {
      const cities = validCityNames[country];
      for (const city in cities) {
        if (cities[city] === iataCode) {
          return country;
        }
      }
    }
    return null; // nicht gefunden
  };

  const findCityByCode = (iataCode) => {
    for (const country in validCityNames) {
      const cities = validCityNames[country];
      for (const city in cities) {
        if (cities[city] === iataCode) {
          return city;
        }
      }
    }
    return null; // nicht gefunden
  };

  // 1.Endpunkt für UUID
  // onclick button anfrage an backend senden, um UUID zu generieren
  // und die UUID in der MongoDB zu speichern

  // Erroranzeige in Minisearchbar
  //alte Verison:
  /*const handleSearch = () => {
    if (!myCity) {
      setCityError("Bitte einen Städtenamen eingeben.");
    } else if (!validCities.includes(myCity)) {
      setCityError("Ungültiger Städtename, bitte Eingabe überprüfen.");
    } else {
      setCityError("");
      setShowSuggestions(false);
    }
  };*/
  const handleSearchClick = () => {
    if (!myCity) {
      setCityError("Bitte einen Städtenamen eingeben.");
      return;
    } else if (!validCities.includes(myCity)) {
      setCityError("Ungültiger Städtename, bitte Eingabe überprüfen.");
      return;
    } else {
      setCityError("");
    }

    if (!dateRange[0] || !dateRange[1]) {
      setError("Bitte wähle ein gültiges Datum aus.");
      return;
    }

    // setActiveSearch({
    //   city: myCity,
    //   dateRange,
    //   adults,
    //   children,
    // });
  };

  const lastSearches = JSON.parse(localStorage.getItem("lastSearches") || "[]");

  return (
    <div className="block w-full mt-24">
      {/* MiniSearchbar */}
      <div className="flex justify-center items-center">
        <div className="bg-white border relative border-orange-500 rounded ml-10 mb-8 px-3 py-3 flex items-center space-x-4 w-fit shadow-md">
          {/* Reiseziel */}
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 text-blue-900">
              <img src={travelGoal} alt="icon: mountain and building" />
            </div>
            <span className="font-semibold text-blue-900">
              {lastSearches[0]?.to}
            </span>
          </div>

          {/* Datum */}
          <div className="flex items-center space-x-1">
            <div className="w-3 h-4 text-blue-900">
              <img src={calendar} alt="icon: calendar" />
            </div>
            <span className="text-blue-900 font-semibold">
              {lastSearches[0]?.startDate && lastSearches[0]?.endDate && (
                <span>
                  {new Date(lastSearches[0]?.startDate).toLocaleDateString()} –{" "}
                  {new Date(lastSearches[0]?.endDate).toLocaleDateString()}
                </span>
              )}
            </span>
          </div>

          {/* Personen */}
          <div className="flex items-center space-x-1">
            <div className="w-5 h-4 text-blue-900 ">
              <img src={persons} alt="icon: persons" />
            </div>
            <span className="text-blue-900 font-semibold">
              {lastSearches[0]?.adults}{" "}
              {lastSearches[0]?.adults > 1 ? "Erwachsene" : "Erwachsener"}
            </span>
          </div>

          {/* Bearbeiten-Button */}
          <button
            className="ml-2 w-fit pr-2 pl-3 h-8 rounded-md bg-orange-500 flex items-center justify-center hover:bg-orange-400"
            onClick={togglePopup}
          >
            <div className="w-full flex h-5 gap-2">
              <p className="text-white">bearbeiten</p>
              <img src={pencil2} alt="icon: pencil" width={30} />
            </div>
          </button>
          {showPopup && (
            <div className="fixed inset-0 bg-white/10 backdrop-blur-md border border-white/40 h-2/3 bg-opacity-50 z-50 flex items-center justify-center">
              {/*  bg-gray-500  w-full */}
              <div className="bg-white w-2/3 p-6 rounded-xl shadow-xl border border-gray-200 justify-center">
                <div className="w-full flex relative">
                  <div className="w-3/4">
                    <p>
                      {errorInfo && (
                        <span className="text-red-600 mt-2">{errorInfo}</span>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={togglePopup}
                    className="text-gray-400 p-2 hover:text-black absolute top-0 right-0 w-fit border border-gray-300"
                  >
                    <img src={xButtonDelete} alt="icon: x" width={15} />
                  </button>
                </div>
                {/* Reiseziel */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 pt-10">
                  <div className="relative">
                    <div className="flex">
                      <img
                        src={travelGoal}
                        alt="icon: mountain and building"
                        className="h-4"
                      />
                      <label className="text-sm font-semibold pl-2">
                        {t("search.whereTravel") || "Wohin möchtest du reisen?"}
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder={
                        t("search.enterDestination") || "Reiseziel eingeben"
                      }
                      className="w-full mt-1 border rounded px-3 py-2 hover:bg-blue-200"
                      value={myCity}
                      onChange={handleInputChange}
                      onFocus={() => setShowSuggestions(true)}
                      onKeyDown={handleKeyDown}
                      autoComplete="off"
                    />
                    {showSuggestions && suggestions.length > 0 && (
                      <ul className="absolute z-20 bg-white border border-gray-500 w-full mt-1 rounded shadow max-h-48 overflow-y-auto">
                        {suggestions.map((city, idx) => (
                          <li
                            key={city}
                            className={`px-4 py-2 cursor-pointer hover:bg-indigo-100 ${
                              idx === selectedIndex ? "bg-indigo-200" : ""
                            }`}
                            onMouseDown={() => handleSuggestionClick(city)}
                          >
                            {city}
                          </li>
                        ))}
                      </ul>
                    )}
                    {myCity && (
                      <button
                        type="button"
                        className="absolute -right-1 top-11 -translate-y-1/2 text-gray-300 cursor-pointer min-w-2"
                        onClick={() => setMyCity("")}
                        tabIndex={-1}
                        aria-label="Eingabe löschen"
                      >
                        <div className="w-10 h-10 flex justify-center">
                          <img src={xButtonDelete} alt="x-icon" width={15} />
                        </div>
                      </button>
                    )}
                  </div>

                  <div>
                    <div className="flex">
                      <img src={plane} alt="icon: plane" className="h-4" />
                      <label className="text-sm font-semibold pl-2">
                        Willst du fliegen?
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder={
                        t("search.addFlight") || "  +  Flug hinzufügen"
                      }
                      className="w-full hover:cursor-pointer mt-1 border rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <div className="flex">
                      <img
                        src={calendar}
                        alt="icon: mountain and building"
                        className="h-4 pr-2"
                      />
                      <label className="text-sm font-semibold">
                        {t("search.whenTravel") || "Wann reisen?"}
                      </label>{" "}
                    </div>
                    <div className="w-full">
                      <DatePicker
                        selectsRange
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => {
                          setDateRange(update);
                          // Fehler ausblenden, wenn beide Daten gesetzt sind
                          if (update[0] && update[1]) {
                            setErrorInfo("");
                          }
                        }}
                        className="w-full mt-1 border rounded px-3 py-2 hover:bg-blue-200 cursor-pointer"
                        wrapperClassName="w-full"
                        placeholderText={
                          t("search.selectDate") || "Datum auswählen"
                        }
                        dateFormat="dd.MM.yyyy"
                        monthsShown={2}
                        isClearable
                        selected={startDate}
                        customInput={
                          <input
                            style={{
                              width: "100%", //hier size anpassen
                              padding: "8px",
                              border: "1px solid #1f2937",
                              borderRadius: "3px",
                              outline: "none",
                              height: "40px",
                              boxSizing: "border-box",
                              fontSize: "16px",
                            }}
                          />
                        }
                      />
                    </div>
                  </div>

                  <div className="relative" ref={dropdownRef}>
                    <div>
                      <div className="w-full flex mb-2">
                        <img
                          src={persons}
                          alt="icon: group of 3 people"
                          className="h-5 pr-2"
                        />
                        <label className="text-sm font-semibold">
                          {t("search.howManyPeople") ||
                            "Wie viele Personen reisen?"}
                        </label>
                      </div>
                      <div
                        className="p-2 rounded border border-gray-800 pl-4 bg-white cursor-pointer hover:bg-blue-200"
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        {adults} {t("search.adults") || "Erwachsene"},{" "}
                        {children}
                        {t("search.children") || " Kinder (0 - 17 Jahre)"}
                      </div>
                      <AnimatePresence>
                        {showDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-15 bg-white border border-gray-500 rounded p-4 mt-2 w-full shadow-md"
                          >
                            <div className="relative mb-2 h-6">
                              <button className="absolute top-0 right-0 p-1 border-2 border-gray-500 rounded-md cursor-pointer">
                                <img
                                  src={xButtonDelete}
                                  alt="Icon X"
                                  width={10}
                                  className="flex-end"
                                  onClick={() => setShowDropdown(false)}
                                />
                              </button>
                            </div>
                            <div className="flex justify-between items-center mb-3">
                              <span>{t("search.adults") || "Erwachsene"}</span>
                              <div className="flex gap-2 items-center">
                                <button
                                  className="px-2 py-1 border rounded bg-gray-200 text-gray-700 min-w-[33%] border-transparent text-lg hover:bg-gray-200 flex items-center justify-center"
                                  onClick={() =>
                                    setAdults(Math.max(1, adults - 1))
                                  }
                                >
                                  &#45;
                                </button>
                                <span>{adults}</span>
                                <button
                                  className="px-2 py-1 border rounded bg-gray-200 text-gray-700 min-w-[33%] border-transparent font-bold text-lg hover:bg-gray-200 flex items-center justify-center"
                                  onClick={() => setAdults(adults + 1)}
                                >
                                  &#43;
                                </button>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>
                                {t("search.children") ||
                                  "Kinder (0 - 17 Jahre)"}
                              </span>
                              <div className="flex gap-2 items-center">
                                <button
                                  className="px-2 py-1 border rounded bg-gray-200 text-gray-700 min-w-[33%] border-transparent font-bold text-lg hover:bg-gray-200 flex items-center justify-center"
                                  onClick={() =>
                                    setChildren(Math.max(0, children - 1))
                                  }
                                >
                                  &#45;
                                </button>
                                <span>{children}</span>
                                <button
                                  className="px-2 py-1 border rounded bg-gray-200 text-gray-700 min-w-[33%] border-transparent font-bold text-lg hover:bg-gray-200 flex items-center justify-center"
                                  onClick={() => {
                                    setChildren(children + 1);
                                  }}
                                >
                                  &#43;
                                </button>
                              </div>
                            </div>
                            {children >= 1 && (
                              <>
                                <div className="pt-3 pb-2 w-full">
                                  <p className="pb-3 ">Alter bei Hinreise:</p>
                                  {/* Für jedes Kind ein Dropdown */}
                                  <div className="grid md:grid-cols-2 xl:grid-cols-1 gap-7">
                                    {Array.from({ length: children }).map(
                                      (_, idx) => (
                                        <div
                                          key={idx}
                                          className="mb-2 flex items-center gap-2"
                                        >
                                          <label className="flex items-center gap-2">
                                            Kind {idx + 1}
                                          </label>
                                          <select
                                            className="border rounded px-1 py-0.5"
                                            value={childrenAges[idx] || ""}
                                            onChange={(e) => {
                                              const newAges = [...childrenAges];
                                              newAges[idx] = e.target.value;
                                              setChildrenAges(newAges);
                                            }}
                                          >
                                            <option value="Alter">
                                              Alter wählen
                                            </option>
                                            {Array.from({ length: 18 }).map(
                                              (_, age) => (
                                                <option
                                                  key={age}
                                                  value={age}
                                                  className="justify-center text-center"
                                                >
                                                  {age}&#32;Jahre
                                                </option>
                                              )
                                            )}
                                          </select>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                                <div className="relative h-8">
                                  <button
                                    className="bg-blue-400 rounded absolute bottom-0 right-0 w-fit px-2 py-1"
                                    onClick={() => setShowDropdown(false)}
                                  >
                                    Angaben speichern
                                  </button>
                                </div>
                              </>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <div className="mt-6 mb-4 flex justify-between">
                  <button
                    className="bg-indigo-900 text-black px-6 py-2 rounded hover:bg-indigo-800 w-full"
                    onClick={async () => {
                      // handleSearch();
                      handleSearchClick(); // ?? name?
                      handleSearchSubmit();
                      // Only fetch hotels if there is no error, myCity is valid, and both dates are selected
                      // if (
                      //   myCity &&
                      //   validCities.includes(myCity) &&
                      //   startDate &&
                      //   endDate
                      // ) {
                      //   // getCombinedData();

                      //   togglePopup();

                      //   // Tag bei Zeitzonenverschiebung sonst falsch
                      //   const transformStartDate =
                      //     startDate instanceof Date
                      //       ? startDate.toLocaleDateString("sv-SE")
                      //       : new Date(startDate).toLocaleDateString("sv-SE");
                      //   console.log("check of startDate:", transformStartDate);

                      //   const transformEndDate =
                      //     endDate instanceof Date
                      //       ? endDate.toLocaleDateString("sv-SE")
                      //       : new Date(endDate).toLocaleDateString("sv-SE");
                      //   console.log("check of endDate:", transformEndDate);

                      //   navigate(
                      //     `/hotel-results?cityName=${encodeURIComponent(
                      //       myCity
                      //     )}&startDate=${transformStartDate}&endDate=${transformEndDate}&adults=${adults}&children=${children}`
                      //   );
                      // } else if (!startDate || !endDate) {
                      //   // setError("Bitte ein Reisedatum angeben!");
                      //   setErrorInfo("Bitte ein Reisedatum angeben!");
                      // } else if (!myCity) {
                      //   setErrorInfo("Bitte einen Städtenamen eingeben.");
                      // } else if (!validCities.includes(myCity)) {
                      //   setErrorInfo("Ungültigen Städtename gefunden!");
                      // }
                    }}
                    style={{
                      backgroundColor: "#a8d5e2",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#a2ceda";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#a8d5e2";
                    }}
                  >
                    {t("search.searchButton") || "Suchen"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Filter */}
      <main className="flex flex-col lg:flex-row p-4 gap-6 bg-gray-50 min-h-screen">
        <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-600">Filter</h2>
            <button
              // onClick={resetFilters}
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
                // value={filters.priceRange}
                // onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-300"
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
                // value={filters.stars}
                // onChange={(e) => handleFilterChange("stars", e.target.value)}
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
                // value={filters.rating}
                // onChange={(e) => handleFilterChange("rating", e.target.value)}
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
                // value={filters.district}
                // onChange={(e) => handleFilterChange("district", e.target.value)}
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
                // value={filters.breakfast}
                // onChange={(e) => handleFilterChange("breakfast", e.target.value)}
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
              <label className="block font-semibold text-gray-600 mb-2">
                Zimmertyp
              </label>
              <select
                // value={filters.roomType}
                // onChange={(e) => handleFilterChange("roomType", e.target.value)}
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
              <label className="block font-semibold text-gray-600 mb-3">
                Ausstattung
              </label>
              <div className="space-y-3">
                {[
                  {
                    key: "parking",
                    label: "Parkplatz",
                    // value: filters.parking,
                    icon: <FaCar className="text-blue-400" />,
                  },
                  {
                    key: "petFriendly",
                    label: "Haustierfreundlich",
                    // value: filters.petFriendly,
                    icon: <FaDog className="text-blue-400" />,
                  },
                  {
                    key: "businessCenter",
                    label: "Business Center",
                    // value: filters.businessCenter,
                    icon: <FaBuilding className="text-blue-400" />,
                  },
                  {
                    key: "pool",
                    label: "Pool",
                    // value: filters.pool,
                    icon: <FaSwimmingPool className="text-blue-400" />,
                  },
                  {
                    key: "wifi",
                    label: "WLAN",
                    // value: filters.wifi,
                    icon: <FaWifi className="text-blue-400" />,
                  },
                  {
                    key: "airConditioning",
                    label: "Klimaanlage",
                    // value: filters.airConditioning,
                    icon: <FaSnowflake className="text-blue-400" />,
                  },
                  {
                    key: "spa",
                    label: "Spa",
                    // value: filters.spa,
                    icon: <FaSpa className="text-blue-400" />,
                  },
                  {
                    key: "fitness",
                    label: "Fitnessstudio",
                    // value: filters.fitness,
                    icon: <FaDumbbell className="text-blue-400" />,
                  },
                ].map((filter) => (
                  <label
                    key={filter.key}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="checkbox"
                      // checked={filter.value}
                      // onChange={(e) =>
                      //   handleFilterChange(filter.key, e.target.checked)
                      // }
                      className="appearance-none w-4 h-4 border-2 border-orange-400 rounded checked:bg-blue-400 checked:border-blue-200 focus:ring-blue-500"
                    />
                    {filter.icon}
                    <span className="text-gray-600">{filter.label}</span>
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
                // value={filters.sortBy}
                // onChange={(e) => handleFilterChange("sortBy", e.target.value)}
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

        <section className="w-full lg:w-3/4">
          {/* pl-6 pr-6 pb-6 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {/* pl-5 pb-2 mb-3 */}
            <h1 className="text-3xl font-bold text-gray-600 mb-2 ">
              {/* pb-2 pt-2 */}
              Gefundene Hotels
            </h1>{" "}
            <div className="text-gray-600">
              {loading ? (
                <div className="flex items-center gap-2 text-blue-600 text-lg mb-4">
                  <FaSpinner className="animate-spin" />
                  Hotels werden geladen...
                </div>
              ) : (
                `${hotels.length} Angebote für Hotels in
              ${myCity || lastSearches[0]?.to} verfügbar`
              )}
            </div>
          </div>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          {/* SKELETONS BEI LADEN */}
          {loading && (
            <>
              <SkeletonHotelCard />
              <SkeletonHotelCard />
              <SkeletonHotelCard />
            </>
          )}{" "}
          <section className="grid gap-6">
            {hotels.map((hotel, index) => {
              // Wishlist-Check
              const wishlist = JSON.parse(
                localStorage.getItem("wishlist") || "[]"
              );
              const offerId = hotel.offers?.[0]?.id;
              const isWishlisted = wishlist.some(
                (item) => item.offers?.[0]?.id === offerId
              );

              return (
                <motion.div
                  key={hotel.hotel.dupeId || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="w-full relative md:w-[320px] h-[250px] md:h-[220px] overflow-hidden rounded-lg ml-4 mt-4">
                    <div className="flex absolute top-2 right-2 z-10">
                      <button
                        className="justify-center items-center p-2"
                        onClick={() => {
                          // Hotel zur Wishlist im localStorage hinzufügen/entfernen
                          const wishlist = JSON.parse(
                            localStorage.getItem("wishlist") || "[]"
                          );
                          const offerId = hotel.offers?.[0]?.id;
                          const alreadyExists = wishlist.some(
                            (item) => item.offers?.[0]?.id === offerId
                          );
                          let newWishlist;
                          if (!alreadyExists) {
                            newWishlist = [...wishlist, hotel];
                          } else {
                            newWishlist = wishlist.filter(
                              (item) => item.offers?.[0]?.id !== offerId
                            );
                          }
                          localStorage.setItem(
                            "wishlist",
                            JSON.stringify(newWishlist)
                          );
                          setHotels((prevHotels) => [...prevHotels]);
                        }}
                      >
                        <img
                          src={
                            isWishlisted
                              ? wishlistHeartFull
                              : wishlistHeartEmpty
                          }
                          alt="icon: heart"
                          className="h-6 w-6"
                        />
                      </button>
                    </div>
                    <img
                      src={gptExample}
                      alt="gpt-example-picture"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-8 flex flex-1 justify-between ml-4">
                    <div>
                      <div className="flex flex-wrap items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-700 w-2/3">
                          {hotel.hotel.name
                            .toLowerCase()
                            .replace(/\b\w/g, (char) => char.toUpperCase())}
                        </h3>

                        <div className="flex items-center">
                          <p>Sternebewertung</p>
                          {/*  {[...Array(hotel.stars)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 text-lg" />
                          ))}
                          </div>
                    */}
                        </div>
                        <p className="text-gray-600 mb-1 flex w-full items-center">
                          <FaMapMarkerAlt className="text-red-500 mr-2" />
                          {
                            // Finde den passenden Stadtnamen zum CityCode
                            findCityByCode(hotel.hotel.cityCode) ||
                              lastSearches[0].to
                          }
                          &#44;{" "}
                          {
                            // Finde den passenden Ländernamen zum CityCode
                            findCountryByCode(hotel.hotel.cityCode)
                          }{" "}
                        </p>
                        <p className="text-blue-400 font-semibold mb-2 flex w-full items-center">
                          <FaThumbsUp className="text-blue-400 mr-2" />
                          {/* Bewertungen */}
                          <span className="p-1">"95%"</span>
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

                        {/* Anzahl + Erwachsene(r) */}
                        {/* Kinder und Erwachsene zusammen als Personen zählen */}
                        <div className="w-full flex">
                          <div className="text-sm text-gray-500 mb-3 flex">
                            <img
                              src={persons}
                              alt="icon:group of 3 people"
                              width={22}
                            />
                            <p className="pl-2">
                              {hotel.offers[0].guests.adults}{" "}
                              {hotel.offers[0].guests.adults > 1
                                ? "Personen"
                                : "Person"}
                            </p>
                          </div>
                        </div>
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
                          {/* passender Wert aus hotelRooms basierend auf category */}
                          {hotelRooms[
                            hotel.offers[0].roomEstimated?.category
                          ] || hotelRooms.STANDARD_ROOM}

                          <FaUtensils className="text-gray-500 mx-2" />
                          {hotel.offers[0].boardType?.toLowerCase() ==
                          "breakfast"
                            ? "Frühstück inklusive"
                            : "Frühstück mit Aufpreis"}
                        </p>
                        <div className="flex w-full justify-end">
                          <div className="text-2xl flex font-bold text-blue-600">
                            <p className="self-end">
                              Preis ab:{" "}
                              {hotel.offers[0].price.total
                                ? hotel.offers[0].price.total.replace(".", ",")
                                : ""}{" "}
                              {hotel.offers[0]?.price.currency.replace(
                                "EUR",
                                "€"
                              )}
                            </p>{" "}
                          </div>

                          <button
                            className="mt-2 px-6 py-2 ml-4 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition-colors font-medium shadow-md hover:shadow-lg"
                            onClick={() =>
                              navigate(`/hotel-details/${hotel.hotel.dupeId}`)
                            }
                          >
                            Buchen
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </section>
        </section>
      </main>
    </div>
  );
};
export default HotelResultsPage;
