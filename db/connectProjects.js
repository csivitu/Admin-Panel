import { Project } from './schema.js';
import connectSql from './connectSql.js';
import connectMongo from './connectMongo.js';

const liveConnections = {};

async function connectDB(doc) {
  const { fun, type } = (doc.dbURL.slice(0, 5) === 'mysql')
    ? { fun: connectSql, type: 'mysql' }
    : { fun: connectMongo, type: 'mongodb' };
  try {
    const connection = await fun(doc.dbURL);
    liveConnections[doc.name] = { connection, type };
    console.log({ name: doc.name, status: 'Status: connected' });
  } catch (e) {
    console.error({ name: doc.name, error: e.toString() });
  }
}

Project.find({}, { _id: false }).then((docs) => {
  docs.forEach((doc) => {
    connectDB(doc);
  });
});

export { liveConnections, connectDB };
