const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function uploadImage(req, res, next) {
  try {
    upload.single("image")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: "Erreur lors de l'upload de l'image" });
      }
      console.log("upload :");
      console.log(req.file);
      // Récupérez le nom du fichier original
      const originalFileName = req.file.originalname;

      // Obtenez l'extension du fichier en divisant le nom de fichier par le point (.)
      const fileExtension = originalFileName.split(".").pop().toLowerCase();

      // Liste des extensions autorisées
      const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

      // Vérifiez si l'extension est autorisée
      if (!allowedExtensions.includes(fileExtension)) {
        return res.status(400).json({ error: "Extension de fichier non autorisée" });
      }

      next();
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Une erreur s'est produite lors de l'upload de l'image" });
  }
}

module.exports = uploadImage;
