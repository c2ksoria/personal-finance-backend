//Main connection to db
const mysql = require('mysql');
const {db} = require("../Config/config")

var connection = mysql.createConnection({
    host     : db.host,
    user     : db.user,
    password : db.password,
    database : db.database,
    port     : db.port 
  });
module.exports= {connection}