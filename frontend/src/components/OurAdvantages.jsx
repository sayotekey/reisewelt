import React from "react";
import {  Flame, MonitorSmartphone , Globe, ShieldCheck } from "lucide-react";

const advantages = [
  {
    icon: <Flame size={30} />,
    title: "Leidenschaft",
    description:
      "Reisen sind für uns nicht nur ein Geschäft, sondern eine echte Leidenschaft, die wir mit unseren Kunden teilen.",
  },
  {
    icon: <MonitorSmartphone size={30} />,
    title: "Modernität",
    description:
      "Wir sind mehr als ein klassisches Reisebüro – wir sind eine digitale Plattform zur selbstständigen und unkomplizierten Urlaubsplanung.",
  },
  {
    icon: <Globe size={30} />,
    title: "Zugänglichkeit",
    description:
      "Wir machen das Reisen einfach, bequem und zugänglich für alle – dank intelligenter Technik und benutzerfreundlicher Plattform.",
  },
  {
    icon: <ShieldCheck size={30} />,
    title: "Gut versichert",
    description:
      "Mit dem Sorglos-Reiseschutz von Allianz Travel haben Sie bei all unseren Reisen die wichtigsten Versicherungen im Gepäck.",
  },
];

const OurAdvantages = () => {
  return (
    <section className="py-10 m-10 bg-white text-center">
      <h2 className="text-3xl text-blue-400  mb-20">Unser Versprechen an unsere Kunden</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {advantages.map((item, index) => (
          <div key={index} className="flex flex-col items-center px-4">
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-green-100 border-2 border-solid border-gray-300 mb-4">
              <div className="text-gray-600">{item.icon}</div>
            </div>
            <h3 className="text-lg font-semibold italic text-gray-800 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurAdvantages;
