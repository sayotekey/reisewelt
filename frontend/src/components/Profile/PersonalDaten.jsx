import { useState, useEffect } from "react";
import axios from "axios";

const PersonalDaten = ({ user, onUserUpdate }) => {
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
    // console.log("Speichern der Daten:", { name, email });

    try {
      setLoading(true);
      const response = await axios.patch(
        "http://localhost:3000/api/users/profile",
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (onUserUpdate) {
        onUserUpdate(response.data); // Callback to update user data in parent component
      }

      setIsEditing(false); // Schließe den Bearbeitungsmodus ab
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    } finally {
      setLoading(false);
    }
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
          <p className="personal-data shadow-md">
            <strong className="ersonal-data">Name</strong> {user.name}
          </p>
          <p className="personal-data shadow-md">
            <strong>Email</strong> {user.email}
          </p>
          <p className="personal-data shadow-md">
            <strong>Registriert am</strong>
            {new Date(user.createdAt).toLocaleDateString()}
          </p>

          {/*Bearbeiten Button*/}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 rounded-md"
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
              name="name"
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-gray-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium"> Email</label>
            <input
              type="email"
              value={email}
              name="email"
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
