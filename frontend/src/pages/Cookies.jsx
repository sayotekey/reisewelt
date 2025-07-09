import React from "react";

const Cookies = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Cookie-Richtlinien
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Diese Seite befindet sich in der Entwicklung
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Was gehört in die Cookie-Richtlinien?
            </h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li>• Erklärung was Cookies sind</li>
              <li>• Welche Arten von Cookies verwendet werden</li>
              <li>• Zweck der Cookie-Nutzung</li>
              <li>• Speicherdauer der Cookies</li>
              <li>• Opt-out Möglichkeiten</li>
              <li>• Einstellungen für Cookie-Präferenzen</li>
              <li>• Drittanbieter-Cookies (Analytics, etc.)</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm">
              <strong>EU Cookie-Gesetz:</strong> Seit 2021 müssen Nutzer
              explizit in die Verwendung von Cookies einwilligen (außer
              technisch notwendige).
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              In der finalen Version wird hier ein Cookie-Banner und
              detaillierte Cookie-Einstellungen implementiert.
            </p>

            <button
              onClick={() => window.history.back()}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md transition-colors duration-300"
            >
              Zurück zur Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
