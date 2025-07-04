import React from "react";
import aboutImage from "../images/aboutUs.png";

const AboutUs = () => {
  return (
    <section className="w-full bg-white text-gray-800">
      <div className="relative w-full h-[40vh] md:h-[70vh] lg:h-[60vh] overflow-hidden">
        <img
          src={aboutImage}
          alt="Über Uns"
          className="w-full h-full object-cover"
        />

        {/* oppacity */}
        <div className="absolute inset-0 bg-black/20 md:bg-black/15 lg:bg-black/30"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-md">
            Über Uns
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            <strong>Reisen sind unsere Leidenschaft.</strong>
            <br />
            Wir machen sie zugänglich, bequem und wirklich spannend. Unser Ziel
            ist es, Ihnen zu helfen, ganz einfach die beste Reise zu finden,
            auszuwählen und zu buchen, die Ihnen unvergessliche Eindrücke und
            neue Entdeckungen bringt. Wir sind nicht nur ein Reisebüro, sondern
            eine moderne digitale Plattform für selbstständige und komfortable
            Reiseplanung. Eine benutzerfreundliche Oberfläche, intelligente
            Suche und personalisierte Angebote helfen Ihnen, Ihre Traumreise
            schnell und ohne Aufwand zu finden. Die Technik arbeitet für Sie –
            Sie genießen den Urlaub! Wenn Sie jedoch persönliche Betreuung
            wünschen, können Sie sich jederzeit an unser Team wenden.
            Hinterlassen Sie eine Anfrage über das Kontaktformular, rufen Sie
            uns an oder schreiben Sie uns eine E-Mail – wir helfen Ihnen gerne,
            die perfekte Reise auszuwählen. Jede Reise wird von uns mit
            besonderer Aufmerksamkeit zum Detail zusammengestellt – sei es ein
            Familienurlaub, eine romantische Reise oder ein Abenteuer mit
            Freunden. Bei uns können Sie sicher sein, dass alles mit Herz,
            Fürsorge und Professionalität organisiert wird.
          </p>

          <p className="font-semibold text-center">
            Entdecken Sie neue Horizonte mit uns – wir machen Ihre Reise
            unvergesslich!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
