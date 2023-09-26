// IMPORTS
const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

// SCHEMA
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

// UNIQUE ?
userSchema.plugin(uniqueValidator)

// EXPORT
module.exports = mongoose.model('User', userSchema)
