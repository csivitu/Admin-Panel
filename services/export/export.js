const { sqlExport, nosqlExport, sqlListCollection, nosqlListCollection } = require('./utils/query')
const { liveConnections } = require('../../db/connectProjects')

module.exports = {
  name: 'export',
  actions: {
    async listCollections (ctx) {
      const { project } = ctx.params
      if (liveConnections[project]) {
        try {
          if (liveConnections[project].type === 'mysql') {
            const tables = await sqlListCollection(project)
            return tables
          } else {
            const tables = await nosqlListCollection(project)
            return tables
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
            const table = await sqlExport(project, collection)
            return table
          } else {
            const table = await nosqlExport(project, collection)
            if (table.length === 0) {
              ctx.meta.$statusCode = 404
              return { error: 'Error: collection not found' }
            }
            return table
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
