require('./db/init')
const Event = require('./db/schema')

module.exports = {
  name: 'event',
  actions: {
    create (ctx) {
      try {
        const { name, dbType, dbURL, date } = ctx.params
        if (dbType !== 'SQL' || dbType !== 'NOSQL') {
          ctx.meta.$statusCode = 400
          return { error: 'Error: invalid db type' }
        }
        return Event.create({
          name, dbType, dbURL, date
        })
      } catch (err) {
        ctx.meta.$statusCode = 400
        return { error: err.toString() }
      }
    },
    list (ctx) {
      try {
        return Event.find({}, { _id: false, name: true })
      } catch (err) {
        ctx.meta.$statusCode = 400
        return { error: err.toString() }
      }
    },
    get (ctx) {
      try {
        return Event.findOne({ name: ctx.params.id }, { _id: false })
      } catch (err) {
        ctx.meta.$statusCode = 400
        return { error: err.toString() }
      }
    },
    update (ctx) {
      try {
        const { name, dbType, dbURL, date } = ctx.params
        if (dbType !== 'SQL' || dbType !== 'NOSQL') {
          ctx.meta.$statusCode = 400
          return { error: 'Error: invalid db type' }
        }
        return Event.updateOne({
          name
        }, { name, dbType, dbURL, date })
      } catch (err) {
        ctx.meta.$statusCode = 400
        return { error: err.toString() }
      }
    },
    delete (ctx) {
      try {
        return Event.deleteOne({ name: ctx.params.id })
      } catch (err) {
        ctx.meta.$statusCode = 400
        return { error: err.toString() }
      }
    }
  }
}
