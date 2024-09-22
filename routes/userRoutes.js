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
// user asesor
// asesor melihat jadwal uji


// asesor memberikan penilaian ujikom


// asesor melakukan update penilaian ujikom


// asesor upload MUK

// asesor update MUK





// user admin
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

// user peserta ujikom
// peserta ujikom mendaftar ujikom (hanya bisa mendaftar 1 kali)

// peserta ujikom melihat jadwal ujikom

// peserta melakukan umpan balik


// peserta melakukan banding

module.exports=routes