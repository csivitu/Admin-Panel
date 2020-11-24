import mysql from 'mysql';

function connectSql(dbURL: any) {
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

export default connectSql;
