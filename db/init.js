/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose
  .connect(process.env.DB_URL || 'mongodb+srv://user:pass@cluster0.random.mongodb.net/myapp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log({ Message: 'DB connected successfully', error: 'Value: null' }))
  .catch((e) => {
    console.error({ Message: 'DB connection failed', error: e.toString() });
    process.exit(1);
  });
