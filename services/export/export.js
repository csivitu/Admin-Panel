const { ConnectionString } = require('connection-string')
const mysql = require('mysql')
const str = 'mysql://user:pass@host/db'
const obj = new ConnectionString(str)
const connection = mysql.createConnection(obj)
connection.connect()
connection.end()
