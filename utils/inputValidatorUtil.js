function isSafeInput(input) {
  // regex détecter les balises HTML, JavaScript et les attributs couramment utilisés dans les attaques XSS :
  const regex = /<[a-zA-Z][^\s]*\s*\/?>|<\/[a-zA-Z]+>|javascript:|on[a-zA-Z]+=/i;
  return regex.test(input);
}

module.exports = {
  isSafeInput,
};
