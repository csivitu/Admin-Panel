const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  dbType: { type: [String] },
  eventName: { type: [String] },
  dbURL: { type: [String] }
})

const Event = mongoose.model('Event', eventSchema)

module.exports = {
  Event
}
