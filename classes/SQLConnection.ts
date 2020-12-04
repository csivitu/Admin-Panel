import mysql from 'mysql2/promise';
import DBConnection from './DBConnection';
import { SQLReturnTypeSchema } from '../interfaces/interfaces';
import whereWrapper from '../utils/whereWrapper';

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
                (i: SQLReturnTypeSchema) => i[Object.keys(i)[0]],
            );
        } catch (e) {
            return Promise.reject(e);
        }
    }

    deleteCollection(collection: string): Promise<object> {
        return this.connection?.query('DROP TABLE ??', [collection]);
    }

    deleteDocument(collection: string, oldDoc: object): Promise<object> {
        const docItems = Object.entries(oldDoc).map(([key, value]) => ({ [key]: value }));
        const wrappedDoc = whereWrapper(docItems.length);
        return this.connection?.query(`DELETE FROM ?? ${wrappedDoc}`,
            [collection, ...docItems]);
    }

    addDocument(collection: string, newDoc: object): Promise<object> {
        return this.connection?.query('INSERT INTO ?? SET ?', [collection, newDoc]);
    }

    updateDocument(collection: string, oldDoc: object, newDoc: object): Promise<object> {
        const docItems = Object.entries(oldDoc).map(([key, value]) => ({ [key]: value }));
        const wrappedDoc = whereWrapper(docItems.length);
        return this.connection?.query(`UPDATE ?? SET ? ${wrappedDoc}`, [collection, newDoc, ...docItems]);
    }
}
