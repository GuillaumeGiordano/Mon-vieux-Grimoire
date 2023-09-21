// Import
const inputValidatorUtil = require("../utils/inputValidatorUtil.js");

module.exports = (req, res, next) => {
  try {
    const mail = req.body.email;
    const password = req.body.password;

    // Utilisez la fonction de validation du mail avec regex
    if (!inputValidatorUtil.isMailValid(mail)) {
      return res.status(412).json({ error: "L'adresse e-mail n'est pas conforme." });
    } else {
      console.log("Mail OK");
    }

    // Utilisez la fonction de validation du mot de passe
    if (!inputValidatorUtil.isPasswordValid(password)) {
      return res
        .status(413)
        .json({ error: "Le mot de passe doit respecter des exigences de complexité." });
    } else {
      console.log("Password OK");
    }

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
