//Main configuration of routes
const express = require('express')
const {addMovements, updateMovement, getMovements, getMovement, deleteMovement, getMovemetsByMonth, getConfig, randomValues} = require('../Controllers/movements')
const router = express.Router();

router.get('/getconfig', getConfig)
router.get('/getbymonth', getMovemetsByMonth)
router.get('/movements', getMovements)
router.post('/movements/add', addMovements)
router.get('/movements/item', getMovement)
router.delete('/movements/delete/', deleteMovement)
router.put('/movements/update/:id', updateMovement)
router.post('/movements/getrandom', randomValues)

module.exports = router;
