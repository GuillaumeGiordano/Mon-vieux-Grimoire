const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const fileValidatorUtil = require("../utils/fileValidatorUtil");

function uploadImage(req, res, next) {
  try {
    upload.single("image")(req, res, (err) => {
      if (req.file) {
        if (!fileValidatorUtil.isFileExtentionValid(req.file.originalname)) {
          return res.status(421).json({ error: "Extension de fichier non autorisée" });
        }
      }

      next();
    });
  } catch (err) {
    return res
      .status(420)
      .json({ error: "Une erreur s'est produite lors de l'upload de l'image 2" });
  }
}

module.exports = { uploadImage };
