const routes = require('express').Router()
const pesertaUjikomController = require('../controllers/pesertaUjikomController')
const {authentication} = require('../middlewares/auth')

routes.get('/index', pesertaUjikomController)

routes.use(authentication)
// peserta ujikom mendaftar ujikom (hanya bisa mendaftar 1 kali)
routes.post('/pendaftaran-skema', pesertaUjikomController.inputDataPeserta)
// peserta ujikom melihat data nya
routes.get('/data-pribadi/:id',pesertaUjikomController.listDataPribadi)
// peserta ujikom mengubah sebagian datanya
routes.patch('/edit-data-pribadi/', pesertaUjikomController.editDataPribadi)
// peserta ujikom menghapus datanya
routes.delete('/hapus-data-pribadi/', pesertaUjikomController.deleteDataPribadi)
// peserta ujikom melihat jadwal ujikom
routes.get('/jadwal-ujikom-peserta', pesertaUjikomController.jadwalUjikomPeserta)
// peserta melakukan umpan balik


// peserta melakukan banding
// // get muk id
// routes.get('/listMUK/:mukId', pesertaGetMUK)
// // post apl01
// routes.post('/post/apl01'. pesertaPostApl01)

// // post apl02
// routes.post('/post/apl02'. pesertaPostApl02)
// register serkom
module.exports=routes