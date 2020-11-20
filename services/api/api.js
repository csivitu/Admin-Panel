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
        'DELETE project/:name': 'project.remove'
      }
    }],
    port: process.env.PORT || '5001',
    cors: {
      origin: ALLOWED_ORIGINS ? ALLOWED_ORIGINS.split(', ') : ''
    }
  }
}