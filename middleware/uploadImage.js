const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage })
const { isFileExtentionValid } = require('../utils/fileValidatorUtil')

function uploadImage(req, res, next) {
  try {
    upload.single('image')(req, res, () => {
      if (req.file) {
        if (!isFileExtentionValid(req.file.originalname)) {
          return res
            .status(421)
            .json({ message: 'Extension de fichier non autorisée' })
        }
      }

      next()
    })
  } catch (err) {
    return res.status(420).json({
      message: "Une erreur s'est produite lors de l'upload de l'image",
    })
  }
}

module.exports = uploadImage
