const { Project } = require('./schema')
const connectSql = require('./connectSql')
const connectMongo = require('./connectMongo')

const liveConnections = {}

Project.find({}, { _id: false }).then(docs => {
  docs.forEach(async doc => {
    if (doc.dbURL.slice(0, 5) === 'mysql') {
      try {
        const connection = await connectSql(doc.dbURL)
        liveConnections[doc.name] = { connection, type: 'mysql' }
        console.log({ name: doc.name, status: 'Status: connected' })
      } catch (e) {
        console.error({ name: doc.name, error: e.toString() })
      }
    } else {
      try {
        const connection = await connectMongo(doc.dbURL)
        liveConnections[doc.name] = { connection, type: 'mongodb' }
        console.log({ name: doc.name, status: 'Status: connected' })
      } catch (e) {
        console.error({ name: doc.name, error: e.toString() })
      }
    }
  })
})

module.exports = liveConnections
