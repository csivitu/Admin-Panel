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
            console.log(JSON.parse(JSON.stringify(doc[0])));
            return JSON.parse(JSON.stringify(doc[0])).map(
                (i: {[key: string]: string}) => i[Object.keys(i)[0]],
            );
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
