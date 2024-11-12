const routes = require('express').Router()
const pesertaUjikomController = require('../controllers/pesertaUjikomController')
const {authentication} = require('../middlewares/auth')

routes.get('/index', pesertaUjikomController)

routes.use(authentication)
// peserta ujikom mendaftar ujikom (hanya bisa mendaftar 1 kali)
routes.post('/pendaftaran-skema', pesertaUjikomController.inputDataPeserta)
// peserta ujikom melihat data nya
routes.get('/data-pribadi/',pesertaUjikomController.listDataPribadi)
// peserta ujikom mengubah sebagian datanya
routes.patch('/edit-data-pribadi/', pesertaUjikomController.editDataPribadi)
// peserta ujikom menghapus datanya
routes.delete('/hapus-data-pribadi/', pesertaUjikomController.deleteDataPribadi)
// peserta ujikom melihat jadwal ujikom
routes.get('/jadwal-ujikom-peserta', pesertaUjikomController.jadwalUjikomPeserta)
// peserta melakukan umpan balik

// peserta mengisi APL 01 
routes.post('/pengisian-apl01', pesertaUjikomController.isiAPL01)

// peserta mengisi APL 02 base dengan memilih skema dulu
routes.put('/pilih-skema', pesertaUjikomController.pilihSkema)

// peserta melengkapi APL 02 dinamic setelah memilih skema
routes.post('/pengisian-apl02-detil', pesertaUjikomController.detilAPL02)
// peserta mengisi bukti portofolio
routes.post('/isi-bukti-portofolio', pesertaUjikomController.isiPortofolio)
// peserta melihat bukti portofolio
routes.get('/lihat-portofolio', pesertaUjikomController.checkPorto)
// peserta mengisi frak01
routes.post('/isi-frak01', pesertaUjikomController.isiFrak01)

// peserta melakukan banding

module.exports=routes