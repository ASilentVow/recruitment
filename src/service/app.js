const express = require('express')
const app = express()

const mysql = require('mysql')
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'recruitment'
})

module.exports = { app, db }
