require('../../db/init')
require('../../db/connect')

const { ALLOWED_ORIGINS } = process.env
const ApiService = require('moleculer-web')

module.exports = {
  mixins: [ApiService],
  settings: {
    routes: [{
      aliases: {
        'GET project': 'project.list',
        'GET project/:name': 'project.get',
        'POST project': 'project.create',
        'PUT project/:name': 'project.update',
        'DELETE project/:name': 'project.remove',
        'GET export/:project': 'export.showTables',
        'GET export/:project/:collection': 'export.exportAsJSON'
      }
    }],
    port: process.env.PORT || '5001',
    cors: {
      origin: ALLOWED_ORIGINS ? ALLOWED_ORIGINS.split(', ') : ''
    }
  }
}
