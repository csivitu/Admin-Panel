const mongoose = require('mongoose')

mongoose
  .connect(
    process.env.DB_URL || 'mongodb+srv://user:pass@cluster0.random.mongodb.net/myapp',

    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.info('DB connections successful'))
  .catch(() => {
    console.error('DB connections failed')
    process.exit()
  })
