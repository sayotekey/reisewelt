import faqData from "../data/faqData";

const ContactPage = () => {
  return (
    <>
      {/* Kontaktinformation Section */}
      <section className="min-h-screen bg-white">
        <div className="container flex flex-col min-h-screen px-6 py-12 mx-auto">
          <div className="flex-1 lg:flex lg:items-center lg:-mx-6">
            <div className="text-black lg:w-1/2 lg:mx-6">
              <h2 className="text-2xl font-semibold capitalize lg:text-3xl">
                Hilfe und Kontakt
              </h2>

              <p className="max-w-xl mt-6">
                Herzlich willkommen bei Reisewelt!
                <br />
                <br />
                Wir sind rund um die Uhr für Sie da - 24 Stunden am Tag, 7 Tage
                die Woche.
                <br />
                <br />
                Wenn Sie Fragen zu unseren Hotels, Reisen oder sonstigen
                Angeboten haben, zögern Sie nicht, uns zu kontaktieren. Bevor
                Sie uns schreiben, werfen Sie bitte einen Blick in unsere FAQ,
                dort finden Sie vielleicht schon die Antwort auf Ihre Frage.
                <br />
                <br />
                Unsere Kontaktmöglichkeiten finden Sie unten: Telefon, E-Mail
                und unsere Adresse stehen Ihnen jederzeit zur Verfügung.
                <br />
                <br />
                Alternativ können Sie auch unser Kontaktformular ausfüllen - wir
                melden uns schnellstmöglich bei Ihnen.
                <br />
                <br />
                Wir freuen uns darauf, Ihnen bei Ihrer Reiseplanung behilflich
                zu sein!
              </p>

              <div className="mt-6 space-y-8 md:mt-8">
                <p className="flex items-start -mx-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-2 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <span className="mx-2 text-black truncate w-72">
                    Friedrichstraße 45, 10117 Berlin, Deutschland
                  </span>
                </p>

                <p className="flex items-start -mx-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-2 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>

                  <span className="mx-2 text-black truncate w-72">
                    0800 / 1234567890
                  </span>
                </p>

                <p className="flex items-start -mx-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-2 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h24a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>

                  <span className="mx-2 text-black truncate w-72">
                    www.reisewelt.com
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kontaktformular Section */}
      <section className="bg-white ">
        <div className="max-w-[556px] px-4 py-10 mx-auto  flex flex-col ">
          <div className="w-full flex flex-col gap-5">
            <div className="w-full flex flex-col justify-start items-start gap-6">
              <div className="w-full">
                <label className=" dark:text-black text-black text-base font-normal  leading-7">
                  Name
                </label>
                <input
                  placeholder="Name"
                  type="text"
                  className="mt-2 w-full px-5 py-2 bg-white rounded-xl outline-1 outline-offset-[-1px] outline-black  overflow-hidden  text-[#898989] text-lg font-normal "
                ></input>
              </div>
              <div className="w-full">
                <label className="dark:text-black text-black text-base font-normal  leading-7">
                  Email
                </label>
                <input
                  placeholder="Email"
                  type="email"
                  className="mt-2 w-full px-5 py-2 bg-white rounded-xl outline-1 outline-offset-[-1px] outline-black  overflow-hidden  text-[#898989] text-lg font-normal "
                ></input>
              </div>
              <div className="flex gap-9 mt-3">
                <p className="text-black">Ich bitte um Rückruf:</p>
                <label className="flex items-center gap-4">
                  <input type="radio" className="w-7 h-7  accent-black" />
                  <span className="justify-start text-black text-base sm:text-lg font-normal ">
                    Ja
                  </span>
                </label>
                <label className="flex items-center gap-4">
                  <input type="radio" className="w-7 h-7  accent-black" />
                  <span className="justify-start text-black text-base sm:text-lg font-normal ">
                    Nein
                  </span>
                </label>
              </div>
              <div className="w-full mb-3">
                <label className="text-black text-base font-normal  leading-7">
                  Telefonnummer
                </label>
                <input
                  placeholder="+49 160 4567890"
                  type="tel"
                  className="mt-2 w-full px-5 py-2 bg-white rounded-xl outline-1 outline-offset-[-1px] outline-black  overflow-hidden  text-[#898989] text-lg font-normal "
                ></input>
              </div>
              <div className="w-full">
                <label className="dark:text-black text-black text-base font-normal  leading-7">
                  Nachricht
                </label>
                <textarea
                  className="mt-2 w-full resize-none px-5 py-2 bg-white rounded-xl outline-1 outline-offset-[-1px] outline-black  overflow-hidden  text-[#898989] text-lg font-normal "
                  placeholder=" Nachricht"
                  cols="40"
                  rows="10"
                ></textarea>
              </div>
            </div>
            <button className=" px-9 py-5 bg-black rounded-2xl  text-center  text-white text-xl font-normal  leading-7">
              Anfrage absenden
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white">
        <div className="container px-6 py-12 mx-auto">
          <h2 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl dark:text-black">
            Häufig gestellte Fragen
          </h2>

          <div className="mt-8 xl:mt-16 lg:flex lg:-mx-12">
            {/* Links Kolumn - Kategorien */}
            <div className="lg:mx-12">
              {faqData.map((category) => (
                <a
                  key={category.category}
                  href="#"
                  className="block text-black hover:underline mb-2"
                >
                  {category.title}
                </a>
              ))}
            </div>

            {/* Rechts Kategory - Fragen und Antworten */}
            <div className="flex-1 mt-8 lg:mx-12 lg:mt-0">
              {faqData
                .flatMap(({ questions }) => questions)
                .map(({ id, question, answer }) => (
                  <div key={id} className="mb-8">
                    <button className="flex items-center focus:outline-none">
                      <svg
                        className="flex-shrink-0 w-6 h-6 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 12H4"
                        ></path>
                      </svg>

                      <h2 className="mx-4 text-xl text-black dark:text-black">
                        {question}
                      </h2>
                    </button>

                    <div className="flex mt-4 md:mx-10">
                      <p className="max-w-3xl px-4 text-black">{answer}</p>
                    </div>

                    <hr className="my-8 border-gray-200 dark:border-gray-700" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
