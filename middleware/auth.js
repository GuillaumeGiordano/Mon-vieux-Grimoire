const jwt = require("jsonwebtoken");
const RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET;

// Permet d'exporter suivant le nom du fichier !
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, RANDOM_TOKEN_SECRET);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };

    next();
  } catch (error) {
    res.status(410).json({ message: "Authentification a échoué !" });
  }
};
