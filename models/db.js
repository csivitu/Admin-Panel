const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' })

mongoose
  .connect(
    process.env.DB_URL,

    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('DB connections successful'))
