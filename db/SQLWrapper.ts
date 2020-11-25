import mysql from 'mysql';

export default function query(queryString: string, placeholders: Array<string>,
  instance?: mysql.Connection): Promise<Array<object>> {
  return new Promise((resolve, reject) => {
    instance?.query(queryString, placeholders, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}
