const routes = require('express').Router()
const bandingUjikomController = require('../controllers/bandingUjikomController')

routes.get('/index', bandingUjikomController)

module.exports=routes