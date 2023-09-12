const mongoose = require("mongoose");
const apiUser = process.env.USER_BDD;
const apiKey = process.env.PASSWORD_BDD;

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      `mongodb+srv://${apiUser}:${apiKey}@cluster0.ec3aaw9.mongodb.net/OC_P7`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connexion à MongoDB réussie !");
  } catch (error) {
    console.log("Connexion à MongoDB échouée ! : " + error);
    process.exit();
  }
};

module.exports = connectDb;
