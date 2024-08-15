const routes = require('express').Router()
const rekamanAsesmenController = require('../controllers/rekamanAsesmenController')

routes.get('/index', rekamanAsesmenController)

module.exports=routes