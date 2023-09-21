// Import
const mailValidorUtil = require("../utils/mailValidatorUtil.js");
const passwordValidorUtils = require("../utils/passwordValidatorUtils.js");

module.exports = (req, res, next) => {
  try {
    const mail = req.body.email;
    const password = req.body.password;

    // Utilisez la fonction de validation du mail avec regex
    if (!mailValidorUtil.isMailValid(mail)) {
      return res.status(412).json({ error: "L'adresse e-mail n'est pas conforme." });
    }

    // Utilisez la fonction de validation du mot de passe
    if (!passwordValidorUtils.isPasswordValid(password)) {
      return res
        .status(413)
        .json({ error: "Le mot de passe doit respecter des exigences de complexité." });
    }

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
