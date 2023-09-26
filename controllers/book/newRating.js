// J'importe mon model "Book"
const Book = require('../../models/Book')

// NEW_RATING
exports.newRating = (req, res) => {
  const { userId } = req.body
  const { rating } = req.body
  const bookId = req.params.id

  // Vérifiez que la note est entre 0 et 5
  if (rating < 0 || rating > 5) {
    return res
      .status(400)
      .json({ message: `La note doit être comprise entre 0 et 5.` })
  }

  // Recherchez le livre par son ID
  Book.findById({ _id: bookId })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: 'Livre introuvable. ' })
      }

      // Vérifiez si l'utilisateur a déjà noté ce livre
      const existingRating = book.ratings.find((r) => r.userId === userId)
      if (existingRating) {
        return res
          .status(400)
          .json({ message: "L'utilisateur a déjà noté ce livre. " })
      }

      // Ajoutez la nouvelle note à la liste des notations
      book.ratings.push({ userId, grade: rating })

      // Calculez la nouvelle note moyenne
      const totalRatings = book.ratings.length
      const sumRatings = book.ratings.reduce((sum, r) => sum + r.grade, 0)
      // eslint-disable-next-line no-param-reassign
      book.averageRating = sumRatings / totalRatings

      // Enregistrez les modifications dans la base de données
      book
        .save()
        .then(() => res.status(201).json(book))
        .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => {
      res.status(500).json({
        message: `Une erreur est survenue lors de la notation du livre.${error}`,
      })
    })
}
