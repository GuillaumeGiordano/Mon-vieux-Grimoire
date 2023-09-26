// IMPORTS
const express = require('express')
// IMPORTS "middleware"
const auth = require('../middleware/auth')
const validatorBook = require('../middleware/validatorBook')
const uploadImage = require('../middleware/uploadImage')
const resizeAndSaveToDisk = require('../middleware/resizeAndSaveToDisk')
const newNameFile = require('../middleware/newNameFile')

// IMPORTS "controllers"
const { createNewBook } = require('../controllers/book/createNewBook')
const { getBestBooks } = require('../controllers/book/getBestBooks')
const { deleteOneBook } = require('../controllers/book/deleteOneBook')
const { updateBook } = require('../controllers/book/updateOneBook')
const { getOneBook } = require('../controllers/book/getOneBook')
const { getAllBooks } = require('../controllers/book/getAllBooks')
const { newRating } = require('../controllers/book/newRating')

// Je crée ma variable "router" issue de "express"
const router = express.Router()

// ROUTES & CONTROLLERS
router.get('/bestrating', getBestBooks)
router.get('/', getAllBooks)
router.get('/:id', getOneBook)
router.post(
  '/',
  auth,
  uploadImage,
  validatorBook,
  newNameFile,
  createNewBook,
  resizeAndSaveToDisk,
)
router.put(
  '/:id',
  auth,
  uploadImage,
  validatorBook,
  newNameFile,
  updateBook,
  resizeAndSaveToDisk,
)
router.delete('/:id', auth, deleteOneBook)
router.post('/:id/rating', auth, newRating)

// Export "router" pour "app"
module.exports = router
