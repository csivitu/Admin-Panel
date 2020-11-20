const liveConnections = require('../../db/connectProjects')

module.exports = {
  name: 'export',
  actions: {
    async listCollections (ctx) {
      const { project } = ctx.params
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
    // },
    // exportCollection (ctx) {
    //   const { project, collections } = ctx.params
    //   if (liveConnections[project]) {
    //     try {
    //       if (liveConnections[project].type === 'mysql') {
    //         liveConnections[project].connection.query(`SELECT * FROM ${collections}`, (results) => {
    //           return { results }
    //         })
    //       } else {
    //         liveConnections[project].collections.find({}).toArray((results) => {
    //           return results
    //         })
    //       }
    //     } catch (err) {
    //       ctx.meta.$statusCode = 400
    //       return { error: err.toString() }
    //     }
    //   } else {
    //     ctx.meta.$statusCode = 400
    //     return { error: 'Error: invalid project or could not connect to project database' }
    //   }
    }
  }
}
