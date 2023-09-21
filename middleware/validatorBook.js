// Import
const inputValidatorUtil = require("../utils/inputValidatorUtil.js");

module.exports = (req, res, next) => {
  try {
    console.log(req.body);
    const title = req.body.title;
    const author = req.body.author;
    const year = req.body.year;
    const genre = req.body.genre;
    // Utilisez la fonction de validatin input avec regex
    if (
      !inputValidatorUtil.isLettersAndDigits(title) ||
      !inputValidatorUtil.isLettersAndDigits(author) ||
      !inputValidatorUtil.isLettersAndDigits(genre) ||
      !inputValidatorUtil.isYearNumber(year)
    ) {
      return res
        .status(410)
        .json({ error: "L'entrée contient des caractères non autorisés." });
    }

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
