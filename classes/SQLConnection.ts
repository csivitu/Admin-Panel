import mysql from 'mysql2/promise';
import DBConnection from './DBConnection';

export default class NOSQLDBConnection extends DBConnection {
    dbURL: string

    connection?: mysql.Connection

    constructor(dbURL: string) {
        super();
        this.dbURL = dbURL;
    }

    async setupConnection(): Promise<object> {
        try {
            this.connection = await mysql.createConnection({ host: this.dbURL });
            return this.connection;
        } catch (err) {
            return Promise.reject(err);
        }
    }

    closeConnection(): Promise<void> | undefined {
        return this.connection?.end();
    }

    exportCollection(collection: string): Promise<object> | undefined {
        return this.connection?.execute('SELECT * FROM ??', [collection]);
    }

    listCollections(): Promise<object> | undefined {
        return this.connection?.execute('SHOW TABLES', []);
    }
}
