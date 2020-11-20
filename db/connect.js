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
      } catch {}
    } else {
      try {
        const connection = await connectMongo(doc.dbURL)
        liveConnections[doc.name] = { connection, type: 'mongodb' }
      } catch {}
    }
  })
})

module.exports = liveConnections
