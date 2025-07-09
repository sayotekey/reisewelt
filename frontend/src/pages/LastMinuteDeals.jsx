import React from "react";

const LastMinuteDeals = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Last-Minute Deals
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Liste toller Last Minute Deals - Entdecken Sie unsere besten Angebote!
          </p>
          <div className="bg-orange-100 border border-orange-200 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-orange-800 mb-4">
               Traumhafte Angebote warten auf Sie!
            </h2>
            <p className="text-orange-700">
              Hier finden Sie bald unsere besten Last-Minute-Angebote für spontane Reisen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastMinuteDeals;
