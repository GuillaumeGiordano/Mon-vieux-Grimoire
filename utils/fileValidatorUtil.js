function isFileExtentionValid(originalname) {
  try {
    const originalFileName = originalname

    // Obtenez l'extension du fichier en divisant le nom de fichier par le point (.)
    const fileExtension = originalFileName.split('.').pop().toLowerCase()

    // Liste des extensions autorisées
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif']

    // Vérifiez si l'extension est autorisée
    if (!allowedExtensions.includes(fileExtension)) {
      return false
    }

    return true
  } catch (error) {
    console.log('erreur sur le code ! ')
  }
}

module.exports = { isFileExtentionValid }
