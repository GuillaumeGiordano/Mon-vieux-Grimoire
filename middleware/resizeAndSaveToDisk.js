const sharp = require('sharp')

function resizeAndSaveToDisk(req, res) {
  try {
    if (req.file) {
      const img = req.file.buffer
      const name = req.file.originalname
      sharp(img)
        .resize({ width: 800, height: 800 })
        .toFormat('jpeg')
        .toFile(`images/${name}`)
    }
    // Nettoyer memorystorage de multer !
    req.file.buffer = null
  } catch (err) {
    return res.status(430).json({
      error: "Une erreur s'est produite lors de l'optimisation de l'image",
    })
  }
}
module.exports = resizeAndSaveToDisk
