function sqlListCollection(instance: any) {
  return new Promise((resolve, reject) => {
    instance.connection.query('SHOW TABLES', (error: any, results: any) => {
      if (error) {
        reject(error);
      }
      resolve(results.map((i: any) => i[Object.keys(i)[0]]));
    });
  });
}

function nosqlListCollection(instance: any) {
  return new Promise((resolve, reject) => {
    instance.connection.db.listCollections().toArray((error: any, collections: any) => {
      if (error) {
        reject(error);
      }
      resolve(collections.map((i: any) => i.name));
    });
  });
}

function sqlExport(collection: any, instance: any) {
  return new Promise((resolve, reject) => {
    instance.connection.query('SELECT * FROM ??', [collection], (error: any, results: any) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function nosqlExport(collection: any, instance: any) {
  return new Promise((resolve, reject) => {
    instance.connection.db.collection(collection)
      .find().toArray((error: any, collections: any) => {
        if (error) {
          reject(error);
        }
        resolve(collections);
      });
  });
}

export {
  sqlExport, nosqlExport, sqlListCollection, nosqlListCollection,
};
