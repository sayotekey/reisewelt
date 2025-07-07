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
    <section className="bg-white ">
      <h2 className="text-2xl font-semibold capitalize lg:text-3xl text-black">
        Füllen Sie das Kontaktformular aus - wir melden uns schnellstmöglich bei
        Ihnen
      </h2>
      <div className="max-w-[556px] px-4 py-10 mx-auto  flex flex-col ">
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          {/*Name*/}
          <label className=" dark:text-black text-black text-base font-normal  leading-7">
            Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 w-full px-5 py-2 bg-white rounded-xl outline-1 outline-offset-[-1px] outline-black  overflow-hidden  text-[#898989] text-lg font-normal "
          />

          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          {/*Email*/}
          <label className="dark:text-black text-black text-base font-normal  leading-7">
            Email
          </label>
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 w-full px-5 py-2 bg-white rounded-xl outline-1 outline-offset-[-1px] outline-black  overflow-hidden  text-[#898989] text-lg font-normal "
          />

          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          {/*Rückruf*/}
          <div className="flex gap-9 mt-3">
            <p className="text-black">Ich bitte um Rückruf:</p>
            <label className="flex items-center gap-4">
              <input
                type="radio"
                name="callback"
                value="ja"
                checked={formData.callback === "ja"}
                onChange={handleChange}
                required
                className="w-7 h-7  accent-black"
              />

              <span className="justify-start text-black text-base sm:text-lg font-normal ">
                Ja
              </span>
            </label>
            <label className="flex items-center gap-4">
              <input
                type="radio"
                name="callback"
                value="nein"
                checked={formData.callback === "nein"}
                onChange={handleChange}
                required
                className="w-7 h-7  accent-black"
              />
              <span className="justify-start text-black text-base sm:text-lg font-normal ">
                Nein
              </span>
            </label>
          </div>

          {/*Telefonnummer*/}
          <div className="w-full mb-3">
            <label className="text-black text-base font-normal  leading-7">
              Telefonnummer
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="+49 160 4567890"
              value={formData.phone}
              onChange={handleChange}
              required={formData.callback === "ja"}
              disabled={formData.callback !== "ja"}
              className={`mt-2 w-full px-5 py-2 bg-white rounded-xl outline-1 outline-black text-lg text-black ${
                formData.callback !== "ja"
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/*Nachricht*/}
          <label className="dark:text-black text-black text-base font-normal  leading-7">
            Nachricht
          </label>
          <textarea
            name="message"
            placeholder=" Nachricht"
            value={formData.message}
            onChange={handleChange}
            cols="40"
            rows="10"
            className="mt-2 w-full resize-none px-5 py-2 bg-white rounded-xl outline-1 outline-offset-[-1px] outline-black  overflow-hidden  text-[#898989] text-lg font-normal "
          ></textarea>

          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}

          <button
            type="submit"
            className=" px-9 py-5 bg-black rounded-2xl  text-center  text-white text-xl font-normal  leading-7"
          >
            Anfrage absenden
          </button>
          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
