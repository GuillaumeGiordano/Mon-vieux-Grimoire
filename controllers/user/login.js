// IMPORTS
const User = require("../../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET;
const TOKEN_TIME = process.env.TOKEN_TIME;

// LOGIN
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              {
                userId: user._id,
                role: "ADMIN",
              },
              RANDOM_TOKEN_SECRET,
              {
                expiresIn: TOKEN_TIME,
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ message: "error 500" })); // pour donner le - d'indice !!
    })
    .catch((error) => res.status(500).json({ error }));
};
