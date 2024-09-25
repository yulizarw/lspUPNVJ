const routes = require ('express').Router()
const {authentication} = require('../middlewares/auth')

const asesorController = require('../controllers/asesorController')
// user asesor
// asesor melakukan pengisian data diri
routes.use(authentication)
routes.post('/update-data-diri', asesorController.updateProfil)
// melakukan perubahan pada data diri
routes.patch('/ubah-data-diri', asesorController.ubahProfil)
// asesor melihat jadwal uji


// asesor memberikan penilaian ujikom ke satu peserta ujikom


// asesor melakukan update penilaian ujikom ke satu peserta ujikom


// ini belum bagus tapi jalan, all aseosr masih bisa liat selain dia punya skema/muk dan gmna caranya agar update muk itu sesuai dengan dia punya skema 
// asesor upload MUK untuk apl02
routes.post('/tambah-muk', asesorController.addMUK)

// asesor update MUK di apl02
routes.patch('/update-muk/:id', asesorController.updateMUK)

// asesor delete per item MUK di apl 02

// asesor delet all item di MUK di apl 02




module.exports = routes