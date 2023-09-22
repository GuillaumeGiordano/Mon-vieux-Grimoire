// J'importe "express" pour créer mon "router"
const express = require("express");
const router = express.Router();
// J'importe les middlewears
const validatorUser = require("../middleware/validatorUser.js");
// J'importe le controller "user"
const { signUp } = require("../controllers/user/signUp.js");
const { login } = require("../controllers/user/login.js");

// ROUTES
router.post("/signup", validatorUser, signUp);
router.post("/login", validatorUser, login);

// Export router
module.exports = router;
