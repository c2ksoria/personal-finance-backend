//Main connection to db
const {createPool} = require('mysql2');
const {db} = require("../Config/config")

const connection = createPool({
    host     : db.host,
    user     : db.user,
    password : db.password,
    database : db.database,
    port     : db.port 
  });
module.exports= {connection}