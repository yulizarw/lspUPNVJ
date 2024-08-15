const routes = require('express').Router()

const homeRouter = require('./homeRoutes')
const adminRouter = require('./adminRoutes')
const userRouter =require('./userRoutes')
const umpanBalikRouter = require('./umpanBalikRoutes')
const tukRouter = require('./tukRoutes')
const skemaUjikomRouter = require('./skemaUjikomRoutes')
const rekamanAsesmenRouter = require('./rekamanAsesmenRoutes')
const pesertaUjikomRouter = require('./pesertaUjikomRoutes')
const jadwalUjikomRouter = require('./jadwalUjikomRoutes')
const bandingUjikomRouter= require('./bandingUjikomRoutes')

routes.use('/', homeRouter)

// user 
routes.use('/user', userRouter)

// User Admin
routes.use('/admin', adminRouter)

// user pesertaUjikom
routes.use('/peserta', pesertaUjikomRouter)

// User Asesor
routes.use('/asesor', skemaUjikomRouter)

// TUK
routes.use('/tuk', tukRouter)

// Skema UJi
routes.use('/skema-list', skemaUjikomRouter)

// jadwal uji
routes.use('/jadwal', jadwalUjikomRouter)

// rekaman ujikom
routes.use('/rekaman-uji', rekamanAsesmenRouter)

// banding ujikom
routes.use('/banding', bandingUjikomRouter)

// umpan balik
routes.use('/umpan-balik', umpanBalikRouter)

module.exports = routes