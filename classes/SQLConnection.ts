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
        const connection = await mysql.createConnection(this.dbURL);
        this.connection = connection;
        return connection;
    }

    closeConnection(): Promise<void> {
        return this.connection?.end();
    }

    async exportCollection(collection: string): Promise<object> {
        const data = await this.connection?.query('SELECT * FROM ??', [collection]);
        return data[0];
    }

    async listCollections(): Promise<object> {
        try {
            const doc = await this.connection?.query('SHOW TABLES', []);
            return JSON.parse(JSON.stringify(doc[0])).map(
                (i: {[key: string]: string}) => i[Object.keys(i)[0]],
            );
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async deleteCollection(collection: string): Promise<object> {
        try {
            const doc = await this.connection?.query('DROP TABLE ??', [collection]);
            return doc;
        } catch (e) {
            return e;
        }
    }

    async deleteDocument(collection: string, key: string | number): Promise<object> {
        try {
            const doc = await this.connection?.query('DELETE FROM ?? WHERE ??', [collection, key]);
            return doc;
        } catch (e) {
            return e;
        }
    }
}
