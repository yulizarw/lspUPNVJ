const routes = require('express').Router()
const umpanBalikController = require('../controllers/umpanBalikRouter')

routes.get('/', umpanBalikController)

module.exports=routes