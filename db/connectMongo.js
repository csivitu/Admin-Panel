const mongoose = require('mongoose')

async function connectMongo (dbURL) {
  try {
    const connection = await mongoose
      .createConnection(dbURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      })
    return connection
  } catch (e) {
    return Promise.reject(e)
  }
}

module.exports = connectMongo
