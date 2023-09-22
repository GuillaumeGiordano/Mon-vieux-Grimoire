// Import
const { isLettersAndDigits, isYearNumber } = require("../utils/inputValidatorUtil.js");

function validatorBook(req, res, next) {
  try {
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
    if (!isLettersAndDigits(title)) {
      return res
        .status(441)
        .json({ error: "Title contient des caractères non autorisés." });
    }

    // Utilisez la fonction de validatin input avec regex
    if (!isLettersAndDigits(author)) {
      return res
        .status(442)
        .json({ error: "author contient des caractères non autorisés." });
    }

    // Utilisez la fonction de validatin input avec regex
    if (!isLettersAndDigits(genre)) {
      return res
        .status(443)
        .json({ error: "Genre contient des caractères non autorisés." });
    }

    // Utilisez la fonction de validatin input
    if (!isYearNumber(year)) {
      return res
        .status(444)
        .json({ error: "Year contient des caractères non autorisés." });
    }

    next();
  } catch (error) {
    res.status(440).json({ message: "Pas de chance ! Ca ne fonctionne pas :( " });
  }
}

module.exports = validatorBook;
