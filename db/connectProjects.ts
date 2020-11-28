import { Project } from './schema';
import { DocSchema } from '../interfaces/interfaces';
import NOSQLConnection from '../classes/NOSQLConnection';
import SQLConnection from '../classes/SQLConnection';
import DBConnection from '../classes/DBConnection';

export const liveConnections: {
    [key: string]: DBConnection,
   } = {};

export async function connectDB(doc: DocSchema) {
    const { dbURL, name } = doc;
    const Fun = (dbURL.slice(0, 5) === 'mysql')
        ? SQLConnection
        : NOSQLConnection;
    const connection = new Fun(dbURL);
    try {
        await connection.setupConnection();
        liveConnections[name] = connection;
        console.log({ name: doc.name, status: 'Status: connected' });
    } catch (e) {
        console.error({ name: doc.name, error: e.toString() });
    }
}

Project.find({}).then((docs) => {
    docs.forEach((doc) => {
        connectDB(doc);
    });
});
