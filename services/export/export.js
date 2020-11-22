import handle from './utils/handle';

export default {
  name: 'export',
  actions: {
    async listCollections(ctx) {
      const { project } = ctx.params;
      handle(project, ctx);
    },
    async exportCollection(ctx) {
      const { collection, project } = ctx.params;
      handle(project, collection, ctx);
    },
  },
};
