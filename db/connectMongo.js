const mongoose = require('mongoose')

function connectMongo (dbURL) {
  try {
    return mongoose
      .createConnection(dbURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      })
  } catch (e) {
    return Promise.reject(e)
  }
}

module.exports = connectMongo
