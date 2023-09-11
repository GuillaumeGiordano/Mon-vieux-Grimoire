// J'importe mon model "Book"
const Book = require("../models/Book.js");

/**
 * fs  signifie « file system » (soit « système de fichiers », en français).
 * Il nous donne accès aux fonctions qui nous permettent de modifier le système de fichiers,
 * y compris aux fonctions permettant de supprimer les fichiers.
 */
const fs = require("fs");

// POST
exports.createBook = (req, res, next) => {
  // Je parse la requete modifier par multer : JSON.parse() transforme un objet stringifié en Object JavaScript exploitable.
  console.log(req);
  const bookObjet = JSON.parse(req.body.book);
  // Je supp les ID car mongoDB le fait auto et je ne fais pas confiance au user !
  delete bookObjet._id;
  delete bookObjet._userId;
  // Je crée mon nouveau objet avec un spray operateur en rajoutant les données
  const book = new Book({
    ...bookObjet,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  // je sauvegarde mon nouveau "book"
  book
    .save()
    .then(() => res.status(201).json({ message: "Nouveau livre enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

// DELETE
exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userID != req.auth.id) {
        res.status(401).json({ message: "Non autorisé !" });
      } else {
        // Je trouve l'image
        const fileName = book.imageUrl.split("/images/")[1];
        // Je supp l'image
        fs.unlink(`images/${fileName}`, () => {
          book
            .deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Article supprimé, bravo !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

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

// GET_ONE
exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
};

// GET_ALL
exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(400).json({ error }));
};

// GET_BEST_BOOKS
// exports.getBestBooks = (req, res, next) => {

// };

// RATING
// exports.updateRating = (req, res, next) => {

// };
