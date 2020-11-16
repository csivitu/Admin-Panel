const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  dateOfEvent: { type: Date() },
  eventName: { type: [String] },
  registration: { type: Number, default: 0 }

})

const Event = mongoose.model('Event', eventSchema)

module.exports = {
  Event
}
