const { Project } = require('./schema')
const connectSql = require('./connectSql')
const connectMongo = require('./connectMongo')

const liveConnections = {}

Project.find({}, { _id: false }).then(docs => {
  docs.forEach(async doc => {
    const { fun, type } = (doc.dbURL.slice(0, 5) === 'mysql')
      ? { fun: connectSql, type: 'mysql' }
      : { fun: connectMongo, type: 'mongodb' }
    try {
      const connection = await fun(doc.dbURL)
      liveConnections[doc.name] = { connection, type }
      console.log({ name: doc.name, status: 'Status: connected' })
    } catch (e) {
      console.error({ name: doc.name, error: e.toString() })
    }
  })
})

module.exports = liveConnections
