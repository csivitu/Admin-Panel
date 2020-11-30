import ApiService from 'moleculer-web';
import broker from '../../misc/broker';

const { ALLOWED_ORIGINS } = process.env;

broker.createService({
    mixins: [ApiService],
    name: 'api',
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
                'DELETE export/:project/:collection': 'export.deleteCollection',
                'DELETE export/:project/:collection/:key': 'export.deleteDocument',
                'POST export/:project/:collection/:tuple': 'export.addDocument',
                'PUT export/:project/:collection/:tuple': 'export.updateDocument',
            },
        }],
        port: process.env.PORT || '5001',
        cors: {
            origin: ALLOWED_ORIGINS ? ALLOWED_ORIGINS.split(', ') : '',
        },
    },
});
