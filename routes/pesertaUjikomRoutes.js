const routes = require('express').Router()
const pesertaUjikomController = require('../controllers/pesertaUjikomController')

routes.get('/index', pesertaUjikomController)
// get muk id
routes.get('/listMUK/:mukId', pesertaGetMUK)
// post apl01
routes.post('/post/apl01'. pesertaPostApl01)

// post apl02
routes.post('/post/apl02'. pesertaPostApl02)
// register serkom
module.exports=routes