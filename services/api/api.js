const { ALLOWED_ORIGINS } = process.env

const ApiService = require('moleculer-web')

module.exports = {
  mixins: [ApiService],
  settings: {
    routes: [{
      aliases: {
        'GET event': 'event.list',
        'GET event/:name': 'event.get',
        'POST event': 'event.create',
        'PUT event/:name': 'event.update',
        'DELETE event/:name': 'event.remove'
      }
    }],
    port: process.env.PORT || '5001',
    cors: {
      origin: ALLOWED_ORIGINS ? ALLOWED_ORIGINS.split(', ') : ''
    }
  }
}
