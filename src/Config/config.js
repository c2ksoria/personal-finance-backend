//configure global enviroment
const PORTAPP = process.env.PORT || 3001
const DB_HOST = process.env.MySQL.MYSQLHOST || 'localhost'
const DB_USER = process.env.MySQL.MYSQLUSER || 'root'
const DB_PASSWORD = process.env.MySQL.MYSQL_ROOT_PASSWORD || 'rootpass'
const DB_NAME = process.env.MySQL.MYSQL_DATABASE || 'finance'
const DB_PORT = process.env.MySQL.MYSQLPORT || 3306

const config = {
    appConfig:
    {
        port: PORTAPP
    },
    db: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT
    }
  }
  module.exports = config