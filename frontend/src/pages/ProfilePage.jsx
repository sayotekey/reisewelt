import { useEffect, useState } from "react";
import axios from "axios";
import PersonalDaten from "../components/Profile/PersonalDaten";
import FavoriteHotels from "../components/Profile/FavoriteHotels";
import MyBookings from "../components/Profile/MyBookings";
import MyReviews from "../components/Profile/MyReviews";
import ChangePasswordForm from "../components/Profile/ChangePasswordForm";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");

  //Laden der Benutzerdaten beim Laden der Komponente
  const loadUser = async () => {
    try {
      const res = await axios.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(res.data);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  // Abfrage der Benutzerdaten beim Laden der Seite
  useEffect(() => {
    loadUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  const tabs = [
    { id: "personal", label: "Persönliche Daten" },
    { id: "password", label: "Passwort ändern" },
    { id: "favorites", label: "Merkzettel" },
    { id: "bookings", label: "Buchungen" },
    { id: "reviews", label: "Bewertungen" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold">Benutzerkonto</h1>
      <div className="p-6 max-w-4xl mx-auto flex gap-6">
        {/* Linkes Menü - Tabs für die Navigation */}

        <nav className="w-48 border-r">
          <ul className="space-y-3">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-2 rounded  ${
                    activeTab === tab.id
                      ? "bg-gray-200 text-black"
                      : "hover:bg-gray-100 "
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Rechter Bereich - Inhalt basierend auf dem aktiven Tab */}
        <section className="flex-1">
          {activeTab === "personal" && <PersonalDaten user={user} />}
          {activeTab === "password" && <ChangePasswordForm user={user} />}
          {activeTab === "favorites" && (
            <FavoriteHotels user={user} onUpdate={loadUser} />
          )}
          {activeTab === "bookings" && <MyBookings user={user} />}
          {activeTab === "reviews" && (
            <MyReviews user={user} onUpdate={loadUser} />
          )}
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
