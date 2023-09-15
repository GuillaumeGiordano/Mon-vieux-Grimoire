// J'importe mon model "Book"
const Book = require("../../models/Book.js");
const sharp = require("sharp");

/**
 * fs  signifie « file system » (soit « système de fichiers », en français).
 * Il nous donne accès aux fonctions qui nous permettent de modifier le système de fichiers,
 * y compris aux fonctions permettant de supprimer les fichiers.
 */
const fs = require("fs");

// PUTT
exports.updateBook = (req, res, next) => {
  // On verifi si il y a un fichier ?
  const bookObjet = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }
    : { ...req.body };
  // je supp le "userId" par sécurité !
  delete bookObjet._userId;

  // Je recherche mon objet suivant ID donné en params !
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      // La je vérifie si c'est le bon user !!
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Non autorisé !" });
      } else {
        // Je trouve l'image
        const fileName = book.imageUrl.split("/images/")[1];
        // Je supp l'image du dossier image
        fs.unlink(`images/${fileName}`, () => {
          Book.updateOne({ _id: req.params.id }, { ...bookObjet, _id: req.params.id })
            .then(() => res.status(200).json({ message: "Article modifié, bravo !" }))
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
