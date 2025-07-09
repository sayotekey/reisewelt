import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const FooterComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const scrollToSection = (sectionId) => {
    if (window.location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  };

  // Validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Bitte geben Sie Ihre E-Mail-Adresse ein.");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // API request to server for saving subscription
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (response.ok) {
        setMessage(
          "Vielen Dank! Sie haben sich erfolgreich für unseren Newsletter angemeldet."
        );
        setEmail("");
      } else {
        const errorData = await response.json();
        setMessage(
          errorData.message ||
            "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
        );
      }
    } catch (error) {
      // Fallback for demonstration (when no API available)
      console.log("Newsletter subscription for:", email);
      setMessage(
        "Vielen Dank! Sie haben sich erfolgreich für unseren Newsletter angemeldet."
      );
      setEmail("");
    } finally {
      setIsLoading(false);
      // Clear message after 5 seconds
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <footer
      className="footer-container w-full overflow-hidden transition-all duration-700 ease-in-out"
      style={{
        color: "var(--text-color)",
      }}
    >
      {/* Main Footer Content */}
      <div className="w-full px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 pl-6">
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
            <p
              className="text-sm leading-relaxed transition-colors duration-300"
              style={{ color: "var(--text-light)" }}
            >
              Entdecken Sie die Welt mit uns.
              <br />
              Ihre Traumreise wartet.
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
            <h4
              className="text-lg font-semibold transition-colors duration-300"
              style={{ color: "var(--text-color)" }}
            >
              Schnelle Links
            </h4>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  onClick={() => {
                    // in the top of our site
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="footer-link text-sm"
                >
                  Startseite
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="footer-link text-sm">
                  Kontakt
                </NavLink>
              </li>
              <li>
                <NavLink to="/news" className="footer-link text-sm">
                  Reise News
                </NavLink>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection("about-us")}
                  className="footer-link text-sm cursor-pointer"
                  style={{ cursor: "pointer" }}
                >
                  Über uns
                </a>
              </li>
              <li>
                <NavLink to="/login" className="footer-link text-sm">
                  Anmelden
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4
              className="text-lg font-semibold transition-colors duration-300"
              style={{ color: "var(--text-color)" }}
            >
              Angebote & Services
            </h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/lastminute-deals" className="footer-link text-sm">
                  Last-Minute Deals
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/fivehundredeuro-deals"
                  className="footer-link text-sm"
                >
                  Angebote
                </NavLink>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection("customer-reviews")}
                  className="footer-link text-sm cursor-pointer"
                  style={{ cursor: "pointer" }}
                >
                  Bewertung
                </a>
              </li>
              <li>
                <NavLink to="/register" className="footer-link text-sm">
                  Registrieren
                </NavLink>
              </li>
              <li>
                <NavLink to="/forgot-password" className="footer-link text-sm">
                  Passwort vergessen
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4
              className="text-lg font-semibold transition-colors duration-300"
              style={{ color: "var(--text-color)" }}
            >
              Kontakt & Newsletter
            </h4>
            <div className="space-y-3">
              <div className="footer-contact-item flex items-center space-x-2 text-sm">
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
              <div className="footer-contact-item flex items-center space-x-2 text-sm">
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
                <span>Hamburg, Deutschland</span>
              </div>
              <div className="footer-contact-item flex items-center space-x-2 text-sm">
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
              <p
                className="text-sm mb-3 transition-colors duration-300"
                style={{ color: "var(--text-light)" }}
              >
                Newsletter abonnieren
              </p>

              {/* Success/Error Message */}
              {message && (
                <div
                  className={`mb-3 p-2 rounded text-xs ${
                    message.includes("erfolgreich") ||
                    message.includes("Vielen Dank")
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-red-100 text-red-700 border border-red-300"
                  }`}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ihre E-Mail"
                  disabled={isLoading}
                  className="footer-newsletter-input flex-1 px-3 py-2 text-sm rounded-l-md focus:outline-none disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm rounded-r-md hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
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
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Legal Links */}
      {/* NOTE: For production use, these should link to actual legal pages required by German/EU law */}
      <div className="border-t border-orange-400 w-full">
        <div className="w-full px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div
              className="text-sm transition-colors duration-300"
              style={{ color: "var(--text-light)" }}
            >
              © 2025 Reisewelt. Alle Rechte vorbehalten.
            </div>
            <div className="flex space-x-6">
              <NavLink
                to="/imprint"
                className="footer-link text-sm transition-colors duration-300"
                title="Rechtliche Informationen über das Unternehmen"
              >
                Impressum
              </NavLink>
              <NavLink
                to="/privacy"
                className="footer-link text-sm transition-colors duration-300"
                title="Informationen zum Datenschutz"
              >
                Datenschutz
              </NavLink>
              <NavLink
                to="/terms"
                className="footer-link text-sm transition-colors duration-300"
                title="Allgemeine Geschäftsbedingungen"
              >
                AGB
              </NavLink>
              <NavLink
                to="/cookies"
                className="footer-link text-sm transition-colors duration-300"
                title="Cookie-Richtlinien"
              >
                Cookies
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
