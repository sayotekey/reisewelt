import { useState } from "react";
import axios from "axios";

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sende die Anfrage zum Ändern des Passworts
      const res = await axios.post(
        "/api/user/change-password",
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
      <h2 className="text-xl font-semibold">Ändern Sie Ihr Passwort</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block">Altes Passwort</label>
          <input
            type="password"
            className="border px-2 py-1 w-full"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block">Neues Passwort</label>
          <input
            type="password"
            className="border px-2 py-1 w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Passwort ändern
        </button>
        {message && <p className="text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
};

export default ChangePasswordForm;
