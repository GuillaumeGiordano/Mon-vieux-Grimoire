require("dotenv").config();
const express = require("express");

// J'importe mes routes.
// const stuffRoutes = require("./routes/stuff.js");
const userRoutes = require("./routes/user.js");
const path = require("path");

// Connection BDD
const apiUser = process.env.USER_BDD;
const apiKey = process.env.PASSWORD_BDD;
const mongoose = require("mongoose");
mongoose
  .connect(`mongodb+srv://${apiUser}:${apiKey}@cluster0.ec3aaw9.mongodb.net/OC_P7`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

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
// app.use("/api/stuff", stuffRoutes);
// app.use("/images", express.static(path.join(__dirname, "images")));

// EXPORT "app"
module.exports = app;
