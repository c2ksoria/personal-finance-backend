const express = require('express')
const { appConfig } = require('./src/Config/config')
const {connect} = require('./src/Controllers/movements')
const bodyParser = require('body-parser')
const movements = require('./src/Routes/routes')
const cors = require('cors')

//Server configuration
const app = express()
app.use(cors())
app.set('port', appConfig.port)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/v1',movements)

// Middleware

//DB connection

connect()
app.listen(appConfig.port, () => {
  console.log(`servicio iniciado en puerto: ${appConfig.port}`)
})
