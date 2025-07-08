import React from "react";

const FivehundredEuroDeals = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Urlaub für unter 500€!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Traumreisen zu unschlagbaren Preisen - Ihr perfekter Urlaub für weniger als 500€
          </p>
          <div className="bg-green-100 border border-green-200 rounded-lg p-8 ">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">
               Sparen Sie bei Ihrer nächsten Reise!
            </h2>
            <p className="text-green-700">
              Entdecken Sie unsere exklusiven Angebote für Reisen unter 500€. 
              Qualität muss nicht teuer sein!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FivehundredEuroDeals;
