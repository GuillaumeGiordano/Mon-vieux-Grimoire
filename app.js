require("dotenv").config();

// IMPORTS
const express = require("express");
const bookRoutes = require("./routes/book.js");
const userRoutes = require("./routes/user.js");
const path = require("path");
const connectDb = require("./config/db.js");

// CNX_BDD
connectDb();

// INIT
const app = express();
app.use(express.json());

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

// app.use("/api/books/bestrating", (req, res, next) => {
//   const Book = require("../models/Book.js");

//   Book.find()
//     .then((books) => {
//       const threeBooks = books
//         .sort((a, b) => b.averageRating - a.averageRating) // Triez les livres par note moyenne décroissante
//         .limit(0, 3); // Limitez les résultats à 3 livres
//       res.status(200).json(threeBooks); // Renvoyez les 3 meilleurs livres
//     })
//     .catch((error) => res.status(400).json({ error }));
//   next();
// });

// ROUTES
app.use("/api/auth", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

// EXPORT "app"
module.exports = app;
