// Import
const inputValidatorUtil = require("../utils/inputValidatorUtil.js");

function validatorBook(req, res, next) {
  try {
    // Je parse la requete modifier par multer : JSON.parse() transforme un objet stringifié en Object JavaScript exploitable.

    let myBook = {};

    if (!req.file) {
      myBook = req.body;
    } else {
      // Multer est passé par la !
      myBook = JSON.parse(req.body.book);
    }

    // Mes variables à vérifier !
    const { title, author, year, genre } = myBook;

    // Utilisez la fonction de validatin input avec regex
    if (!inputValidatorUtil.isLettersAndDigits(title)) {
      return res
        .status(441)
        .json({ error: "Title contient des caractères non autorisés." });
    }

    // Utilisez la fonction de validatin input avec regex
    if (!inputValidatorUtil.isLettersAndDigits(author)) {
      return res
        .status(442)
        .json({ error: "author contient des caractères non autorisés." });
    }

    // Utilisez la fonction de validatin input avec regex
    if (!inputValidatorUtil.isLettersAndDigits(genre)) {
      return res
        .status(443)
        .json({ error: "Genre contient des caractères non autorisés." });
    }

    // Utilisez la fonction de validatin input avec regex
    if (!inputValidatorUtil.isYearNumber(year)) {
      return res
        .status(444)
        .json({ error: "Year contient des caractères non autorisés." });
    }

    next();
  } catch (error) {
    res.status(440).json({ message: "pas bon !" });
  }
}

module.exports = { validatorBook };
