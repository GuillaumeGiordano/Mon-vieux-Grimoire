// J'importe mon model "Book"
const Book = require("../../models/Book.js");

// NEW_RATING
exports.newRating = (req, res, next) => {
  const userId = req.body.userId;
  const rating = req.body.rating;
  const bookId = req.params.id;

  // Vérifiez que la note est entre 0 et 5
  if (rating < 0 || rating > 5) {
    return res
      .status(400)
      .json({ message: "La note doit être comprise entre 0 et 5." + error });
  }

  // Recherchez le livre par son ID
  Book.findById({ _id: bookId })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Livre introuvable. " + error });
      }

      // Vérifiez si l'utilisateur a déjà noté ce livre
      const existingRating = book.ratings.find((r) => r.userId === userId);
      if (existingRating) {
        return res
          .status(400)
          .json({ message: "L'utilisateur a déjà noté ce livre. " + error });
      }

      // Ajoutez la nouvelle note à la liste des notations
      book.ratings.push({ userId, grade: rating });

      // Calculez la nouvelle note moyenne
      const totalRatings = book.ratings.length;
      const sumRatings = book.ratings.reduce((sum, r) => sum + r.grade, 0);
      book.averageRating = sumRatings / totalRatings;

      // Enregistrez les modifications dans la base de données
      book
        .save()
        .then(() => res.status(201).json(book))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      res.status(500).json({
        message: "Une erreur est survenue lors de la notation du livre. " + error,
      });
    });
};
