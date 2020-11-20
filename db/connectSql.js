const mysql = require('mysql')
const { ConnectionString } = require('connection-string')

function connectSql (dbURL) {
  const obj = new ConnectionString(dbURL)
  const connection = mysql.createConnection(obj)
  connection.connect()
  return connection
}

module.exports = connectSql
