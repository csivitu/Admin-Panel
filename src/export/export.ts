import broker from '../../misc/broker';
import { liveConnections } from '../../db/connectProjects';
import { ContextSchema } from '../../interfaces/interfaces';

async function methodWrapper(ctx: ContextSchema, method: string) {
    const {
        project, collection, oldDoc, newDoc,
    } = ctx.params;
    if (!liveConnections[project]) {
        ctx.meta.$statusCode = 400;
        return { error: 'Error: invalid project or could not connect to project database' };
    }
    try {
        if (method === 'listCollections') {
            const collections = await liveConnections[project].listCollections();
            return collections;
        }
        if (method === 'deleteCollection') {
            const collections = await liveConnections[project].deleteCollection(collection);
            return collections;
        }
        if (method === 'deleteDocument') {
            const collections = await liveConnections[project].deleteDocument(collection, oldDoc);
            return collections;
        }
        if (method === 'addDocument') {
            const collections = await liveConnections[project].addDocument(collection, newDoc);
            return collections;
        }

        if (method === 'updateDocument') {
            const collections = await liveConnections[project]
                .updateDocument(collection, oldDoc, newDoc);
            return collections;
        }
        const data = await liveConnections[project].exportCollection(collection);
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
