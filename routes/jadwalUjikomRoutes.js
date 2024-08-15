const routes = require('express').Router()
const jadwalUjikomController = require('../controllers/jadwalUjikomController')

routes.get('/index', jadwalUjikomController)

module.exports=routes