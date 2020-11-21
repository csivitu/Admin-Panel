import { handle } from './handle'

module.exports = {
  name: 'export',
  actions: {
    async listCollections (ctx) {
      const { project } = ctx.params
      handle(project, ctx, 'method')
    },
    async exportCollection (ctx) {
      const { collection, project } = ctx.params
      handle(project, collection, ctx, 'method')
    }
  }
}
