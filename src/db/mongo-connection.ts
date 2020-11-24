import mongoose from 'mongoose';
import DBConnection from './db-connection';

export default class MongoConnection extends DBConnection {

  connect(dbURL): Promise<void> {
    try {
      return mongoose
        .createConnection(dbURL, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
        });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  find(): Promise<void> {

  }

  update(): Promise<void> {

  }

  delete(): Promise<void> {

  }

  listCollection(instance): Promise<void> {
    return new Promise((resolve, reject) => {
      instance.connection.db.listCollections().toArray((error, collections) => {
        if (error) {
          reject(error);
        }
        resolve(collections.map((i) => i.name));
      });
    });
  }

  exportCollection(collection, instance): Promise<void>{
      return new Promise((resolve, reject) => {
    instance.connection.db.collection(collection)
      .find().toArray((error, collections) => {
        if (error) {
          reject(error);
        }
        resolve(collections);
      });
  });
  }

}
