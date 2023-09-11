require("dotenv").config();
const mongoose = require("mongoose");

function cnx() {
  const apiUser = process.env.USER_BDD;
  const apiKey = process.env.PASSWORD_BDD;

  mongoose
    .connect(`mongodb+srv://${apiUser}:${apiKey}@cluster0.ec3aaw9.mongodb.net/OC_P7`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connexion à MongoDB réussie2 !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));
}
