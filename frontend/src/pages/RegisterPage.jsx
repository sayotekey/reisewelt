import { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // Handler für Formularänderungen
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Aktualisiere nur das Feld, das geändert wurde
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validierung der Eingaben
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Bitte füllen Sie alle Felder aus.");
      return;
    }

    // Überprüfen, ob die Passwörter übereinstimmen
    if (formData.password !== formData.confirmPassword) {
      setError("Die Passwörter stimmen nicht überein.");
      return;
    }

    setError(""); // Setze den Fehler zurück, wenn alles in Ordnung ist

    // Vorbereiten der Datenübertragung (Backend würde hier erfolgen)
    console.log("Formulardaten:", formData);

    // Lösche die Formulardaten nach dem Senden
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="h-screen flex">
      {/* die linke Hälfte mit der Begrüßung */}
      <div
        className="hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around items-center"
      >
        <div
          className=" 
                  bg-black 
                  opacity-20 
                  inset-0 
                  z-0"
        ></div>
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 className="text-white font-bold text-2xl font-sans">
            Herzlich willkommen bei ReiseWelt
          </h1>
          <p className="text-white mt-1">
            Hier finden Sie Ihr persönliches Kundenkonto. Einfach registrieren
            oder einloggen - und los geht#s! Verwalten Sie Ihre Buchungen,
            persönliche Daten und mehr - alles übersichtlich an einem Ort.
            <br />
            <br />
            Planen. Buchen. Träumen. - Alles an einem Ort.
          </p>
        </div>
      </div>

      {/* die rechte Hälfte mit dem Kundenkonto-Anmeldeformular*/}
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form
            className="bg-white rounded-md shadow-2xl p-5 text-left"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">
              Kundenkonto anlegen
            </h2>

            {/* Fehleranzeige, falls vorhanden */}
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="text-gray-700 mb-2">
                Vorname
              </label>
              <div className="flex items-center border-2 border-gray-300 rounded-xl px-3 py-2 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-400 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>

                <input
                  id="name"
                  className="w-full outline-none text-left text-black"
                  type="text"
                  name="name"
                  placeholder="Ihr Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col mb-4 ">
              <label htmlFor="email" className="text-gray-700 mb-2">
                Email
              </label>
              <div className="flex items-center border-2 border-gray-300 rounded-xl px-3 py-2 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  id="email"
                  className="w-full outline-none text-left text-black"
                  type="email"
                  name="email"
                  placeholder="Email Adresse"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="text-gray-700 mb-2">
                Passwort
              </label>
              <div className="flex items-center border-2 border-gray-300 rounded-xl px-3 py-2 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  id="password"
                  className="w-full outline-none text-left text-black"
                  type="password"
                  name="password"
                  placeholder="Passwort"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="text-gray-700 mb-2">
                Passwort wiederholen
              </label>
              <div className="flex items-center border-2 border-gray-300 rounded-xl px-3 py-2 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  id="confirmPassword"
                  className="w-full outline-none text-left text-black"
                  type="password"
                  name="confirmPassword"
                  placeholder="Passwort bestätigen"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="block w-full bg-indigo-600 rounded-xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold py-2 mt-10"
            >
              Konto erstellen
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
