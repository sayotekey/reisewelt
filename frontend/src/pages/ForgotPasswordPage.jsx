import { useState } from "react";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/users/forgot-password", {
        email,
      });

      setMessage(
        "Ein Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail-Adresse gesendet."
      );
      setError("");
    } catch (error) {
      setError(
        error.response?.data?.message || "Fehler beim Senden der E-Mail."
      );
    }
  };

  return (
    <div className="flex h-screen w-full lg:w-full justify-center items-start pt-50 bg-white space-y-8">
      <div className="w-full px-8 md:px-32 lg:px-24">
        <form
          className="bg-white rounded-md shadow-2xl p-5 text-left w-2/3 mx-auto"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">
            Passwort vergessen
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
          </div>
          <button
            type="submit"
            className="block w-1/2 mx-auto bg-black rounded-xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold py-2"
          >
            Zurücksetzen-Link senden
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
