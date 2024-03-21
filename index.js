const express = require('express')
const bodyParser = require('body-parser')
const movements = require('./src/Routes/routes')
const { appConfig, db } = require('./src/Config/config')
const {connect} = require('./src/Controllers/movements')
const cors = require('cors')

//Server configuration
const app = express()
app.set('port', appConfig.port)

// Middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes
app.use('/v1',movements)

//DB connection
// connect()

// console.log("host: ", db.host, ", user: ", db.user, ", password: ", db.password, ", Nombre base: ", db.database, ", puerto: ", db.port )
//Run server...
app.listen(appConfig.port, () => {
  console.log(`servicio iniciado en puerto: ${appConfig.port}`)
})