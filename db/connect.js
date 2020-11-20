const { Project } = require('./schema')
const connectSql = require('./connectSql')
const connectMongo = require('./connectMongo')

const liveConnections = {}

Project.find({}, { _id: false }).then(docs => {
  docs.forEach(doc => {
    if (doc.dbURL.slice(0, 5) === 'mysql') {
      liveConnections[doc.name] = { connection: connectSql(doc.dbURL), type: 'mysql' }
    } else {
      liveConnections[doc.name] = { connection: connectMongo(doc.dbURL), type: 'mongodb' }
    }
  })
})

module.exports = liveConnections
