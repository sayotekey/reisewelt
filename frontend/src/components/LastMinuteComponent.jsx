import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../locales/index.js";
import beachFivehundredDeals from "../images/beach-fivehundred-deals.jpg";
import LuggageLastMinute from "../images/luggage-last-minute.jpg";

const LastMinuteComponent = () => {
  const navigate = useNavigate();
  const { t } = useTranslate();

  return (
    <div className="my-12 px-4 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-5 text-left text-gray-600">
        {t("lastMinute.title") || "Jetzt buchen und bis zu 50% sparen!"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1 */}
        <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group cursor-pointer bg-white">
          <img
            src={LuggageLastMinute}
            alt="Reisekoffer mit Aufklebern"
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
          <div className="absolute left-8 top-8">
            <h3 className="text-white text-2xl font-semibold drop-shadow">
              {t("lastMinute.superLastMinute") || "Super Last Minute"}
            </h3>
          </div>
          <button
            className="absolute right-8 bottom-8 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-lg px-5 py-3 shadow-lg transition-all duration-200"
            onClick={() => navigate("/lastminute-deals")}
          >
            {t("lastMinute.discoverNow") || "Jetzt entdecken"}
          </button>
        </div>
        {/* Card 2 */}
        <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group cursor-pointer bg-white">
          <img
            src={beachFivehundredDeals}
            alt="Strand und Meer mit Badeschuhen und Hut"
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
          <div className="absolute left-8 top-8">
            <h3 className="text-white text-2xl font-semibold drop-shadow">
              {t("lastMinute.vacationUnder500") || "Urlaub unter 500€"}
            </h3>
          </div>
          <button
            className="absolute right-8 bottom-8 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg px-5 py-3 shadow-lg transition-all duration-200"
            onClick={() => navigate("/fivehundredeuro-deals")}
          >
            {t("lastMinute.discoverNow") || "Jetzt entdecken"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LastMinuteComponent;
