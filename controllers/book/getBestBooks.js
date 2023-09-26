// J'importe mon model "Book"
const Book = require('../../models/Book')

// GET_BEST_BOOKS
exports.getBestBooks = (req, res) => {
  Book.find()
    .sort({ averageRating: -1 }) // Triez les livres par note moyenne décroissante
    .limit(3) // Limitez les résultats à 3 livres
    .then((books) => {
      res.status(200).json(books) // Renvoyez les 3 meilleurs livres
    })
    .catch((error) => res.status(400).json({ error }))
}
