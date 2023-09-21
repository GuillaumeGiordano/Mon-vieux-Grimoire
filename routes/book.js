// IMPORTS
const express = require("express");
// IMPORTS "middleware"
const auth = require("../middleware/auth.js");
// const validatorBook = require("../middleware/validatorBook.js");
const uploadImage = require("../middleware/upload.js");
const resizeAndSaveToDisk = require("../middleware/resizeAndSaveToDisk.js");
// IMPORTS "controllers"
const BookCtrlCreateNewBook = require("../controllers/book/createNewBook.js");
const BookCtrlGetBestBooks = require("../controllers/book/getBestBooks.js");
const BookCtrlDeleteOneBook = require("../controllers/book/deleteOneBook.js");
const BookCtrlUpdateOneBook = require("../controllers/book/updateOneBook.js");
const BookCtrlGetOneBook = require("../controllers/book/getOneBook.js");
const BookCtrlGetAllBooks = require("../controllers/book/getAllBooks.js");
const BookCtrlNewRating = require("../controllers/book/newRating.js");

// Je crée ma variable "router" issue de "express"
const router = express.Router();

// ROUTES & CONTROLLERS
router.get("/bestrating", BookCtrlGetBestBooks.getBestBooks);
router.get("/", BookCtrlGetAllBooks.getAllBooks);
router.get("/:id", BookCtrlGetOneBook.getOneBook);
router.post(
  "/",
  auth,
  // validatorBook,
  uploadImage,
  resizeAndSaveToDisk,
  BookCtrlCreateNewBook.createNewBook
);
router.put(
  "/:id",
  auth,
  // validatorBook,
  uploadImage,
  resizeAndSaveToDisk,
  BookCtrlUpdateOneBook.updateBook
);
router.delete("/:id", auth, BookCtrlDeleteOneBook.deleteOneBook);
router.post("/:id/rating", auth, BookCtrlNewRating.newRating);

// Export "router" pour "app"
module.exports = router;
