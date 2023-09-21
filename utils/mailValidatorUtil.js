function isMailValid(email) {
  // Utilisez une regex pour valider l'adresse e-mail
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}

module.exports = {
  isMailValid,
};
