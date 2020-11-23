import ApiService from 'moleculer-web';
import broker from '../../misc/broker.js';
import '../../db/init.js';
import '../../db/connectProjects.js';

const { ALLOWED_ORIGINS } = process.env;

broker.createService({
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
});
