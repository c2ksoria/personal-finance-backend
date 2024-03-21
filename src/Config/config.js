//configure global enviroment
const PORTAPP = process.env.PORT || 3001
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || 'rootpass'
const DB_NAME = process.env.DB_NAME || 'finance'
const DB_PORT = process.env.DB_PORT || 3306

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