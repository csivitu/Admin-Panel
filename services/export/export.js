const liveConnections = require('./connect')

module.exports = {
  name: 'export',
  actions: {
    showTables (ctx) {
      const { project } = ctx.params
      if (liveConnections[project]) {
        try {
          if (liveConnections[project].type === 'mysql') {
            liveConnections[project].connection.query('SHOW TABLES', (results) => {
              return { results }
            })
          } else {
            return liveConnections[project].listCollections()
          }
        } catch (err) {
          return { error: err.toString() }
        }
      } else {
        return (' Project not found')
      }
    },
    exportAsJSON (ctx) {
      const { project, collections } = ctx.params
      if (liveConnections[project]) {
        try {
          if (liveConnections[project].type === 'mysql') {
            liveConnections[project].connection.query(`SELECT * FROM ${collections}`, (results) => {
              return { results }
            })
          } else {
            liveConnections[project].collections.find({}).toArray((results) => {
              return results
            })
          }
        } catch (err) {
          return { error: err.toString() }
        }
      }
    }
  }
}
