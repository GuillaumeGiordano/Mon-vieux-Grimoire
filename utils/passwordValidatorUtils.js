function isPasswordValid(password) {
  // Vérifier la longueur minimale au moins 8 caractères
  if (password.length < 8) {
    console.log("Vérifier la longueur minimale au moins 8 caractères.");
    return false;
  }

  // Vérifier la présence d'au moins une lettre en majuscule
  if (!/[A-Z]/.test(password)) {
    console.log("Vérifier la présence d'au moins une lettre en majuscule.");
    return false;
  }

  // Vérifier la présence d'au moins un chiffre
  if (!/\d/.test(password)) {
    console.log("Vérifier la présence d'au moins un chiffre.");
    return false;
  }

  // Si toutes les conditions sont satisfaites, le mot de passe est valide
  console.log("Password valid.");
  return true;
}

module.exports = {
  isPasswordValid,
};
