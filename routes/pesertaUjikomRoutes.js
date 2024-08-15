const routes = require('express').Router()
const pesertaUjikomController = require('../controllers/pesertaUjikomController')

routes.get('/index', pesertaUjikomController)

module.exports=routes