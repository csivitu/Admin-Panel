const mongoose = require('mongoose')

mongoose
  .connect(process.env.DB_URL || 'mongodb+srv://user:pass@cluster0.random.mongodb.net/myapp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.info('DB connection successful'))
  .catch(() => {
    console.error('DB connection failed')
    process.exit(1)
  })
