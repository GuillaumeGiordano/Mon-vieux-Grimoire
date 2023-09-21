// Import
const inputValidorUtil = require("../utils/inputValidatorUtil.js");

module.exports = (req, res, next) => {
  try {
    const title = req.body.title;
    const author = req.body.author;
    const year = req.body.year;
    const genre = req.body.genre;

    // Utilisez la fonction de validatin input avec regex
    if (
      !inputValidorUtil.isSafeInput(title) ||
      !inputValidorUtil.isSafeInput(author) ||
      !inputValidorUtil.isSafeInput(year) ||
      !inputValidorUtil.isSafeInput(genre)
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
