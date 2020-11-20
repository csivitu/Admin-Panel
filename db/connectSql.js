const mysql = require('mysql')
const { ConnectionString } = require('connection-string')

function connectSql (dbURL) {
  return new Promise((resolve, reject) => {
    const obj = new ConnectionString(dbURL)
    const connection = mysql.createConnection(obj)
    connection.connect((e) => {
      if (e) {
        reject(e)
      }
      resolve(connection)
    })
  })
}

module.exports = connectSql
