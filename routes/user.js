// J'importe "express" pour créer mon "router"
const express = require('express')

const router = express.Router()
// J'importe les middlewears
const validatorUser = require('../middleware/validatorUser')
// J'importe le controller "user"
const { signUp } = require('../controllers/user/signUp')
const { login } = require('../controllers/user/login')

// ROUTES
router.post('/signup', validatorUser, signUp)
router.post('/login', validatorUser, login)

// Export router
module.exports = router
