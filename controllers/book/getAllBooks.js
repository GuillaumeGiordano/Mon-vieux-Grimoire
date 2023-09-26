// J'importe mon model "Book"
const Book = require('../../models/Book')

// GET_ALL
exports.getAllBooks = (req, res) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }))
}
