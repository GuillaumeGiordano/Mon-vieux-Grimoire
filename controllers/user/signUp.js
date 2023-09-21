// IMPORTS
const User = require("../../models/User.js");
const bcrypt = require("bcrypt");

// SIGNUP
exports.signUp = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) =>
          res.status(400).json({ message: "c'est ici pour le mail en double !" })
        );
    })
    .catch((error) => res.status(500).json({ message: "Sign Up echec !" }));
};
