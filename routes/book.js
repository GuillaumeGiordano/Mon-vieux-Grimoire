// IMPORTS
const express = require("express");
const auth = require("../middleware/auth.js");
const bookCtrl = require("../controllers/book.js");
const multer = require("../middleware/multer-config.js");

// Je crée ma variable "router" issue de "express"
const router = express.Router();

// ROUTES & CONTROLLERS
router.get("/", bookCtrl.getAllBooks);
router.get("/:id", bookCtrl.getOneBook);
router.post("/", auth, multer, bookCtrl.createBook);
router.put("/:id", auth, multer, bookCtrl.updateBook);
router.delete("/:id", auth, bookCtrl.deleteBook);
router.get("/bestrating", bookCtrl.getBestBooks);
router.post("/:id/rating", auth, bookCtrl.createRating);

// Export "router" pour "app"
module.exports = router;
