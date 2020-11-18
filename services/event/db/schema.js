const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  dbType: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  dbURL: { type: String, required: true },
  regCount: { type: Number, required: true, default: 0 },
  date: { type: String, required: true }
})

module.exports = mongoose.model('Event', eventSchema)
