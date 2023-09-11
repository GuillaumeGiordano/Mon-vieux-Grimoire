// J'importe "express" pour créer mon "router"
const express = require("express");
const router = express.Router();

// J'importe le controller "user"
const userCtrl = require("../controllers/user.js");

// ROUTES
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// Export router
module.exports = router;
