import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PersonalDaten from "../components/Profile/PersonalDaten";
import FavoriteHotels from "../components/Profile/FavoriteHotels";
import MyBookings from "../components/Profile/MyBookings";
import MyReviews from "../components/Profile/MyReviews";
import ChangePasswordForm from "../components/Profile/ChangePasswordForm";
import { useAuth } from "../context/useAuth.js";
import { useTheme } from "../context/ThemeContext";
import { logoutButton } from "../utils/logout.js";

const ProfilePage = () => {
  const { isDark } = useTheme();
  const [localUser, setLocalUser] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutButton(logout, navigate);
  };

  //Laden der Benutzerdaten beim Laden der Komponente
  const loadUser = async () => {
    try {
      const res = await axios.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log("User data:", res.data);

      setLocalUser(res.data);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  // Abfrage der Benutzerdaten beim Laden der Seite
  useEffect(() => {
    loadUser();
  }, []);

  if (!localUser)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-color)",
        }}
      >
        Loading...
      </div>
    );

  const tabs = [
    {
      id: "personal",
      label: "Persönliche Daten",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      ),
    },
    {
      id: "favorites",
      label: "Merkzettel",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      ),
    },
    {
      id: "bookings",
      label: "Buchungen",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
          />
        </svg>
      ),
    },
    {
      id: "reviews",
      label: "Bewertungen",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      ),
    },
    {
      id: "password",
      label: "Passwort ändern",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      ),
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <PersonalDaten
            user={localUser}
            onUserUpdate={(updatedUser) => setLocalUser(updatedUser)}
          />
        );
      case "password":
        return <ChangePasswordForm user={localUser} />;
      case "favorites":
        return <FavoriteHotels user={localUser} onUpdate={loadUser} />;
      case "bookings":
        return <MyBookings user={localUser} />;
      case "reviews":
        return <MyReviews user={localUser} onUpdate={loadUser} />;
      case "logout":
        logout();
        return null;
      default:
        return <div>Tab nicht gefunden</div>;
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-row overflow-hidden mt-18"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Linkes Menü - Tabs für die Navigation */}
      <div
        className="flex flex-col w-70 border-r shadow-lg"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: isDark ? "var(--border-color)" : "#d1d5db",
        }}
      >
        <div
          className="flex items-center justify-center h-20 shadow-md"
          style={{ backgroundColor: "var(--bg-secondary)" }}
        >
          <h1 className="text-xl" style={{ color: "var(--text-color)" }}>
            Benutzerkonto
          </h1>
        </div>
        <ul className="flex flex-col py-4">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-row items-center w-full h-12 px-4 transform transition-all duration-200 ease-in`}
                style={
                  activeTab === tab.id
                    ? {
                        backgroundColor: "var(--accent-color)",
                        color: "white",
                      }
                    : {
                        backgroundColor: "transparent",
                        color: isDark ? "var(--text-color)" : "#6b7280",
                      }
                }
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.backgroundColor = isDark
                      ? "var(--bg-primary)"
                      : "#f3f4f6";
                    e.target.style.transform = "translateX(8px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.transform = "translateX(0)";
                  }
                }}
              >
                <span
                  className="inline-flex items-center justify-center h-12 w-12 text-lg"
                  style={{
                    color:
                      activeTab === tab.id
                        ? "white"
                        : isDark
                        ? "var(--text-color)"
                        : "#9ca3af",
                  }}
                >
                  {tab.icon}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{
                    color: activeTab === tab.id ? "white" : "var(--text-color)",
                  }}
                >
                  {tab.label}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
{/*         <div className="mt-auto p-4">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 flex items-center justify-center rounded-xl transition-all duration-500"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
            Logout
          </button>
        </div> */}
      </div>

      {/* Rechter Bereich - Inhalt basierend auf dem aktiven Tab */}
      <div
        className="flex-1 pt-10 p-30"
        style={{
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-color)",
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfilePage;
