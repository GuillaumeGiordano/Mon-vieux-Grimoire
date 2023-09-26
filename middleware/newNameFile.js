function newNameFile(req, res, next) {
  try {
    if (req.file) {
      // Je parse la requete modifier par multer :
      // JSON.parse() transforme un objet stringifié en Object JavaScript exploitable.
      const bookObjet = JSON.parse(req.body.book)

      // Je défini le nom de ma photo
      const extension = 'jpeg'
      const titleBook = bookObjet.title.split(' ').join('_')
      const authorBook = bookObjet.author.split(' ').join('_')
      const name = `${titleBook}_${authorBook}_${Date.now()}_Optimized.${extension}`

      // Je modifi le nom de mon image dans le req.body !
      req.file.originalname = name
      next()
    }
  } catch (error) {
    return res.status(430).json({
      error: "Une erreur s'est produite lors de rename de l'image",
    })
  }
}

module.exports = newNameFile
