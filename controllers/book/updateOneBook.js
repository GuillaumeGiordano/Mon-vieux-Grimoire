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
exports.updateBook = async (req, res, next) => {
  // Initialise ma variable
  let bookObjet = {};

  if (req.file) {
    // Je défini le nom de ma photo
    const name = req.file.originalname;
    bookObjet = {
      ...JSON.parse(req.body.book),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${name}`,
    };
  } else {
    bookObjet = { ...req.body };
  }

  //  je supp le "userId" car je ne souhaite pas le modifier !
  delete bookObjet._userId;

  // Je recherche mon objet suivant ID donné en params !
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      // La je vérifie si c'est le bon user !!
      if (book.userId != req.auth.userId) {
        return res.status(401).json({ message: "Non autorisé !" });
      }

      // Je supp l'ancienne image du dossier images
      try {
        const oldFileName = book.imageUrl.split("/images/")[1];
        fs.unlinkSync(`images/${oldFileName}`);
      } catch (error) {
        console.log("Pas possible de supprimer l'ancienne image");
      }

      // Je modifie mon enregistrement
      Book.updateOne({ _id: req.params.id }, { ...bookObjet, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Article modifié, bravo !" }))
        .catch((error) => {
          console.log("Article non modifié, dommage !");
          res.status(401).json({ error, message: "Article non modifié, dommage !" });
        });
    })
    .catch((error) => {
      console.log("Article non trouvé, dommage !");
      res.status(400).json({ error, message: "Article non trouvé, dommage !" });
    });
};
