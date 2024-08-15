const routes = require('express').Router()
const tukController = require('../controllers/tukController')

routes.get('/', tukController)

module.exports=routes