const validateContactForm = (formData) => {
  const errors = {};

  // Name validation
  if (!formData.name || formData.name.trim() === "") {
    errors.name = "Bitte geben Sie Ihren Namen ein";
  } else if (formData.name.trim().length < 2) {
    errors.name = "Der Name muss mindestens 2 Zeichen lang sein";
  } else if (!/^[a-zA-Z\s-]+$/.test(formData.name.trim())) {
    errors.name =
      "Vorname darf nur Latinen Buchstaben, Leerzeichen oder Bindestriche enthalten";
  }

  // Email validation
  if (!formData.email || formData.email.trim() === "") {
    errors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein";
  } else if (
    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
      formData.email.trim()
    )
  ) {
    errors.email = "Ungültige E-Mail-Adresse";
  }

  // Rückruf validation
  if (formData.callback === "ja") {
    if (!formData.phone.trim()) {
      errors.phone = "Bitte geben Sie Ihre Telefonnummer ein";
    } else {
      const phoneRegex = /^\+\d{1,4}[\s-]?\d{2,5}([\s-]?\d{3,}){1,2}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        errors.phone = "Ungültige Telefonnummer";
      }
    }
  }

  // Message validation
  if (!formData.message || formData.message.trim() === "") {
    errors.message = "Bitte geben Sie Ihre Nachricht ein";
  } else if (formData.message.trim().length < 10) {
    errors.message = "Die Nachricht muss mindestens 10 Zeichen lang sein";
  } else if (formData.message.trim().length > 500) {
    errors.message = "Die Nachricht darf maximal 500 Zeichen lang sein";
  }

  return errors;
};

export default validateContactForm;
