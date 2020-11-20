const liveConnections = require('../../db/connectProjects')
const Joi = require('joi')

module.exports = {
  name: 'export',
  actions: {
    async listCollections (ctx) {
      const { project } = ctx.params.project
      if (liveConnections[project]) {
        try {
          if (liveConnections[project].type === 'mysql') {
            const collections = await new Promise((resolve, reject) => {
              liveConnections[project].connection.query('SHOW TABLES', (error, results) => {
                if (error) {
                  reject(error)
                }
                resolve(results.map(i => i[Object.keys(i)[0]]))
              })
            })
            return collections
          } else {
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
        } catch (err) {
          ctx.meta.$statusCode = 400
          return { error: err.toString() }
        }
      } else {
        ctx.meta.$statusCode = 400
        return { error: 'Error: invalid project or could not connect to project database' }
      }
    },
    async exportCollection (ctx) {
      const { collection, project } = ctx.params
      if (liveConnections[project]) {
        try {
          if (liveConnections[project].type === 'mysql') {
            const collections = await new Promise((resolve, reject) => {
              liveConnections[project].connection.query('SELECT * FROM ??', [Joi.attempt(collection,
                Joi.string())], (error, results) => {
                if (error) {
                  reject(error)
                }
                resolve(results)
              })
            })
            return collections
          } else {
            const collections = await new Promise((resolve, reject) => {
              liveConnections[project].connection.db.collection(Joi.attempt(collection, Joi.string()))
                .find().toArray((error, collections) => {
                  if (error) {
                    reject(error)
                  }
                  resolve(collections)
                })
            })
            return collections
          }
        } catch (err) {
          ctx.meta.$statusCode = 400
          return { error: err.toString() }
        }
      } else {
        ctx.meta.$statusCode = 400
        return { error: 'Error: invalid project or could not connect to project database' }
      }
    }
  }
}
