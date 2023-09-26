const fs = require('fs')

function isFolderExist(req, res, next) {
  const dossier = `./images`

  // Vérifiez si le dossier existe
  if (!fs.existsSync(dossier)) {
    // Créez le dossier s'il n'existe pas
    fs.mkdirSync(dossier)
    console.log('Le dossier a été créé avec succès.')
  } else {
    console.log('Le dossier existe déjà.')
  }
  next()
}

module.exports = {
  isFolderExist,
}
