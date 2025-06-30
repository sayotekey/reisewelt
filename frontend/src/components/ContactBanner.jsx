import React from "react";

const ContactBanner = () => {
  return (
    <div className="bg-blue-200 border border-black text-center py-4 px-2 mt-8 mb-8">
      <p className=" text-black font-bold text-lg">
        0800 / <span className="underline">1234567890</span>
      </p>
      <p className="  text-black text-lg mt-1">
        Service Center -{" "}
        <a
          href="https://www.reisewelt.com"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.reisewelt.com
        </a>{" "}
        24h / 7 Tage rund um die Uhr für Sie da!
      </p>
    </div>
  );
};

export default ContactBanner;
