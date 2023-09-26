// IMPORTS
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../../models/User')

const { RANDOM_TOKEN_SECRET } = process.env
const { TOKEN_TIME } = process.env

// LOGIN
exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: 'Paire login/mot de passe incorrecte 1' })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: 'Paire login/mot de passe incorrecte 2' })
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              {
                userId: user._id,
                role: 'ADMIN',
              },
              RANDOM_TOKEN_SECRET,
              {
                expiresIn: TOKEN_TIME,
              },
            ),
          })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}
