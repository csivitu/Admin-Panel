const liveConnections = require('../../../db/connectProjects')

function sqlListCollection (project) {
  return new Promise((resolve, reject) => {
    liveConnections[project].connection.query('SHOW TABLES', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.map(i => i[Object.keys(i)[0]]))
    })
  })
}

function nosqlListCollection (project) {
  return new Promise((resolve, reject) => {
    liveConnections[project].connection.db.listCollections().toArray((error, collections) => {
      if (error) {
        reject(error)
      }
      resolve(collections.map(i => i.name))
    })
  })
}

function sqlExport (project, collection) {
  return new Promise((resolve, reject) => {
    liveConnections[project].connection.query('SELECT * FROM ??', [collection], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results)
    })
  })
}

function nosqlExport (project, collection) {
  return new Promise((resolve, reject) => {
    liveConnections[project].connection.db.collection(collection)
      .find().toArray((error, collections) => {
        if (error) {
          reject(error)
        }
        resolve(collections)
      })
  })
}

module.exports = { sqlExport, nosqlExport, sqlListCollection, nosqlListCollection }
