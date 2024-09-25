const routes = require('express').Router()
const userController = require('../controllers/userController')
const {authentication} = require('../middlewares/auth')
routes.get('/', userController)

// register per role
routes.post('/register', userController.registerUser)
// login per role
routes.get('/login', userController.loginRole)

routes.use(authentication)
// user melihat jadwal uji (all user)
routes.get('/jadwal-uji', userController.jadwalUji)

// all user
// list MUK
routes.get('/list-muk', userController.allMUK)
// list question on specific MUK pada pertanyaan per id findone
routes.get('/detail-muk/:id', userController.detailMUK)
// list question on specific MUK untuk seluruh pertanyaan findall
routes.get('/list-detail-muk/:id', userController.detailAllMUK)
// list nama asesor

// user admin
// admin membuat daftar skema
routes.post('/admin/tambah-skema', userController.tambahSkema)
// list nama seluruh peserta ujikom

// admin menjadwalkan jadwal uji dan plot asesor beserta peserta

// admin membuat kelas ujikom

// admin membuat skema baru



// admin menentukan TUK


// admin mengubah jadwal ujikom


// admin melihat jadwal uji



// admin melakukan penghapusan jadwal uji


// admin overide pemasukkan nilai hasil ujikom


// admin melakukan pengesahan terhadap APL 01 dan APL 02


// admin membuat rekaman asesom

// admin membuat announcement

// konektivitas kepada wa dan sosmed

// user peserta ujikom berada di peserta ujikom


module.exports=routes