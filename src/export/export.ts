import broker from '../../misc/broker';
import { liveConnections } from '../../db/connectProjects';
import { ContextSchema } from '../../interfaces/interfaces';

async function methodWrapper(ctx: ContextSchema, method: string) {
  const { project, collection } = ctx.params;
  if (!liveConnections[project]) {
    ctx.meta.$statusCode = 400;
    return { error: 'Error: invalid project or could not connect to project database' };
  }
  try {
    if (method === 'listCollections') {
      const collections = await liveConnections[project].listCollections();
      return collections;
    }
    const data = await liveConnections[project].findAll(collection);
    return data;
  } catch (e) {
    ctx.meta.$statusCode = 400;
    return { error: e.toString() };
  }
}

broker.createService({
  name: 'export',
  actions: {
    listCollections(ctx) {
      return methodWrapper(ctx, 'listCollections');
    },
    exportCollection(ctx) {
      return methodWrapper(ctx, 'exportCollection');
    },
  },
});
