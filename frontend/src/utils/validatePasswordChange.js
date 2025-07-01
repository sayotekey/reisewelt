export const validatePasswordChange = ({ oldPassword, newPassword }) => {
  const errors = {};

  // Altes Passwort validation
  if (!oldPassword || oldPassword.trim() === "") {
    errors.oldPassword = "Altes Passwort ist erforderlich.";
  }

  // Neues Passwort validation
  if (!newPassword || newPassword.trim() === "") {
    errors.newPassword = "Passwort ist erforderlich.";
  } else if (newPassword.length < 8) {
    errors.newPassword = "Passwort muss mindestens 8 Zeichen lang sein.";
  } else if (!/[A-Z]/.test(newPassword)) {
    errors.newPassword = "Passwort muss mindestens einen Großbuchstaben enthalten";
  } else if (!/[a-z]/.test(newPassword)) {
    errors.newPassword =
      "Passwort muss mindestens einen Kleinbuchstaben enthalten";
  } else if (!/[0-9]/.test(newPassword)) {
    errors.newPassword = "Passwort muss mindestens eine Zahl enthalten";
  } else if (!/[^A-Za-z0-9]/.test(newPassword)) {
    errors.newPassword =
      "Passwort muss mindestens ein Sonderzeichen enthalten - z.B. !@#$%&*";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
