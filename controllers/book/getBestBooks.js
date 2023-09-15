// J'importe mon model "Book"
const Book = require("../../models/Book.js");
const sharp = require("sharp");

/**
 * fs  signifie « file system » (soit « système de fichiers », en français).
 * Il nous donne accès aux fonctions qui nous permettent de modifier le système de fichiers,
 * y compris aux fonctions permettant de supprimer les fichiers.
 */
const fs = require("fs");

// GET_BEST_BOOKS
exports.getBestBooks = (req, res, next) => {
  Book.find()
    .sort({ averageRating: -1 }) // Triez les livres par note moyenne décroissante
    .limit(3) // Limitez les résultats à 3 livres
    .then((books) => {
      res.status(200).json(books); // Renvoyez les 3 meilleurs livres
    })
    .catch((error) => res.status(400).json({ error }));
};
