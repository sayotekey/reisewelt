import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Datenschutzerklärung
          </h1>

          <div className="prose max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1. Verantwortlicher
              </h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              </p>
              <div className="bg-gray-100 p-4 rounded-md mt-2">
                <p>
                  <strong>Reisewelt GmbH</strong>
                </p>
                <p>Musterstraße 123</p>
                <p>20095 Hamburg, Deutschland</p>
                <p>E-Mail: info@reisewelt.de</p>
                <p>Telefon: +49 30 123456789</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2. Arten der verarbeiteten Daten
              </h2>
              <p>
                Wir verarbeiten die folgenden Kategorien personenbezogener
                Daten:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Kontaktdaten (Name, E-Mail-Adresse, Telefonnummer)</li>
                <li>
                  Nutzungsdaten (IP-Adresse, Browser-Informationen, Besuchszeit)
                </li>
                <li>Newsletter-Anmeldedaten (E-Mail-Adresse)</li>
                <li>Buchungsdaten (Reisedaten, Präferenzen)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                3. Zwecke der Datenverarbeitung
              </h2>
              <p>Ihre Daten werden für folgende Zwecke verarbeitet:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Bereitstellung und Verbesserung unserer Website</li>
                <li>Bearbeitung von Anfragen und Buchungen</li>
                <li>Versendung von Newslettern (nur mit Ihrer Einwilligung)</li>
                <li>Erfüllung rechtlicher Verpflichtungen</li>
                <li>Analyse der Website-Nutzung für Optimierungszwecke</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                4. Rechtsgrundlagen
              </h2>
              <p>Die Verarbeitung Ihrer Daten erfolgt auf Grundlage:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Art. 6 Abs. 1 lit. a DSGVO:</strong> Einwilligung
                  (z.B. Newsletter)
                </li>
                <li>
                  <strong>Art. 6 Abs. 1 lit. b DSGVO:</strong> Vertragserfüllung
                  (z.B. Buchungen)
                </li>
                <li>
                  <strong>Art. 6 Abs. 1 lit. f DSGVO:</strong> Berechtigte
                  Interessen (z.B. Website-Optimierung)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                5. Cookies
              </h2>
              <p>
                Unsere Website verwendet Cookies, um die Nutzererfahrung zu
                verbessern. Cookies sind kleine Textdateien, die auf Ihrem Gerät
                gespeichert werden.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                <p className="text-blue-800">
                  <strong>Hinweis:</strong> Sie können Cookies in Ihren
                  Browser-Einstellungen deaktivieren. Dies kann jedoch die
                  Funktionalität der Website beeinträchtigen.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                6. Newsletter
              </h2>
              <p>
                Wenn Sie sich für unseren Newsletter anmelden, verwenden wir
                Ihre E-Mail-Adresse ausschließlich für den Versand von
                Reiseangeboten und Neuigkeiten. Sie können sich jederzeit
                abmelden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                7. Ihre Rechte
              </h2>
              <p>
                Sie haben folgende Rechte bezüglich Ihrer personenbezogenen
                Daten:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Auskunftsrecht:</strong> Information über verarbeitete
                  Daten
                </li>
                <li>
                  <strong>Berichtigungsrecht:</strong> Korrektur falscher Daten
                </li>
                <li>
                  <strong>Löschungsrecht:</strong> Löschung Ihrer Daten
                </li>
                <li>
                  <strong>Widerspruchsrecht:</strong> Widerspruch gegen die
                  Verarbeitung
                </li>
                <li>
                  <strong>Datenübertragbarkeit:</strong> Übertragung Ihrer Daten
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                8. Datensicherheit
              </h2>
              <p>
                Wir verwenden technische und organisatorische Maßnahmen, um Ihre
                Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu
                schützen. Alle Datenübertragungen erfolgen verschlüsselt über
                HTTPS.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                9. Speicherdauer
              </h2>
              <p>
                Ihre Daten werden nur so lange gespeichert, wie es für die
                jeweiligen Zwecke erforderlich ist oder gesetzliche
                Aufbewahrungsfristen bestehen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                10. Kontakt
              </h2>
              <p>
                Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte wenden
                Sie sich an:
              </p>
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-md mt-2">
                <p>
                  <strong>E-Mail:</strong> datenschutz@reisewelt.de
                </p>
                <p>
                  <strong>Telefon:</strong> +49 30 123456789
                </p>
              </div>
            </section>

            <section className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Stand:</strong> Januar 2025
                <br />
                Diese Datenschutzerklärung wird regelmäßig überprüft und bei
                Bedarf aktualisiert.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => window.history.back()}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors duration-300"
            >
              Zurück zur Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
