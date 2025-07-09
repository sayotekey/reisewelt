import React from "react";

const Imprint = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Impressum</h1>
            <p className="text-lg text-gray-600 mb-8">
              Diese Seite befindet sich in der Entwicklung
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Was gehört ins Impressum?
            </h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li>• Vollständiger Name und Anschrift des Unternehmens</li>
              <li>• Rechtsform und Vertretungsberechtigte</li>
              <li>• Kontaktdaten (Telefon, E-Mail)</li>
              <li>• Handelsregistereintrag und Registernummer</li>
              <li>• Umsatzsteuer-Identifikationsnummer</li>
              <li>• Zuständige Aufsichtsbehörde</li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              In der finalen Version wird hier das vollständige Impressum gemäß
              § 5 TMG (Telemediengesetz) stehen.
            </p>

            <button
              onClick={() => window.history.back()}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md transition-colors duration-300"
            >
              Zurück zur Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Imprint;
