// IMPORTS
const bcrypt = require('bcrypt')

const User = require('../../models/User')

// SIGNUP
exports.signUp = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      })
      user
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((error) =>
          res
            .status(400)
            .json({ message: `c'est ici pour le mail en double ! ${error}` }),
        )
    })
    .catch((error) =>
      res.status(500).json({ message: `Sign Up echec ! ${error}` }),
    )
}
