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

// ROUTES
app.use("/api/auth", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

// EXPORT "app"
module.exports = app;
