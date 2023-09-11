// J'importe "express" dans mon projet.
const express = require("express");

// J'importe les controllers
const stuffCtrl = require("../controllers/stuff.js");

// J'importe le middleware "auth" pour contôler les routes
const auth = require("../middleware/auth.js");

// import de multer
const multer = require("../middleware/multer-config.js");

// Je crée ma variable "router" issue de "express"
const router = express.Router();

// ROUTES & CONTROLLERS
router.post("/", auth, multer, stuffCtrl.createThing);
router.delete("/:id", auth, stuffCtrl.deleteThing);
router.put("/:id", auth, multer, stuffCtrl.updateThing);
router.get("/:id", auth, stuffCtrl.getOneThing);
router.get("/", auth, stuffCtrl.getAllThing);

// Export "router" pour "app"
module.exports = router;
