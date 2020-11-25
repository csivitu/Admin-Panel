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

    setupConnection(): Promise<object> {
      return new Promise((resolve, reject) => {
        mongoose
          .createConnection(this.dbURL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
          }).then((connection) => {
            this.connection = connection;
            resolve(connection);
          }).catch((e) => {
            reject(e);
          });
      });
    }

    closeConnection(): Promise<void> {
      return new Promise((resolve, reject) => {
        this.connection?.close().catch((e) => {
          reject(e);
        }).then((value) => resolve(value));
      });
    }

    findAll(collection: string): Promise<object> {
      return new Promise((resolve, reject) => {
        this.connection?.db.collection(collection)
          .find({}).toArray((error: object, doc: object) => {
            if (error) {
              reject(error);
            }
            resolve(doc);
          });
      });
    }

    // updateOne(collection: string, name: string, doc: object): Promise<object> {
    //   return new Promise((resolve, reject) => {
    //     this.connection?.db.collection(collection)
    //       .updateOne({ name }, doc).then((updatedDocument: object) => {
    //         resolve(updatedDocument);
    //       }).catch((error: object) => {
    //         reject(error);
    //       });
    //   });
    // }

    // deleteOne(collection: string, name: string): Promise<object> {
    //   return new Promise((resolve, reject) => {
    //     this.connection?.db.collection(collection)
    //       .deleteOne({ name }).then((deletedDocument: object) => {
    //         resolve(deletedDocument);
    //       }).catch((error: object) => {
    //         reject(error);
    //       });
    //   });
    // }

    listCollections(): Promise<object> {
      return new Promise((resolve, reject) => {
        this.connection?.db.listCollections().toArray((error: object,
          collections: Array<CollectionSchema>) => {
          if (error) {
            reject(error);
          }
          resolve(collections.map((i) => i.name));
        });
      });
    }
}
