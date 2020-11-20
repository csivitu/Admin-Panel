const { sqlExport, nosqlExport, sqlListCollection, nosqlListCollection } = require('./utils/query')
const liveConnections = require('../../db/connectProjects')

module.exports = {
  name: 'export',
  actions: {
    async listCollections (ctx) {
      const { project } = ctx.params
      if (liveConnections[project]) {
        try {
          if (liveConnections[project].type === 'mysql') {
            return sqlExport(project)
          } else {
            return nosqlExport(project)
          }
        } catch (err) {
          ctx.meta.$statusCode = 400
          return { error: err.toString() }
        }
      } else {
        ctx.meta.$statusCode = 400
        return { error: 'Error: invalid project or could not connect to project database' }
      }
    },
    async exportCollection (ctx) {
      const { collection, project } = ctx.params
      if (liveConnections[project]) {
        try {
          if (liveConnections[project].type === 'mysql') {
            return sqlListCollection(project, collection)
          } else {
            return nosqlListCollection(project, collection)
          }
        } catch (err) {
          ctx.meta.$statusCode = 400
          return { error: err.toString() }
        }
      } else {
        ctx.meta.$statusCode = 400
        return { error: 'Error: invalid project or could not connect to project database' }
      }
    }
  }
}
