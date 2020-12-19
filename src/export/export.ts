import broker from '../../misc/broker';
import { liveConnections } from '../../db/connectProjects';
import { ContextSchema } from '../../interfaces/interfaces';

async function methodWrapper(ctx: ContextSchema, method: string) {
    const {
        project, collection, oldDoc, newDoc, count,
    } = ctx.params;
    const connection = liveConnections[project];
    if (!connection) {
        ctx.meta.$statusCode = 400;
        return { error: 'Error: invalid project or could not connect to project database' };
    }
    try {
        if (method === 'listCollections') {
            const collections = await connection.listCollections();
            return collections;
        }
        if (method === 'deleteCollection') {
            const collections = await connection.deleteCollection(collection);
            return collections;
        }
        if (method === 'deleteDocument') {
            const collections = await connection.deleteDocument(collection, oldDoc);
            return collections;
        }
        if (method === 'addDocument') {
            const collections = await connection.addDocument(collection, newDoc);
            return collections;
        }

        if (method === 'updateDocument') {
            const collections = await connection
                .updateDocument(collection, oldDoc, newDoc);
            return collections;
        }
        const data = await connection.exportCollection(collection);
        if (count) {
            return data.length;
        }
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
        deleteCollection(ctx) {
            return methodWrapper(ctx, 'deleteCollection');
        },
        deleteDocument(ctx) {
            return methodWrapper(ctx, 'deleteDocument');
        },
        addDocument(ctx) {
            return methodWrapper(ctx, 'addDocument');
        },
        updateDocument(ctx) {
            return methodWrapper(ctx, 'updateDocument');
        },
        exportCollection(ctx) {
            return methodWrapper(ctx, 'exportCollection');
        },
    },
});
