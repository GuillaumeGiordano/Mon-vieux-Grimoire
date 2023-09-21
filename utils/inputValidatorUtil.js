/**
 * Regex détecter les balises HTML, JavaScript et
 * les attributs couramment utilisés dans les attaques XSS :
 * @param {*} input
 * @returns
 */
function isSafeInput(input) {
  const regex = /<[a-zA-Z][^\s]*\s*\/?>|<\/[a-zA-Z]+>|javascript:|on[a-zA-Z]+=/i;
  return regex.test(input);
}

/**
 * Vérifie si le email est valide
 * @param {*} email
 * @returns
 */
function isMailValid(email) {
  // Utilisez une regex pour valider l'adresse e-mail
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}

/**
 * Vérifie si le password est valide
 * @param {*} password
 * @returns
 */
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
  return true;
}

/**
 * Utilisez une regex pour vérifier si l'entrée est un nombre de 4 chiffres maximum
 * @param {*} input
 * @returns
 */
function isYearNumber(input) {
  // const regex = /^\d{1,4}$/;
  // return regex.test(input);

  // Convertit la chaîne en nombre
  const number = parseInt(input, 10);
  // L'année en cours
  const currentYear = new Date().getFullYear();

  if (isNaN(number)) {
    return false;
  }
  if (input.length < 4 || input.length >= 5) {
    return false;
  }
  if (number > currentYear) {
    return false;
  }
  return true;
}

/**
 * Utilisez une regex pour vérifier si l'entrée contient uniquement des lettres et des chiffres
 * @param {*} input
 * @returns
 */
function isLettersAndDigits(input) {
  const regex = /^[a-zA-Z0-9\s]*$/;
  return regex.test(input);
}

module.exports = {
  isSafeInput,
  isYearNumber,
  isLettersAndDigits,
  isMailValid,
  isPasswordValid,
};
