const jwt = require('jsonwebtoken')

const { RANDOM_TOKEN_SECRET } = process.env

// Permet d'exporter suivant le nom du fichier garde pour exemple !
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.decode(token, RANDOM_TOKEN_SECRET)
    const { userId } = decodedToken
    req.auth = {
      userId,
    }

    next()
  } catch (error) {
    res.status(410).json({ message: 'Authentification a échoué !' })
  }
}
