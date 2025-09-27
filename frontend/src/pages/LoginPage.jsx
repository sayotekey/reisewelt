import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useTheme } from "../context/ThemeContext";
import validateRegisterPassword from "../utils/validateRegisterPassword";
import axios from "axios";

const LoginPage = () => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validierung der Eingaben
    const { isValid, errors: validationErrors } = validateRegisterPassword(
      { email, password },
      "login"
    );

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Senden die Anfrage an die Backend-API zum Einloggen
      const response = await axios.post(
        // "http://localhost:3000/api/users/login",
        `${import.meta.env.VITE_BACKEND_API_URL}api/users/login`,
        {
          email,
          password,
        }
      );

      // Warten auf die Antwort und speichern das Token und den Benutzer im Local Storage
      const { token, user } = response.data;

      login(user, token); // Aktualisieren des Auth-Kontexts mit dem Benutzer
      console.log("Login response:", response.data);

      // alert("Login erfolgreich!");
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Serverfehler";
      setErrors({ loginError: message });
    }
  };

  return (
    <div
      className="h-screen flex"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-color)",
      }}
    >
      {/* die linke Hälfte mit der Begrüßung */}
      <div
        className="hidden lg:flex w-full lg:w-1/2 login_img_section justify-around items-center"
        style={{
          backgroundColor: isDark ? "var(--bg-secondary)" : "transparent",
        }}
      >
        <div
          className="bg-black opacity-20 inset-0 z-0"
          style={{
            backgroundColor: isDark
              ? "rgba(0, 0, 0, 0.4)"
              : "rgba(0, 0, 0, 0.2)",
          }}
        ></div>
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1
            className="font-bold text-4xl font-sans"
            style={{ color: "var(--text-color)" }}
          >
            Herzlich willkommen bei ReiseWelt
          </h1>
          <p className="mt-1" style={{ color: "var(--text-color)" }}>
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
      <div
        className="flex w-full lg:w-1/2 justify-center items-center space-y-8"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form
            className="rounded-md shadow-2xl p-5 text-left"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-color)",
            }}
            onSubmit={handleSubmit}
          >
            <h2
              className="text-2xl font-bold text-center mb-8"
              style={{ color: "var(--text-color)" }}
            >
              Anmelden
            </h2>

            {/* Eingabefelder für E-Mail */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="email"
                className="mb-2"
                style={{ color: "var(--text-color)" }}
              >
                Email
              </label>
              <div
                className="flex items-center border-2 rounded-xl px-3 py-2 focus-within:ring-1"
                style={{
                  borderColor: isDark ? "var(--border-color)" : "#d1d5db",
                  backgroundColor: "var(--bg-primary)",
                  focusWithin: {
                    borderColor: "var(--accent-color)",
                    ringColor: "var(--accent-color)",
                  },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  style={{ color: isDark ? "var(--text-color)" : "#9ca3af" }}
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
                  className="w-full outline-none text-left"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--text-color)",
                  }}
                  type="email"
                  name="email"
                  placeholder="Email Adresse"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Eingabefeld für Passwort */}
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="password"
                  className="mb-2 mt-2"
                  style={{ color: "var(--text-color)" }}
                >
                  Passwort
                </label>
                <div
                  className="flex items-center border-2 rounded-xl px-3 py-2 focus-within:ring-1"
                  style={{
                    borderColor: isDark ? "var(--border-color)" : "#d1d5db",
                    backgroundColor: "var(--bg-primary)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    style={{ color: isDark ? "var(--text-color)" : "#9ca3af" }}
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
                    className="w-full outline-none text-left"
                    style={{
                      backgroundColor: "transparent",
                      color: "var(--text-color)",
                    }}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 pl-2 pr-2 pb-1 pt-1 border-2 rounded-md focus:outline-none"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: isDark ? "var(--border-color)" : "#d1d5db",
                      color: isDark ? "var(--text-color)" : "#6b7280",
                    }}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.loginError && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.loginError}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg font-bold py-2"
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
              Login
            </button>
            <div className="flex justify-between mt-4">
              <a
                href="/forgot-password"
                className="text-sm ml-2 mt-3 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                style={{
                  color: "var(--text-color)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "var(--accent-color)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "var(--text-color)";
                }}
              >
                Password vergessen?
              </a>

              <a
                href="/register"
                className="text-sm ml-2 mt-3 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
                style={{
                  color: "var(--text-color)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "var(--accent-color)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "var(--text-color)";
                }}
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
