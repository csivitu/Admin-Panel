require('./db/init')
const { Event, joiEventSchema } = require('./db/schema')
const Joi = require('joi')

module.exports = {
  name: 'event',
  actions: {
    create (ctx) {
      const { name, dbURL } = ctx.params
      try {
        const doc = Joi.attempt({
          name, dbURL
        }, joiEventSchema)
        return Event.create(doc)
      } catch (err) {
        ctx.meta.$statusCode = 400
        return { error: err.toString() }
      }
    },
    async list (ctx) {
      try {
        const docs = await Event.find({}, { _id: false, name: true })
        if (docs.length === 0) {
          ctx.meta.$statusCode = 400
          return { error: 'Error: list is empty' }
        }
        return docs
      } catch (err) {
        ctx.meta.$statusCode = 400
        return { error: err.toString() }
      }
    },
    async get (ctx) {
      try {
        const doc = Event.find({ name: Joi.attempt(ctx.params.name, Joi.string()) }, { _id: false })
        if (doc.length !== 1) {
          ctx.meta.$statusCode = 400
          return { error: `Error: no such event with name '${ctx.params.name}' found` }
        }
        return doc[0]
      } catch (err) {
        ctx.meta.$statusCode = 400
        return { error: err.toString() }
      }
    },
    update (ctx) {
      const { name, dbURL } = ctx.params
      try {
        const doc = Joi.attempt({ name, dbURL }, joiEventSchema)
        return Event.updateOne({
          name: Joi.attempt(name, Joi.string())
        }, doc)
      } catch (err) {
        ctx.meta.$statusCode = 400
        return { error: err.toString() }
      }
    },
    delete (ctx) {
      try {
        return Event.deleteOne({ name: Joi.attempt(ctx.params.name, Joi.string()) })
      } catch (err) {
        ctx.meta.$statusCode = 400
        return { error: err.toString() }
      }
    }
  }
}
