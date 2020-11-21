const { sqlExport, nosqlExport, sqlListCollection, nosqlListCollection } = require('./query')
const { liveConnections } = require('../../../db/connectProjects')

async function handle (project, collection, ctx) {
  let method = ''
  if (collection !== '') {
    method = (liveConnections[project].type === 'mysql') ? 'sqlListCollection' : 'nosqlListCollection'
  } else {
    method = (liveConnections[project].type === 'mysql') ? 'sqlExport' : 'nosqlExport'
  }
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
        return { error: 'Error: invalid project or could not connect to project database' }
    }
  } else {
    ctx.meta.$statusCode = 400
    return { error: 'Error: invalid project or could not connect to project database' }
  }
}

module.exports = { handle }
