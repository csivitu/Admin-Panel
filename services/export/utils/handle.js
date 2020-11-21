const { sqlExport, nosqlExport, sqlListCollection, nosqlListCollection } = require('./utils/query')
const { liveConnections } = require('../../db/connectProjects')

async function handle (project, collection, ctx, method) {
  let tables = ''

  if (liveConnections[project]) {
    switch (method) {
      case 'sqlListCollection':
        tables = await sqlListCollection(project)
        return tables

      case 'nosqlListCollection':
        tables = await nosqlListCollection(project)
        return tables

      case 'sqlExport':
        tables = await sqlExport(project, collection)
        return tables

      case 'nosqlExport':
        tables = await nosqlExport(project, collection)
        return tables

      default:
        ctx.meta.$statusCode = 400
        // return { error: err.toString() }
    }
  } else {
    ctx.meta.$statusCode = 400
    return { error: 'Error: invalid project or could not connect to project database' }
  }
}

module.exports = { handle }
