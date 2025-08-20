import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";

const PersonalDaten = ({ user, onUserUpdate }) => {
  const { isDark } = useTheme();
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
        // "http://localhost:3000/api/users/profile",
        `${import.meta.env.VITE_BACKEND_API_URL}api/users/profile`,
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
      <h2
        className="text-xl font-semibold"
        style={{ color: "var(--text-color)" }}
      >
        Persönliche Daten
      </h2>

      {!isEditing ? (
        <div className="space-y-2">
          <p
            className="personal-data shadow-md p-3 rounded-lg"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-color)",
              border: `1px solid ${isDark ? "var(--border-color)" : "#e5e7eb"}`,
            }}
          >
            <strong
              className="block mb-1"
              style={{ color: "var(--text-color)" }}
            >
              Name
            </strong>
            {user.name}
          </p>
          <p
            className="personal-data shadow-md p-3 rounded-lg"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-color)",
              border: `1px solid ${isDark ? "var(--border-color)" : "#e5e7eb"}`,
            }}
          >
            <strong
              className="block mb-1"
              style={{ color: "var(--text-color)" }}
            >
              Email
            </strong>
            {user.email}
          </p>
          <p
            className="personal-data shadow-md p-3 rounded-lg"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-color)",
              border: `1px solid ${isDark ? "var(--border-color)" : "#e5e7eb"}`,
            }}
          >
            <strong
              className="block mb-1"
              style={{ color: "var(--text-color)" }}
            >
              Registriert am
            </strong>
            {new Date(user.createdAt).toLocaleDateString()}
          </p>

          {/*Bearbeiten Button*/}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 rounded-md transition-all duration-200"
            style={{
              backgroundColor: "var(--accent-color)",
              color: "white",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "var(--accent-hover)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "var(--accent-color)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Bearbeiten
          </button>
        </div>
      ) : (
        // Wenn im Bearbeitungsmodus
        <div className="space-y-4">
          <div>
            <label
              className="block mb-2 font-medium"
              style={{ color: "var(--text-color)" }}
            >
              Name
            </label>
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-lg px-3 py-2 transition-all duration-200"
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-color)",
                border: `2px solid ${
                  isDark ? "var(--border-color)" : "#d1d5db"
                }`,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent-color)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = isDark
                  ? "var(--border-color)"
                  : "#d1d5db";
              }}
            />
          </div>

          <div>
            <label
              className="block mb-2 font-medium"
              style={{ color: "var(--text-color)" }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg px-3 py-2 transition-all duration-200"
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-color)",
                border: `2px solid ${
                  isDark ? "var(--border-color)" : "#d1d5db"
                }`,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent-color)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = isDark
                  ? "var(--border-color)"
                  : "#d1d5db";
              }}
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSaveClick}
              disabled={loading}
              className="flex-1 px-4 py-2 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: loading ? "#9ca3af" : "var(--accent-color)",
                color: "white",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = "var(--accent-hover)";
                  e.target.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = "var(--accent-color)";
                  e.target.style.transform = "translateY(0)";
                }
              }}
            >
              {loading ? "Speichern..." : "Speichern"}
            </button>
            <button
              onClick={handleCancelClick}
              className="px-4 py-2 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: isDark ? "#6b7280" : "#9ca3af",
                color: "white",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = isDark ? "#4b5563" : "#6b7280";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = isDark ? "#6b7280" : "#9ca3af";
                e.target.style.transform = "translateY(0)";
              }}
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
