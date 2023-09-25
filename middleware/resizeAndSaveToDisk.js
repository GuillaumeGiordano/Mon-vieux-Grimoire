// imageService.js
const sharp = require("sharp");

function resizeAndSaveToDisk(req, res, next) {
  try {
    if (req.file) {
      // Je parse la requete modifier par multer :
      //JSON.parse() transforme un objet stringifié en Object JavaScript exploitable.
      const bookObjet = JSON.parse(req.body.book);

      // Je défini le nom de ma photo
      const extension = "jpeg";
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
    }
    // NEttoyer memorystorage !
    req.file.buffer = null;
    next();
  } catch (err) {
    return res
      .status(430)
      .json({ error: "Une erreur s'est produite lors de l'optimisation de l'image" });
  }
}

module.exports = resizeAndSaveToDisk;
