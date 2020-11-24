import DBConnection from './db-connection';
import mysql from 'mysql';
import { rejects } from 'assert';

export default class MySQLConnection extends DBConnection {
  connect(dbURL): Promise<void> {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(dbURL);
      connection.connect((e) => {
        if (e) {
          reject(e);
        }
        resolve(connection);
      });
    });
  }
  
  find(instance): Promise<void> {
    return new Promise((resolve, reject) => {

    })
  }public setOnDataListener(onDataHandler: OnDataHandler) {
		this.onDataHandler = onDataHandler;
	}

	protected onData(data: Buffer) {
		if (this.onDataHandler) {
			this.onDataHandler(data);
		}
	}
}


  update(): Promise<void> {

  }

  delete(): Promise<void> {

  }

  listCollection(instance): Promise<void> {
    return new Promise((resolve, reject) => {
      instance.connection.query('SHOW TABLES', (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.map((i) => i[Object.keys(i)[0]]));
      });
    });
  }

  exportCollection(collection, instance): Promise<void>{
    return new Promise((resolve, reject) => {
      instance.connection.query('SELECT * FROM ??', [collection], (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  }

}
