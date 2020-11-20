const liveConnections = require('../../../db/connectProjects')

const sqlExport = async (project) => {
  const collections = await new Promise((resolve, reject) => {
    liveConnections[project].connection.query('SHOW TABLES', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.map(i => i[Object.keys(i)[0]]))
    })
  })
  return collections
}

const nosqlExport = async (project) => {
  const collections = await new Promise((resolve, reject) => {
    liveConnections[project].connection.db.listCollections().toArray((error, collections) => {
      if (error) {
        reject(error)
      }
      resolve(collections.map(i => i.name))
    })
  })
  return collections
}

const sqlListCollection = async (project, collection) => {
  const collections = await new Promise((resolve, reject) => {
    liveConnections[project].connection.query('SELECT * FROM ??', [collection], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results)
    })
  })
  return collections
}

const nosqlListCollection = async (project, collection) => {
  const collections = await new Promise((resolve, reject) => {
    liveConnections[project].connection.db.collection(collection)
      .find().toArray((error, collections) => {
        if (error) {
          reject(error)
        }
        resolve(collections)
      })
  })
  return collections
}

module.exports = { sqlExport, nosqlExport, sqlListCollection, nosqlListCollection }
