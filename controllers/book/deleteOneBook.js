// J'importe mon model "Book"
const Book = require("../../models/Book.js");

/**
 * fs  signifie « file system » (soit « système de fichiers », en français).
 * Il nous donne accès aux fonctions qui nous permettent de modifier le système de fichiers,
 * y compris aux fonctions permettant de supprimer les fichiers.
 */
const fs = require("fs");

// DELETE
exports.deleteOneBook = (req, res, next) => {
  // Je recherche "LE" Book suivant son ID methode promesse
  Book.findOne({ _id: req.params.id })
    // Quand je l'ai trouvé j'exécute mon code suivant
    .then((book) => {
      // Je vérifie si le user est le créateur de cet enregistrement
      if (book.userID != req.auth.id) {
        return res.status(401).json({ message: "Non autorisé !" });
      }

      // Je trouve l'image
      const fileName = book.imageUrl.split("/images/")[1];

      // Je supp l'image
      fs.unlinkSync(`images/${fileName}`);

      // Je supprime !
      book
        .deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Article supprimé, bravo !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
