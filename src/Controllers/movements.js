const { connection } = require('../Config/connection')

let responseDefault = {
    "success": true,
    "message": "Consulta exitosa",
    "data": []
}

//Returns default data for each http response
function dataResponseDefault() {
    return {
        "success": true,
        "message": "Consulta exitosa",
        "data": []
    }
}

//Connection to DB
function connect() {
    try{
    return new Promise((resolve, reject) => {
        connection.connect((error) => {
            if (error) {
                let messageError = 'Error en la conexión a la base de datos: ' + error
                console.log(messageError)
                reject()
                return
            }
            responseDefault.message = 'La conexión a la base de datos es exitosa'
            resolve(responseDefault)
        })
    })}
    catch(error){
        console.log(error)
    }
}

// Generic function for query all kind of data to db
function getQuery(sqlQuery, values) {
    return new Promise((resolve, reject) => {
        connection.query(sqlQuery, values, (error, results) => {
            if (error) {
                reject(error)
                return
            }
        resolve(results)
        })
    })
}

//Get all movements in db
async function getMovements(req, res) {
    let movementsDefault = dataResponseDefault()
    let sqlCommand =
        `select
            movements.id,
            movements.details as Details,
            movements.category as movCategory,
            category.name as Category,
            movements.type as movType,
            type.name as Type,
            movements.Date as Date,
            movements.quantity as Qty
        from movements
            inner join category on movements.category=category.id
            inner join type on movements.type=type.id;`
    try {
        const resultados = await getQuery(sqlCommand, '')
        let result = JSON.stringify(resultados)
        movementsDefault.data = JSON.parse(result)
        movementsDefault.message = "La consulta ha sido satisfactoria"
        movementsDefault.success = true
    }
    catch (error) {
        movementsDefault.success = false
        movementsDefault.message = error
    }
    return res.json(movementsDefault)
}

//Insert movemets into db
async function addMovements(req, res) {
    let addMovementsDefault = dataResponseDefault()
    const { category, details, type, date, quantity } = req.body
    let sqlCommand = `
        INSERT INTO
            movements (category, type, details, Date, quantity)
        VALUES (?, ?, ?, ?, ?)`
    const values = [category, type, details, date, quantity]
    try {
        const resultados = await getQuery(sqlCommand, values)
        let result = JSON.stringify(resultados)
        result = JSON.parse(result)
        if (result["affectedRows"] === 1) {
            addMovementsDefault.message = `Valor ingresado correctamente, id: ${result.insertId}`
            addMovementsDefault.success = true
        }
    }
    catch (error) {
        addMovementsDefault.message = `hubo un error: ${error.sqlMessage}`,
            addMovementsDefault.success = false
    }
    return res.json(addMovementsDefault)
}
//Get individual movement
async function getMovement(req, res) {
    const { id } = req.body
    let getMovementDefault = dataResponseDefault()
    let sqlCommand = `
        select
            movements.id,
            movements.details as Details,
            category.name as Category,
            type.name as Type,
            movements.Date,
            movements.quantity as Quantity
        from movements
            inner join category on movements.category=category.id
            inner join type on movements.type=type.id
        where movements.id=?
        `
    try {
        const resultados = await getQuery(sqlCommand, id)
        let result = JSON.stringify(resultados)
        result = JSON.parse(result)
        if (result === undefined || result.length === 0) {
            getMovementDefault.success = false
            getMovementDefault.message = `El movimiento con id ${id} no existe`
        }
        else {
            getMovementDefault.data = result
            getMovementDefault.success = true
            getMovementDefault.message = `El movimiento con id ${id}, fue leido satisfactoriamente`
        }
    }
    catch (error) {
        getMovementDefault.success = false
        getMovementDefault.message = error.sqlMessage
    }
    return res.json(getMovementDefault)
}

//Delete Movements
async function deleteMovement(req, res) {
    const { id } = req.body
    let responseDeleteDefault = dataResponseDefault()
    let sqlCommand = `
    delete
        from movements
    where movements.id=?`
    try {
        const resultados = await getQuery(sqlCommand, id)
        let result = JSON.stringify(resultados)
        result = JSON.parse(result)
        if (result.affectedRows === 1) {
            responseDeleteDefault.data = result
            responseDeleteDefault.message = `El movimiento con id ${id}, fue borrado satisfactoriamente`
            responseDeleteDefault.success = true
        }
        else {
            responseDeleteDefault.success = false
            responseDeleteDefault.message = `El id ${id} no existe`
        }
        return res.json(responseDeleteDefault)
    }
    catch (error) {
        responseDeleteDefault.success = false
        responseDeleteDefault.message = error
    }
    return res.json(responseDeleteDefault)
}

