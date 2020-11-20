const mongoose = require('mongoose')

mongoose
  .connect(process.env.DB_URL || 'mongodb+srv://user:pass@cluster0.random.mongodb.net/myapp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log({ name: 'Admin-Panel', status: 'Status: connected' }))
  .catch((e) => {
    console.error({ name: 'Admin-Panel', error: e.toString() })
    process.exit(1)
  })
