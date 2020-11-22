import ApiService from 'moleculer-web';

require('../../db/init');
require('../../db/connectProjects');

const { ALLOWED_ORIGINS } = process.env;

export default {
  mixins: [ApiService],
  settings: {
    routes: [{
      aliases: {
        'GET project': 'project.list',
        'GET project/:name': 'project.get',
        'POST project': 'project.create',
        'PUT project/:name': 'project.update',
        'DELETE project/:name': 'project.remove',
        'GET export/:project/:collection': 'export.exportCollection',
        'GET export/:project': 'export.listCollections',
      },
    }],
    port: process.env.PORT || '5001',
    cors: {
      origin: ALLOWED_ORIGINS ? ALLOWED_ORIGINS.split(', ') : '',
    },
  },
};
