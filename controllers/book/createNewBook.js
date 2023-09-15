// J'importe mon model "Book"
const Book = require("../../models/Book");
const sharp = require("sharp");

/**
 * fs  signifie « file system » (soit « système de fichiers », en français).
 * Il nous donne accès aux fonctions qui nous permettent de modifier le système de fichiers,
 * y compris aux fonctions permettant de supprimer les fichiers.
 */
const fs = require("fs");

// POST
exports.createNewBook = async (req, res, next) => {
  // Je vérifi si j'ai bien un file dans ma requete !
  if (!req.file) {
    return res.status(400).json({ message: "Aucune image téléchargée." });
  }

  // je récupére son nom et son extention
  const imageName = req.file.filename.replace(/\.[^.]+$/, "");

  // const extention = req.file.mimetype.replace(/^image\//i, "");
  const extention = "png";

  // Je récupére l'image stocké par multer
  const imagePath = req.file.path;

  // Nouveau name de l'image opti
  const optimizedImage = `${imageName}_optimized.${extention}`;

  // Je redimmenssione l'image
  await sharp(imagePath)
    .resize({ width: 800, height: 600 })
    .toFile(`images/${optimizedImage}`);

  // Supprimez l'ancien fichier image methode sync !!
  fs.unlinkSync(imagePath);

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
