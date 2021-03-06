import mongoose from 'mongoose';
import DBConnection from './DBConnection';
import { CollectionSchema } from '../interfaces/interfaces';

export default class NOSQLDBConnection extends DBConnection {
    dbURL: string

    connection?: mongoose.Connection

    constructor(dbURL: string) {
        super();
        this.dbURL = dbURL;
    }

    async setupConnection(): Promise<object> {
        try {
            const connection = await mongoose
                .createConnection(this.dbURL, {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useUnifiedTopology: true,
                });
            this.connection = connection;
            return connection;
        } catch (e) {
            return Promise.reject(e);
        }
    }

    closeConnection(): Promise<void> {
        return this.connection?.close();
    }

    exportCollection(collection: string): Promise<object> {
        return new Promise((resolve, reject) => {
            this.connection?.db.collection(collection)
                .find({}).toArray((error: object, doc: Array<object>) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(doc);
                });
        });
    }

    listCollections(): Promise<object> {
        return new Promise((resolve, reject) => {
            this.connection?.db.listCollections().toArray(
                (error: object, collections: Array<CollectionSchema>) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(collections.map((i) => i.name));
                },
            );
        });
    }

    updateDocument(collection: string, oldDoc: object, newDoc: object): Promise<object> {
        return this.connection?.db.collection(collection).updateMany(oldDoc, { $set: newDoc });
    }

    addDocument(collection: string, newDoc: object): Promise<object> {
        return this.connection?.db.collection(collection).insertOne(newDoc);
    }

    deleteDocument(collection: string, oldDoc: object): Promise<object> {
        return this.connection?.db.collection(collection).deleteMany(oldDoc);
    }

    deleteCollection(collection: string): Promise<object> {
        return this.connection?.db.collection(collection).drop();
    }
}
