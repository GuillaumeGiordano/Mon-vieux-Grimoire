// J'importe mon model "Book"
const Book = require("../models/Book.js");
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

// POST
exports.createBook = async (req, res, next) => {
  // Je vérifi si j'ai bien un file dans ma requete !
  if (!req.file) {
    return res.status(400).json({ message: "Aucune image téléchargée." });
  }

  // je récupére son nom et son extention
  const imageName = req.file.filename;
  const extention = req.file.mimetype.replace(/^image\//i, "");
  console.log("le nom de l'image envoyé par multer : " + imageName);
  console.log("l'extention de l'image' : " + extention);

  // Je récupére l'image stocké par multer
  const imagePath = `${req.protocol}://${req.get("host")}/images/${imageName}`;
  const imagePath2 = req.file.path;
  console.log("le imagePath : " + imagePath);
  console.log("le imagePath 2 : " + imagePath2);

  // Nouveau name de l'image opti
  const optimizedImage = `${imageName}_opti_${Date.now()}.${extention}`;

  // Je redimmenssione l'image
  await sharp(imagePath2)
    .resize({ width: 800, height: 600 })
    .toFile(`images/${optimizedImage}`);

  // Supprimez l'ancien fichier image
  fs.unlinkSync(imagePath2);

  // Je parse la requete modifier par multer : JSON.parse() transforme un objet stringifié en Object JavaScript exploitable.
  const bookObjet = JSON.parse(req.body.book);

  // Je supp les ID car mongoDB le fait auto et je ne fais pas confiance au user !
  delete bookObjet._id;
  delete bookObjet._userId;

  // Je crée mon nouveau objet avec un spray operateur en rajoutant les données
  const book = new Book({
    ...bookObjet,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${optimizedImage}`,
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
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};

// NEW_RATING
exports.createRating = (req, res, next) => {
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
      return book.save();
    })
    .then((updateBook) => {
      console.log(updateBook);
      res.status(200).json({ updateBook });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Une erreur est survenue lors de la notation du livre. " + error,
      });
    });
};
