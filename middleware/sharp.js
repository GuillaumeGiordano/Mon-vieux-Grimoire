module.exports = async (req, res, next) => {
  try {
    // Je vérifi si j'ai bien un file dans ma requete !
    if (!req.file) {
      return res.status(400).json({ message: "Aucune image téléchargée." });
    }
    console.log(req.file);
    // je récupére son nom et son extention
    const imageName = req.file.filename;
    // const extention = req.file.mimetype.replace(/^image\//i, "");
    const extention = "png";

    console.log("le nom de l'image envoyé par multer : " + imageName);
    console.log("l'extention de l'image' : " + extention);

    // Je récupére l'image stocké par multer
    const imagePath = req.file.path;
    console.log("le imagePath : " + imagePath);

    // Nouveau name de l'image opti
    const optimizedImage = `${imageName}_opti_${Date.now()}.${extention}`;

    // Je redimmenssione l'image
    await sharp(imagePath)
      .resize({ width: 800, height: 600 })
      .toFile(`images/${optimizedImage}`);

    // Supprimez l'ancien fichier image
    fs.unlinkSync(imagePath);
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};
