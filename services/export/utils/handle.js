/* eslint-disable no-nested-ternary */
import { liveConnections } from '../../../db/connectProjects';

const {
  sqlExport, nosqlExport, sqlListCollection, nosqlListCollection,
} = require('./query');

function handle(project, collection, ctx) {
  const method = !collection ? (liveConnections[project].type === 'mysql') ? 'sqlListCollection' : 'nosqlListCollection' : (liveConnections[project].type === 'mysql') ? 'sqlExport' : 'nosqlExport';

  if (liveConnections[project]) {
    switch (method) {
      case 'sqlListCollection':
        return sqlListCollection(project);

      case 'nosqlListCollection':
        return nosqlListCollection(project);

      case 'sqlExport':
        return sqlExport(project, collection);

      case 'nosqlExport':
        return nosqlExport(project, collection);

      default:
        ctx.meta.$statusCode = 400;
        return { error: 'Error: invalid project or could not connect to project database' };
    }
  } else {
    ctx.meta.$statusCode = 400;
    return { error: 'Error: invalid project or could not connect to project database' };
  }
}

export default handle;
