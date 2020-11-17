const broker = require('../init')
const Event = require('../models/schema')
broker.createService({
  settings: {
    port: process.env.PORT || '3000'
  },
  name: 'events',
  actions: {
    async addEvent (req, res) {
      try {
        const { eventName, dbType, dbURL } = req.body
        if (dbType !== 'SQL' || dbType !== 'NOSQL') {
          return res.send('Invalid DB type')
        }
        const newEvent = await Event.create({
          eventName,
          dbType,
          dbURL
        })
        return res.status(201).json({
          status: 'success',
          newEvent
        })
      } catch (err) {
        return res.send(err)
      }
    },

    async  displayEvent (req, res) {
      try {
        const event = await Event.find({ eventName: req.body.eventName })
        return res.status(200).json({
          status: 'success',
          event
        })
      } catch (err) {
        return res.send(err)
      }
    }
  }
})
