import { useState, useEffect } from "react";
import axios from "axios";

const PersonalDaten = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSaveClick = async () => {
    // Backend

    console.log("Speichern der Daten:", { name, email });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
    setIsEditing(false);
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Persönliche Daten</h2>

      {!isEditing ? (
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Registriert am:</strong>
            {new Date(user.createdAt).toLocaleDateString()}
          </p>

          {/*Bearbeiten Button*/}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-blue-500"
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
            Bearbeiten
          </button>
        </div>
      ) : (
        // Wenn im Bearbeitungsmodus
        <div className="space-y-2">
          <div>
            <label className="block mb-1 font-medium"> Name</label>
            <input
              type="text"
              value={name}
              name={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-gray-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium"> Email</label>
            <input
              type="email"
              value={email}
              name={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-gray-500"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSaveClick}
              disabled={loading}
              className="w-full px-4 py-2"
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
              Speichern
            </button>
            <button
              onClick={handleCancelClick}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-300 transition"
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PersonalDaten;
