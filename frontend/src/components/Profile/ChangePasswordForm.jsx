import { useState } from "react";
import axios from "axios";
import { validatePasswordChange } from "../../utils/validatePasswordChange";

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, errors } = validatePasswordChange({
      oldPassword,
      newPassword,
    });

    if (!isValid) {
      setMessage(Object.values(errors).join(" "));
      return;
    }

    try {
      // Sende die Anfrage zum Ändern des Passworts
      const res = await axios.post(
        "/api/users/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage(res.data.message || "Passwort erfolgreich geändert!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      setMessage("Fehler beim Ändern des Passworts.");
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Ändern Sie Ihr Passwort</h2>
      <form onSubmit={handleSubmit} className="border p-4 space-y-4 change-password-form rounded-md shadow-2xl w-3/4">
        <div>
          <label className="block mb-2">Altes Passwort</label>
          <div className="flex items-center border-2 border-gray-300 rounded-xl px-3 py-2 w-full">
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
              type={showPassword ? "text" : "password"}
              className="w-full outline-none text-left text-black"
              value={oldPassword}
              placeholder="Passwort"
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 pl-2 pr-2 pb-1 pt-1 bg-white border-2 border-gray-300 rounded-md text-gray-500 focus:outline-none"
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
        </div>

        <div>
          <label className="block mb-2">Neues Passwort</label>
          <div className="flex items-center border-2 border-gray-300 rounded-xl px-3 py-2 w-full">
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
              type={showPassword ? "text" : "password"}
              className="w-full outline-none text-left text-black"
              value={newPassword}
              placeholder="Passwort"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 pl-2 pr-2 pb-1 pt-1 bg-white border-2 border-gray-300 rounded-md text-gray-500 focus:outline-none"
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
        </div>
        <button
          type="submit"
          className=" px-4 py-2 rounded-md mt-2"
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
          Passwort ändern
        </button>
        {message && <p className="text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
};

export default ChangePasswordForm;