//Update Movements
async function updateMovement(req, res) {
    const { category, details, type, date, quantity } = req.body
    const { id } = req.params
    let responseUpdateDefault = dataResponseDefault()
    let sqlCommand = `
            UPDATE movements
            SET category = ?, type = ?, Date = ?, quantity = ?, details = ?
            where id=?`
    let values = [category, type, date, quantity, details, id]
    try {
        const resultados = await getQuery(sqlCommand, values)
        let result = JSON.stringify(resultados)
        result = JSON.parse(result)
        if (result.affectedRows === 1) {
            responseUpdateDefault.message = `El movimiento con id ${id}, fue editado satisfactoriamente`
            responseUpdateDefault.data = result
        }
        else {
            responseUpdateDefault.message = `El id ${id} no existe`
            responseUpdateDefault.success = false
            responseUpdateDefault.data = result
        }
    }
    catch (error) {
        responseUpdateDefault.message = error
        responseUpdateDefault.success = false
    }
    return res.json(responseUpdateDefault)
}

//Get all movements by month
async function getMovemetsByMonth(req, res) {
    const { month } = req.body
    let respByMonthDefaultResp = dataResponseDefault()
    let sqlCommand = `
    select
        movements.id,
        movements.details as Details,
        category.name as Category,
        type.name as Type,
        movements.Date as Date,
        movements.quantity as Qty
    from
        movements inner join category on movements.category=category.id
        inner join type
    on 
        movements.type=type.id
    where month(date)=?;
    `
    let values = month
    try {
        const resultados = await getQuery(sqlCommand, values)
        let result = JSON.stringify(resultados)
        respByMonthDefaultResp.data = JSON.parse(result)
    }
    catch (error) {
        respByMonthDefaultResp.success = false
        respByMonthDefaultResp.message = error
    }
    return res.json(respByMonthDefaultResp)
}

//Get configuration of categories and types of movements
async function getConfig(req, res) {
    let temporalArray = []
    let respDefaultConfig = dataResponseDefault()
    try {
        let resultados = await getQuery('select * from category;', "")
        let result = JSON.stringify(resultados)
        result = JSON.parse(result)
        temporalArray.push({ Categories: result })
        resultados = await getQuery('select * from type;')
        result = JSON.stringify(resultados)
        result = JSON.parse(result)
        temporalArray.push({ Type: result })
        respDefaultConfig.data = temporalArray
    }
    catch (error) {
        console.error('Error:', error)
    }
    return res.json(respDefaultConfig)
};

//We can generate an array of random data for testing propourses. It required the quantity of diferents new registers.
function generateRandom(iterations) {
    let details = ["excelente atención", "la pasé muy bien", "fue un poco caro", "volveré otra vez"]
    let randomCategories = []
    let randomTypes = []
    let randomDates = []
    let randomQty = []
    let randomDetails = []
    let values = []

    for (let index = 0; index < iterations; index++) {
        let number = 0.0
        randomCategories.push(getRandomIntInclusive(1, 6))
        randomTypes.push(getRandomIntInclusive(1, 2))
        number = Math.random() * 1000
        randomQty.push(number.toFixed(2))
        randomDetails.push(details[getRandomIntInclusive(0, 3)])
    }
    randomDates = randomDate(iterations)
    for (let index = 0; index < iterations; index++) {
        values.push({ category: randomCategories[index], type: randomTypes[index], Date: randomDates[index], details: randomDetails[index], quantity: randomQty[index] })
    }
    return values
}

//Generate random data values with a minimun and maximun integuer values.
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

//Generate random date values, it function use the actual date for calculate a range of dates, between first day and last day of actual month. Number of iterations is required.
function randomDate(iterations) {
    const dates = []
    for (let index = 0; index < iterations; index++) {
        dates.push(getRandomDate())
    }
    return dates
}

//Generate unique random date value.
function getRandomDate() {
    const today = new Date()
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    const daysInRange = lastDayOfMonth.getDate() - firstDayOfMonth.getDate() + 1
    const randomNumberOfDays = Math.floor(Math.random() * daysInRange)
    const randomDate = new Date(firstDayOfMonth)
    randomDate.setDate(randomDate.getDate() + randomNumberOfDays)
    const formattedDate = randomDate.toISOString().split('T')[0]
    return formattedDate
}

//Save random Values into db, with dynamic generation of news rows on db
async function randomValues(req, res) {
    const { qty } = req.body
    let respDefaultRandom = dataResponseDefault()
    let sqlCommand = ""
    let insertText = ""
    try {
        const values = generateRandom(qty)
        for (let index = 0; index < values.length; index++) {
            insertText = insertText + `(${values[index].category}, ${values[index].type}, '${values[index].details}', '${values[index].Date}', ${values[index].quantity}),`
        }
        sqlCommand = `
            insert
                into movements(category, type, details, Date, quantity)
                values`
            + insertText.substring(0, insertText.length - 1) + ";"
        const resultados = await getQuery(sqlCommand)
        let result = JSON.stringify(resultados)
        respDefaultRandom.data = JSON.parse(result)
    }
    catch (error) {
        respDefaultRandom.data = {}
        respDefaultRandom.success = false
        respDefaultRandom.msj = error
    }
    res.json(respDefaultRandom)
}
module.exports = { connect, addMovements, updateMovement, getMovements, getMovement, deleteMovement, getMovemetsByMonth, getConfig, randomValues }