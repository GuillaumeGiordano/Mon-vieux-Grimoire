// J'importe mon model "Book"
const Book = require("../../models/Book");

/**
 * fs  signifie « file system » (soit « système de fichiers », en français).
 * Il nous donne accès aux fonctions qui nous permettent de modifier le système de fichiers,
 * y compris aux fonctions permettant de supprimer les fichiers.
 */
const fs = require("fs");

// POST
exports.createNewBook = async (req, res, next) => {
  // Je vérifi si j'ai bien un file dans la requete !
  if (!req.file) {
    return res.status(400).json({ message: "Aucun fichier envoyé !" });
  }

  // Je parse la requete modifier par multer : JSON.parse() transforme un objet stringifié en Object JavaScript exploitable.
  const bookObjet = JSON.parse(req.body.book);

  // Je défini le nom de ma photo
  const name = req.file.originalname;

  // Je supp les ID car mongoDB le fait auto et je ne fais pas confiance au user !
  delete bookObjet._id;
  delete bookObjet._userId;

  // Je crée mon nouveau objet avec un spray operateur en rajoutant les données
  const book = new Book({
    ...bookObjet,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${name}`,
  });

  // je sauvegarde mon nouveau "book"
  book
    .save()
    .then(() => res.status(201).json({ message: "Nouveau livre enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};
