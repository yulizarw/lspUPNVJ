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

// user asesor
// asesor melihat jadwal uji


// asesor memberikan penilaian ujikom ke satu peserta ujikom


// asesor melakukan update penilaian ujikom ke satu peserta ujikom


// ini belum bagus tapi jalan, all aseosr masih bisa liat selain dia punya skema/muk dan gmna caranya agar update muk itu sesuai dengan dia punya skema 
// asesor upload MUK untuk apl02
routes.post('/asesor/tambah-muk', userController.addMUK)

// asesor update MUK di apl02
routes.patch('/asesor/update-muk/:id', userController.updateMUK)

// asesor delete per item MUK di apl 02

// asesor delet all item di MUK di apl 02






// user admin
//admin memplot user peserta ujikom ke tabel peserta ujikom

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