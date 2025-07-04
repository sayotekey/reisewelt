const validateRegisterPassword = (values, type) => {
  const errors = {};

  if (type === "register") {
    // Name validation =>Pflichtfeld, mindestens 2 Zeichen, nur lateinische Buchstaben, Leerzeichen oder Bindestriche
    if (!values.name || values.name.trim() === "") {
      errors.name = "Vorname ist erforderlich";
    } else if (values.name.trim().length < 2) {
      errors.name = "Vorname muss mindestens 2 Zeichen lang sein";
    } else if (!/^[a-zA-Z\s-]+$/.test(values.name.trim())) {
      errors.name =
        "Vorname darf nur Latinen Buchstaben, Leerzeichen oder Bindestriche enthalten";
    }

    // E-Mail validation =>Pflichtfeld, gültiges E-Mail-Format
    if (!values.email || values.email.trim() === "") {
      errors.email = "E-Mail ist erforderlich";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
        values.email.trim()
      )
    ) {
      errors.email = "Ungültige E-Mail-Adresse";
    }

    // Passwort validation =>Pflichtfeld, mindestens 8 Zeichen, mindestens 1 Buchstabe, 1 Zahl und 1 Sonderzeichen
    if (!values.password) {
      errors.password = "Passwort ist erforderlich";
    } else if (values.password.length < 8) {
      errors.password = "Passwort muss mindestens 8 Zeichen lang sein";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password =
        "Passwort muss mindestens einen Großbuchstaben enthalten";
    } else if (!/[a-z]/.test(values.password)) {
      errors.password =
        "Passwort muss mindestens einen Kleinbuchstaben enthalten";
    } else if (!/[0-9]/.test(values.password)) {
      errors.password = "Passwort muss mindestens eine Zahl enthalten";
    } else if (!/[^A-Za-z0-9]/.test(values.password)) {
      errors.password =
        "Passwort muss mindestens ein Sonderzeichen enthalten - z.B. !@#$%&*";
    }

    // Passwort-Bestätigung validation =>Pflichtfeld, muss mit Passwort übereinstimmen
    if (!values.confirmPassword) {
      errors.confirmPassword = "Passwort-Bestätigung ist erforderlich";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwörter stimmen nicht überein";
    }
  }

  if (type === "login") {
    if (!values.email || !values.password) {
      errors.loginError = "Bitte geben Sie Ihre E-Mail und Passwort ein";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email) ||
      values.password.length < 8
    ) {
      errors.loginError = "Ungültige E-Mail oder Passwort";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default validateRegisterPassword;
