const routes = require('express').Router()
const userController = require('../controllers/userController')
const {authentication} = require('../middlewares/auth')
routes.get('/', userController)

// register per role
routes.post('/register', userController.registerUser)
// login per role
routes.post('/login', userController.loginRole)

// list news
routes.get ('/news', userController.newsList)

routes.use(authentication)
// user melihat jadwal uji (all user)
routes.get('/jadwal-uji', userController.jadwalUji)

// all user
// list MUK
routes.get('/list-muk', userController.allMUK)
// list question on specific MUK pada pertanyaan per id findone
// routes.get('/detail-muk/:id', userController.detailMUK) sudah dicover di list-muk
// list question on specific MUK untuk seluruh pertanyaan findall
routes.get('/list-detail-muk/:id', userController.detailAllMUK)
// list nama asesor
// list semua skema
routes.get('/list-skema/', userController.listAllSkema)
// admin melakukan liust semua TUK
routes.get('/list-TUK', userController.listTUK)



// user admin
// admin membuat skema
routes.post('/admin/tambah-skema', userController.tambahSkema)
// admin mengupdate skema
routes.patch ('/admin/update-skema/:id', userController.patchSkema)
// admin melakukan delete skema
routes.delete('/admin/hapus-skema/:id', userController.deleteSkema)

// list nama seluruh peserta ujikom
routes.get ('/admin/peserta-ujikom', userController.listPeserta)
// admin menentukan TUK dan membuat TUK untuk suatu skema (CRUD)
routes.post('/admin/tambah-tuk', userController.addTUK)
// admin melakukan pengubahan data TUK
routes.patch('/admin/ubah-data-tuk/:id', userController.patchTUK)
// admin melakukan penghapusan TUK
routes.delete('/admin/hapus-tuk/:id', userController.hapusTUK)
// admin plot TUK kepada skema
routes.put('/admin/plot-tuk/:id', userController.plotTUK)

// list all apl01
routes.get('/admin/list-apl01', userController.listApl01)
// admin override penggantian data apl01 untuk mahasiswa (hanya bisa hapus)
routes.delete('/admin/hapus-data-apl01/:id', userController.hapusDataAPL01)
// admin overide penggantian data apl02 untuk mahasiswa (hanya bisa hapus)
routes.delete('/admin/hapus-detil-apl02/:id', userController.hapusApl02DinaPeserta)
// admin list apl02dinaPeserta dengan include apl02 base
routes.get('/admin/list-apl02', userController.listApl02Dina)
// admin hapus frak01 peserta
routes.delete('/admin/hapus-frak01/:idPeserta', userController.hapusFrak01)

// admin membuat jadwal ujikom
routes.post('/admin/buat-jadwal', userController.buatJadwal)
routes.patch ('/admin/ganti-jadwal/:id', userController.gantiJadwal)
routes.get('/admin/list-jadwal',userController.listJadwal )
// admin mencocokan jadwal dengan skema
routes.post('/admin/plot-jadwal/:idJadwal', userController.plotJadwal)
// admin mengganti jadwalskemaujikom
routes.put('/admin/edit-jadwal/:idJadwal', userController.editJadwal)
// admin menghapus jadwal
routes.delete('/admin/hapus-jadwalWaktu/:idJadwal', userController.hapusJadwalSkema)
//ini akan trigger jadwalUjikomId di peserta akan terhapus
routes.delete('/admin/hapus-jadwal/:idJadwal', userController.hapusJadwal)

// admin mengecek keseluruhan field yuang diisi lalu menyimpan edit data  skemaUjikomId di tabel mahasiswa untuk memverifikasi

// admin create news
routes.post ('/admin/create-news', userController.createNews)
// admin update news
routes.patch('/admin/update-news/:idBerita', userController.updateNews)
// admin delete news
routes.delete('/admin/delete-news/:idBerita', userController.deleteBerita)

// admin overide pemasukkan nilai hasil ujikom


// admin membuat rekaman asesom

// admin membuat announcement

// konektivitas kepada wa dan sosmed

// user peserta ujikom berada di peserta ujikom


module.exports=routes