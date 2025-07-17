import React from "react";
import persons from "../icons/people-group-solid-black.svg";
// import plane from "../icons/plane-solid-black.svg";
import travelGoal from "../icons/mountain-city-solid-black.svg";
import calendar from "../icons/calendar-days-solid-black.svg";
// import pencil from "../icons/pencil-solid-black.svg";
import pencil2 from "../icons/pencil-solid-white.svg";

const MiniSearchbar = () => {
  // const [myUuid, setMyUuid] = useState(null);

  return (
    <>
      <div className="bg-white border border-orange-500 rounded px-4 py-4 flex items-center space-x-4 w-fit shadow-sm">
        {/* Ort */}
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 text-blue-900">
            <img src={travelGoal} alt="icon: mountain and building" />
          </div>
          <span className="font-semibold text-blue-900">Kreta</span>
        </div>

        {/* Datum */}
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 text-blue-900">
            <img src={calendar} alt="icon: calendar" />
          </div>
          <span className="text-blue-900 text-sm">05.10.2025 – 12.10.2025</span>
        </div>

        {/* Personen */}
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 text-blue-900">
            <img src={persons} alt="" />
          </div>
          <span className="text-blue-900 text-sm">2 Erwachsene</span>
        </div>

        {/* Bearbeiten-Button */}
        <button
          className="ml-2 w-fit pr-2 pl-2 h-6 rounded-md bg-orange-500 flex items-center justify-center"
          // onClick={handleEdit}
        >
          <div className="w-full flex h-4 gap-2">
            <p className="text-white">bearbeiten</p>
            <img src={pencil2} alt="icon: pencil" width={30} />
          </div>
        </button>
      </div>
    </>
  );
};

export default MiniSearchbar;
