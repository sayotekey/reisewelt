import React from "react";
import { useNavigate } from "react-router-dom";

import beachFivehundredDeals from "../images/beach-fivehundred-deals.jpg";
import LuggageLastMinute from "../images/luggage-last-minute.jpg";

const LastMinuteComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="my-10 ">
      <h2 className=" px-7 text-left text-2xl mt-10">
        Jetzt buchen und bis zu 50% sparen!
      </h2>
      <div className="flex">
        <div className="py-10">
          <div className="relative">
            <img
              src={LuggageLastMinute}
              alt="Reisekoffer mit Aufklebern"
              className="w-auto px-7"
            />
            <h3 className="absolute left-16 top-10 text-black text-2xl">
              Super Last Minute
            </h3>
            <button
              className="absolute right-16 bottom-5 bg-gray-800 rounded px-2 py-2 cursor-pointer"
              onClick={() => navigate("/lastminute-deals")} // = case sensitiv - lieber lowercase
            >
              Jetzt entdecken
            </button>
          </div>
        </div>
        <div className="py-10">
          <div className="relative">
            <img
              src={beachFivehundredDeals}
              alt="Strand und Meer mit Badeschuhen und Hut"
              className="w-auto px-7"
            />
            <h3 className="absolute left-16 top-10 text-black text-2xl">
              Urlaub unter 500€
            </h3>
            <button
              className="absolute right-16 bottom-5  bg-gray-800 rounded px-2 py-2 cursor-pointer"
              onClick={() => navigate("/fivehundredeuro-deals")} // = case sensitiv - lieber lowercase
            >
              Jetzt entdecken
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastMinuteComponent;
