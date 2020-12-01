import mysql from 'mysql2/promise';
import { NewDocumentSchema } from '../interfaces/interfaces';
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

    async deleteDocument(collection: string, key: object): Promise<object> {
        try {
            const doc = await this.connection?.query('DELETE FROM ?? WHERE ?', [collection, key]);
            return doc;
        } catch (e) {
            return e;
        }
    }

    async addDocument(collection: string, tuple: NewDocumentSchema): Promise<object> {
        try {
            console.log(tuple);
            const doc = await this.connection?.query('INSERT INTO ?? SET ?', [collection, tuple]);
            return doc;
        } catch (e) {
            return e;
        }
    }

    async updateDocument(
        collection: string,
        keyTuple: NewDocumentSchema,
        tuple: NewDocumentSchema,
    ): Promise<object> {
        try {
            const doc = await this.connection?.query('UPDATE ?? SET ?? WHERE ??', [collection, keyTuple, tuple]);
            return doc;
        } catch (e) {
            return e;
        }
    }
}
