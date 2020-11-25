import mysql from 'mysql';
import DBConnection from './DBConnection';
import query from '../db/SQLWrapper';

export default class NOSQLDBConnection extends DBConnection {
    dbURL: string

    connection?: mysql.Connection

    constructor(dbURL: string) {
      super();
      this.dbURL = dbURL;
    }

    setupConnection(): Promise<object> {
      return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(this.dbURL);
        connection.connect((e) => {
          if (e) {
            reject(e);
          }
          this.connection = connection;
          resolve(connection);
        });
      });
    }

    closeConnection(): Promise<void> {
      return new Promise((resolve, reject) => {
        this.connection?.end((e) => {
          if (e) {
            reject(e);
          }
          resolve(undefined);
        });
      });
    }

    findAll(collection: string): Promise<object> {
      return new Promise((resolve, reject) => {
        query('SELECT * FROM ??', [collection], this.connection).then((doc) => {
          resolve(doc);
        }).catch((e) => reject(e));
      });
    }

    listCollections(): Promise<object> {
      return new Promise((resolve, reject) => {
        query('SHOW TABLES', [], this.connection).then((doc) => {
          resolve(doc.map((i: any) => i[Object.keys(i)[0]]));
        }).catch((e) => reject(e));
      });
    }
}
