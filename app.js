require('dotenv').config()

// IMPORTS
const express = require('express')
const path = require('path')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const bookRoutes = require('./routes/book')
const userRoutes = require('./routes/user')
const { connectDb } = require('./config/db')
const { isFolderExist } = require('./middleware/isFolderExist')

// CNX_BDD
connectDb()

// INIT "express"
const app = express()
app.use(express.json())

/*
 Configuration d'une CSP de base,Pour vérifier et
 protéger votre application Express contre les tentatives
 d'injection de code XSS (Cross-Site Scripting)
*/
// Utilisation de helmet pour activer les en-têtes sécurisés
app.use(
  helmet({
    contentSecurityPolicy: true,
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: false,
    dnsPrefetchControl: true,
    expectCt: true,
    frameguard: true,
    hidePoweredBy: true,
    hsts: true,
    ieNoOpen: true,
    noSniff: true,
    referrerPolicy: true,
    xssFilter: true,
  }),
)

// CONFIG du Headers : cela permet de faire communiquer deux serveur entre eux.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  )
  next()
})

// express-rate-limit qui nous permettra de configurer la limitation de taux sur notre API
app.use(
  rateLimit({
    windowMs: 60 * 1000, // période d'une minute
    max: 10,
    message: 'Vous avez atteint la limite de 10 requêtes par minutes !',
    headers: true,
  }),
)

// Je vérifie si ./images existe !
app.use(isFolderExist)

// ROUTES
app.use('/api/auth', userRoutes)
app.use('/api/books', bookRoutes)

// Servez des images statiques directement depuis le répertoire "images"
app.use('/images', express.static(path.join(__dirname, 'images')))

// EXPORT "app"
module.exports = app
