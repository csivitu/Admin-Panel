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
    }
  }
}
