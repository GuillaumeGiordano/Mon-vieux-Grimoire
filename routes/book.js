// IMPORTS
const express = require("express");
// IMPORTS "middleware"
const auth = require("../middleware/auth.js");
const validatorBook = require("../middleware/validatorBook.js");
const uploadImage = require("../middleware/uploadImage.js");
const resizeAndSaveToDisk = require("../middleware/resizeAndSaveToDisk.js");
// IMPORTS "controllers"
const { createNewBook } = require("../controllers/book/createNewBook.js");
const { getBestBooks } = require("../controllers/book/getBestBooks.js");
const { deleteOneBook } = require("../controllers/book/deleteOneBook.js");
const { updateBook } = require("../controllers/book/updateOneBook.js");
const { getOneBook } = require("../controllers/book/getOneBook.js");
const { getAllBooks } = require("../controllers/book/getAllBooks.js");
const { newRating } = require("../controllers/book/newRating.js");

// Je crée ma variable "router" issue de "express"
const router = express.Router();

// ROUTES & CONTROLLERS
router.get("/bestrating", getBestBooks);
router.get("/", getAllBooks);
router.get("/:id", getOneBook);
router.post("/", auth, uploadImage, validatorBook, resizeAndSaveToDisk, createNewBook);
router.put("/:id", auth, uploadImage, validatorBook, resizeAndSaveToDisk, updateBook);
router.delete("/:id", auth, deleteOneBook);
router.post("/:id/rating", auth, newRating);

// Export "router" pour "app"
module.exports = router;
