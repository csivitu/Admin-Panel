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

    async closeConnection(): Promise<void> {
      try {
        const ret = await this.connection?.close();
        return ret;
      } catch (e) {
        return Promise.reject(e);
      }
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
