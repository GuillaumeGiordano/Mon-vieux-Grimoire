const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    const bookObjet = JSON.parse(req.body.book);
    const titleBook = bookObjet.title.split(" ").join("_");
    const authorBook = bookObjet.author.split(" ").join("_");
    const name = `${titleBook}_${authorBook}_${Date.now()}.${extension}`;
    callback(null, name);
  },
});

module.exports = multer({ storage: storage }).single("image");
