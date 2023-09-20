// imageService.js
const sharp = require("sharp");

function resizeAndSaveToDisk(req, res, next) {
  try {
    // Je vérifi si j'ai bien un file dans ma requete !
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "Aucun fichier envoyé de multer !" });
    }

    // Je parse la requete modifier par multer : JSON.parse() transforme un objet stringifié en Object JavaScript exploitable.
    const bookObjet = JSON.parse(req.body.book);

    // Je défini le nom de ma photo
    const extension = "jpg";
    const titleBook = bookObjet.title.split(" ").join("_");
    const authorBook = bookObjet.author.split(" ").join("_");
    const name = `${titleBook}_${authorBook}_${Date.now()}_Optimized.${extension}`;

    // Je modifi le nom de mon image
    req.file.originalname = name;

    // Optimiser l'image
    const img = req.file.buffer;
    sharp(img)
      .resize({ width: 800, height: 800 })
      .toFormat(extension)
      .toFile(`images/${name}`);

    next();
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Une erreur s'est produite lors de l'optimisation de l'image" });
  }
}

module.exports = resizeAndSaveToDisk;
