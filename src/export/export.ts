import broker from '../../misc/broker';
import {
  sqlExport, nosqlExport, sqlListCollection, nosqlListCollection,
} from './utils/query';
import { liveConnections } from '../../db/connectProjects';

broker.createService({
  name: 'export',
  actions: {
    async listCollections(ctx) {
      const { project } = ctx.params;
      if (liveConnections[project]) {
        try {
          if (liveConnections[project].type === 'mysql') {
            const tables = await sqlListCollection(liveConnections[project]);
            return tables;
          }
          const tables = await nosqlListCollection(liveConnections[project]);
          return tables;
        } catch (err) {
          ctx.meta.$statusCode = 400;
          return { error: err.toString() };
        }
      } else {
        ctx.meta.$statusCode = 400;
        return { error: 'Error: invalid project or could not connect to project database' };
      }
    },
    async exportCollection(ctx) {
      const { collection, project } = ctx.params;
      if (liveConnections[project]) {
        try {
          if (liveConnections[project].type === 'mysql') {
            const table = await sqlExport(collection, liveConnections[project]);
            return table;
          }
          const table: any = await nosqlExport(collection, liveConnections[project]);
          if (table.length === 0) {
            ctx.meta.$statusCode = 404;
            return { error: 'Error: collection not found' };
          }
          return table;
        } catch (err) {
          ctx.meta.$statusCode = 400;
          return { error: err.toString() };
        }
      } else {
        ctx.meta.$statusCode = 400;
        return { error: 'Error: invalid project or could not connect to project database' };
      }
    },
  },
});
