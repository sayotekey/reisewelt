import faqData from "../data/faqData";
import ContactForm from "../components/Contact/ContactForm";
import FaqComponent from "../components/Contact/FaqComponent";
import contactBild from "../images/contact.png";

const ContactPage = () => {
  return (
    <>
      {/* Kontaktinformation Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 mt-18">
        <h2 className="text-xl font-semibold text-center text-black lg:text-2xl mb-6">
          Hilfe und Kontakt
        </h2>
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Links Kolumne */}
          <div className="w-full lg:w-6/12">
            <img
              src={contactBild}
              alt="Kontakt"
              className="rounded-lg shadow-md w-full h-110 object-cover"
            />
          </div>

          {/* Recht Kolumne */}
          <div className="w-full lg:w-7/12 text-gray-800 space-y-3 text-justify">
            <p>Herzlich willkommen bei Reisewelt!</p>
            <p>
              Wir sind rund um die Uhr für Sie da - 24 Stunden am Tag, 7 Tage
              die Woche.
            </p>
            <p>
              Wenn Sie Fragen zu unseren Hotels, Reisen oder sonstigen Angeboten
              haben, zögern Sie nicht, uns zu kontaktieren. Bevor Sie uns
              schreiben, werfen Sie bitte einen Blick in unsere Häufig gestellte
              Fragen, dort finden Sie vielleicht schon die Antwort auf Ihre
              Frage.
            </p>
            <p>
              Unsere Kontaktmöglichkeiten finden Sie unten: Telefon, E-Mail und
              unsere Adresse stehen Ihnen jederzeit zur Verfügung.
            </p>
            <p>
              Alternativ können Sie auch unser Kontaktformular ausfüllen - wir
              melden uns schnellstmöglich bei Ihnen.
            </p>
            <p>
              Wir freuen uns darauf, Ihnen bei Ihrer Reiseplanung behilflich zu
              sein!
            </p>

            {/* Kontaktinformationen */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>

                <span>Friedrichstraße 45, 10117 Berlin</span>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>

                <span>0800 / 1234567890</span>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>

                <span>info@reisewelt.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kontaktformular Section */}
      <ContactForm />

      {/* FAQ Section */}
      <FaqComponent faqData={faqData} />
    </>
  );
};

export default ContactPage;
