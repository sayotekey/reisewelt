import React from "react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Allgemeine Geschäftsbedingungen (AGB)
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Diese Seite befindet sich in der Entwicklung
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Was gehört in die AGB?
            </h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li>• Geltungsbereich und Vertragspartner</li>
              <li>• Buchungsablauf und Vertragsschluss</li>
              <li>• Preise und Zahlungsbedingungen</li>
              <li>• Stornierung und Rücktritt</li>
              <li>• Reisebedingungen und Haftung</li>
              <li>• Gewährleistung und Beschwerden</li>
              <li>• Datenschutz und Gerichtsstand</li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              In der finalen Version werden hier die vollständigen
              Geschäftsbedingungen für Reisebuchungen stehen.
            </p>

            <button
              onClick={() => window.history.back()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors duration-300"
            >
              Zurück zur Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
