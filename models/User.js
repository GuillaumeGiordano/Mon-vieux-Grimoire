// J'importe "mongoose" pour l'utiliser
const mongoose = require("mongoose");

// J'importe le package "mongoose-unique-validator"
const uniqueValidator = require("mongoose-unique-validator");

// Je crée mon Schema.
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Cela permet de s'assurer que les uniques le sont bien !
userSchema.plugin(uniqueValidator);

// J'exporte mon Schema pour l'utiliser.
module.exports = mongoose.model("User", userSchema);
