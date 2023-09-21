// J'importe "express" pour créer mon "router"
const express = require("express");
const router = express.Router();
// J'importe les middlewears
const validatorUser = require("../middleware/validatorUser.js");
// J'importe le controller "user"
const signUpCtrl = require("../controllers/user/signUp.js");
const loginCtrl = require("../controllers/user/login.js");

// ROUTES
router.post("/signup", validatorUser, signUpCtrl.signUp);
router.post("/login", validatorUser, loginCtrl.login);

// Export router
module.exports = router;
