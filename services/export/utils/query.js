function sqlListCollection(instance) {
  return new Promise((resolve, reject) => {
    instance.connection.query('SHOW TABLES', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.map((i) => i[Object.keys(i)[0]]));
    });
  });
}

function nosqlListCollection(instance) {
  return new Promise((resolve, reject) => {
    instance.connection.db.listCollections().toArray((error, collections) => {
      if (error) {
        reject(error);
      }
      resolve(collections.map((i) => i.name));
    });
  });
}

function sqlExport(collection, instance) {
  return new Promise((resolve, reject) => {
    instance.connection.query('SELECT * FROM ??', [collection], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function nosqlExport(collection, instance) {
  return new Promise((resolve, reject) => {
    instance.connection.db.collection(collection)
      .find().toArray((error, collections) => {
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
