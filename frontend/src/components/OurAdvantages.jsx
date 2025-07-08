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
    <section 
      className="our-advantages-section py-8 m-10 text-center rounded-3xl transition-all duration-700 ease-in-out" 
      style={{ 
        backgroundColor: 'var(--bg-secondary)', 
        color: 'var(--text-color)',
      
      }}
    >
      <h2 
        className="text-4xl font-bold mb-16 transition-all duration-500 hover:scale-105"
        style={{ 
          color: 'var(--accent-color)',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        Unser Versprechen an unsere Kunden
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {advantages.map((item, index) => (
          <div 
            key={index} 
            className="advantage-card flex flex-col items-center px-6 py-6 rounded-2xl group cursor-pointer"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              animation: 'fadeInUp 0.6s ease-out forwards'
            }}
          >
            <div 
              className="advantage-icon-container w-24 h-24 flex items-center justify-center rounded-full mb-5 transition-all duration-500 group-hover:rotate-360 group-hover:scale-110"
              style={{ 
                backgroundColor: 'var(--bg-color)', 
                border: '3px solid var(--accent-color)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div 
                className="transition-all duration-500 group-hover:scale-125"
                style={{ color: 'var(--accent-color)' }}
              >
                {React.cloneElement(item.icon, { size: 28 })}
              </div>
            </div>
            
            <h3 
              className="text-xl font-bold italic mb-4 transition-all duration-300 group-hover:text-shadow-lg"
              style={{ color: 'var(--text-color)' }}
            >
              {item.title}
            </h3>
            
            <p 
              className="text-sm leading-relaxed transition-all duration-300 group-hover:scale-105"
              style={{ color: 'var(--text-light)' }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurAdvantages;
