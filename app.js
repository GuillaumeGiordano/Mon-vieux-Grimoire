require("dotenv").config();

// IMPORTS
const express = require("express");
const helmet = require("helmet");
const bookRoutes = require("./routes/book.js");
const userRoutes = require("./routes/user.js");
const path = require("path");
const connectDb = require("./config/db.js");

// CNX_BDD
connectDb();

// INIT "express"
const app = express();
app.use(express.json());

// Utilisation de helmet pour activer les en-têtes sécurisés
app.use(helmet());

/*
 Configuration d'une CSP de base,Pour vérifier et
 protéger votre application Express contre les tentatives
 d'injection de code XSS (Cross-Site Scripting)
*/
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
    },
  })
);

// CONFIG du Headers : cela permet de faire communiquer deux serveur entre eux.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

// ROUTES
app.use("/api/auth", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

// EXPORT "app"
module.exports = app;
