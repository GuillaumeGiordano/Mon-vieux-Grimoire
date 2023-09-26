// J'importe "mongoose" pour l'utiliser
const mongoose = require('mongoose')

// Je crée mon Schema.
const bookSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings: [
    {
      userId: { type: String, required: true },
      grade: { type: Number, required: true },
    },
  ],
  averageRating: { type: Number, required: true },
})

// J'exporte mon Schema pour l'utiliser.
module.exports = mongoose.model('Book', bookSchema)
