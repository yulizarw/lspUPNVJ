const routes = require('express').Router()
const skemaUjikomController = require('../controllers/skemaUjikomController')

routes.get('/', skemaUjikomController)

module.exports=routes