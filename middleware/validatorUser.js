// Import
const inputValidatorUtil = require('../utils/inputValidatorUtil')

// Methode export par nom du fichier pour changer !
function validatorUser(req, res, next) {
  try {
    // Je récupere les variables email et password avec la methode destructuré
    const { email, password } = req.body

    // Utilisez la fonction de validation du mail avec regex
    if (!inputValidatorUtil.isMailValid(email)) {
      return res.status(412).json({
        message: "L'adresse e-mail doit respecter des exigences de complexité.",
      })
    }

    // Utilisez la fonction de validation du mot de passe
    if (!inputValidatorUtil.isPasswordValid(password)) {
      return res.status(413).json({
        message: 'Le mot de passe doit respecter des exigences de complexité.',
      })
    }

    next()
  } catch (error) {
    res.status(401).json({ error })
  }
}

module.exports = validatorUser
