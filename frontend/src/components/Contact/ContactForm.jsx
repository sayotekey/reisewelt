import { useState } from "react";
import axios from "axios";
import validateContactForm from "../../utils/validateContactForm";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    callback: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSuccessMessage("");
      setErrorMessage("");

      try {
        await axios.post("http://localhost:3000/api/contact", formData);

        setSuccessMessage("Kontaktformular erfolgreich gesendet");

        setFormData({
          name: "",
          email: "",
          callback: "",
          phone: "",
          message: "",
        });
      } catch (error) {
        setErrorMessage(
          "Fehler beim Senden des Kontaktformulars. Bitte versuchen Sie es später erneut."
        );
      }
    }
  };

  return (
    <section className=" container max-w-2xl px-12 py-10 mx-auto">
      <h2 className="text-xl font-semibold text-center text-black lg:text-2xl mb-6">
        Füllen Sie das Kontaktformular aus - wir melden uns schnellstmöglich bei
        Ihnen
      </h2>
      <div className="contact-form px-6 py-6 bg-white rounded-md shadow-md">
        <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
          {/*Name*/}
          <label className="text-gray-900">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-5 py-2 outline-1 outline-offset-[-1px] text-lg contact-form-input"
          />

          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          {/*Email*/}
          <label className="text-gray-900">Email</label>
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-2 outline-1 outline-offset-[-1px] text-lg contact-form-input"
          />

          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          {/*Rückruf*/}
          <div className="flex items-center gap-10 mt-2">
            <p className="text-gray-900">Ich bitte um Rückruf:</p>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="callback"
                value="ja"
                checked={formData.callback === "ja"}
                onChange={handleChange}
                required
                className="w-5 h-5  accent-gray-900"
              />

              <span className="text-gray-900 text-base sm:text-lg font-normal">
                Ja
              </span>
            </label>
            <label className="text-gray-900 flex items-center gap-2">
              <input
                type="radio"
                name="callback"
                value="nein"
                checked={formData.callback === "nein"}
                onChange={handleChange}
                required
                className="w-5 h-5  accent-gray-900"
              />
              <span className="text-gray-900 text-base sm:text-lg font-normal">
                Nein
              </span>
            </label>
          </div>

          {/*Telefonnummer*/}
          <div className="w-full mb-3">
            <label className="text-gray-900">Telefonnummer</label>
            <input
              name="phone"
              type="tel"
              placeholder="+49 160 4567890"
              value={formData.phone}
              onChange={handleChange}
              required={formData.callback === "ja"}
              disabled={formData.callback === "nein"}
              className={`w-full px-5 py-2 outline-1 outline-offset-[-1px] text-lg contact-form-input ${
                formData.callback === "nein"
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-white text-black"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/*Nachricht*/}
          <label className="text-gray-900">Nachricht</label>
          <textarea
            name="message"
            placeholder=" Nachricht"
            value={formData.message}
            onChange={handleChange}
            cols="40"
            rows="5"
            className="w-full px-5 py-2 outline-1 outline-offset-[-1px] text-lg contact-form-input"
          ></textarea>

          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}

          <button
            type="submit"
            className=" px-9 py-2 bg-black rounded-lg  text-center  text-white text-xl font-normal"
            style={{
              backgroundColor: "var(--accent-color)",
              color: "white",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "var(--accent-hover)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "var(--accent-color)";
            }}
          >
            Anfrage absenden
          </button>
          {successMessage && (
            <p className="mt-1 mb-3 p-2 rounded text-s bg-green-100 text-green-700 border border-green-300">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="mt-1 mb-3 p-2 rounded text-s bg-red-100 text-red-700 border border-red-300">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
