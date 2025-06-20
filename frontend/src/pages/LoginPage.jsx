import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // (Backend API call would go here)
    console.log("Email:", email);
    console.log("Password:", password);
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
          <h1 className="text-white font-bold text-4xl font-sans">
            Herzlich willkommen bei ReiseWelt
          </h1>
          <p className="text-white mt-1">
            Hier finden Sie Ihr persönliches Kundenkonto. Einfach registrieren
            oder einloggen - und los geht's! Verwalten Sie Ihre Buchungen,
            persönliche Daten und mehr - alles übersichtlich an einem Ort.
            <br />
            <br />
            Planen. Buchen. Träumen. - Alles an einem Ort.
          </p>
        </div>
      </div>

      {/* die rechte Hälfte mit dem Anmeldeformular*/}
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form
            className="bg-white rounded-md shadow-2xl p-5 text-left"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">
              Anmelden
            </h2>

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="password" className="text-gray-700 mb-2 mt-2">
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full bg-indigo-600 rounded-xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold py-2"
            >
              Login
            </button>
            <div className="flex justify-between mt-4 ">
              <a
                href="#"
                className="text-sm ml-2 mt-3 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                Password vergessen?
              </a>

              <a
                href="/register"
                className="text-sm ml-2 mt-3 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                Kundenkonto erstellen
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
