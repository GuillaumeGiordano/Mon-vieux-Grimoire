const mongoose = require('mongoose')

const { MONGODB_KEY } = process.env

async function connectDb() {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(MONGODB_KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    // eslint-disable-next-line no-console
    return console.log('MongoDB OK')
  } catch (error) {
    process.exit()
  }
}

module.exports = { connectDb }
