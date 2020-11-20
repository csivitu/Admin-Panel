const mongoose = require('mongoose')

function connectMongo (dbURL) {
  return mongoose
    .createConnection(dbURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
}

module.exports = connectMongo
