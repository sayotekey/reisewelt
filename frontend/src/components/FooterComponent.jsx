import React from "react";
import { NavLink } from "react-router-dom";

const FooterComponent = () => {
  return (
    <footer className="bg-gradient-to-br from-orange-200 via-orange-200 to-peach-200 text-gray-800 w-full">
      {/* Main Footer Content */}
      <div className="w-full px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Reisewelt Logo"
                className="h-8 w-8"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">
                Reisewelt
              </h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Entdecken Sie die Welt mit uns. Ihre Traumreise wartet - von
              exotischen Stränden bis zu aufregenden Städtetrips.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              <a
                href="#"
                className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors duration-300 group"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-300 group"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-red-400 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-300 group"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.251 14.97 3.954 13.7 3.954 12.017s.297-2.953 1.172-3.674c.875-.807 2.026-1.297 3.323-1.297 1.297 0 2.448.49 3.323 1.297.875.721 1.172 1.991 1.172 3.674s-.297 2.953-1.172 3.674c-.875.807-2.026 1.297-3.323 1.297zm7.009-9.679H13.25c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h2.208c.414 0 .75.336.75.75s-.336.75-.75.75z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300 group"
                aria-label="YouTube"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">
              Schnelle Links
            </h4>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  className="text-gray-700 hover:text-orange-600 transition-colors duration-300 text-sm hover:underline"
                >
                  Startseite
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="text-gray-700 hover:text-orange-600 transition-colors duration-300 text-sm hover:underline"
                >
                  Über uns
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/setting"
                  className="text-gray-700 hover:text-orange-600 transition-colors duration-300 text-sm hover:underline"
                >
                  Einstellungen
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/hotels"
                  className="text-gray-700 hover:text-orange-600 transition-colors duration-300 text-sm hover:underline"
                >
                  Hotels
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/news"
                  className="text-gray-700 hover:text-orange-600 transition-colors duration-300 text-sm hover:underline"
                >
                  Reise News
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Services</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-orange-600 transition-colors duration-300 text-sm hover:underline"
                >
                  Hotelsuche
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-orange-600 transition-colors duration-300 text-sm hover:underline"
                >
                  Flugbuchung
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-orange-600 transition-colors duration-300 text-sm hover:underline"
                >
                  Mietwagen
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-orange-600 transition-colors duration-300 text-sm hover:underline"
                >
                  Reiseversicherung
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-orange-600 transition-colors duration-300 text-sm hover:underline"
                >
                  24/7 Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">
              Kontakt & Newsletter
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-700 text-sm">
                <svg
                  className="w-4 h-4 text-orange-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>info@reisewelt.de</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700 text-sm">
                <svg
                  className="w-4 h-4 text-orange-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Berlin, Deutschland</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700 text-sm">
                <svg
                  className="w-4 h-4 text-orange-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+49 30 123456789</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <p className="text-sm text-gray-700 mb-3">
                Newsletter abonnieren
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Ihre E-Mail"
                  className="flex-1 px-3 py-2 bg-white text-gray-800 text-sm rounded-l-md border border-orange-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm rounded-r-md hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:shadow-lg">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-orange-400 w-full">
        <div className="w-full px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">
              © 2025 Reisewelt. Alle Rechte vorbehalten.
            </div>
            <div className="flex space-x-6">
              <NavLink
                to="/imprint"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300"
              >
                Impressum
              </NavLink>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300"
              >
                Datenschutz
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300"
              >
                AGB
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
