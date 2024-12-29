const routes = require ('express').Router()
const {authentication} = require('../middlewares/auth')

const asesorController = require('../controllers/asesorController')
const {uploadFileAsesi, uploadFileMuk} = require('../middlewares/storage')
// user asesor
// asesor melakukan pengisian data diri
routes.use(authentication)
routes.post('/update-data-diri', asesorController.updateProfil)
// melakukan perubahan pada data diri
routes.patch('/ubah-data-diri', asesorController.ubahProfil)
// melihat data diri
routes.get('/lihat-data-diri', asesorController.fetchDataDiriAsesor)


// asesor memilih skema ujikom
routes.put('/memilih-skema', asesorController.memilihSkema)
// asesor melihat jadwal uji


// asesor memberikan penilaian ujikom ke satu peserta ujikom


// asesor melakukan update penilaian ujikom ke satu peserta ujikom



// asesor upload MUK untuk apl02
routes.post('/tambah-muk', asesorController.addMUK)

// asesor update MUK di apl02
routes.patch('/update-muk/:id', asesorController.updateMUK)

// asesor hapus muk di apl02
routes.delete('/delete-muk/:id',asesorController.deleteMUK)

// list APL02 Asesor
routes.get('/list-apl02', asesorController.listAPL02)

// asesor delete per item MUK di apl 02

// asesor delet all item di MUK di apl 02
// upload file MUK
routes.post('/upload-muk',uploadFileMuk.single('file'), asesorController.postMUK)
//  Route untuk mendapatkan file MUK
routes.get('/getMUK/:id', asesorController.getFileMUK);
routes.get ('/getAllMUK', asesorController.getAllFileMUK)
// Route untuk memperbarui file
routes.put('/editMUK/:id', uploadFileMuk.single('file'), asesorController.updateFileMUK);
// route untuk delet MUK
routes.delete('/deleteMUK/:id', asesorController.deleteFileMUK);

// routes untuk download dari folder muk
routes.get('/downloadFileMUK/:dokumen', asesorController.downloadFileMUK)
// routes untuk download dari folder asesi by name
routes.get ('/downloadFileAsesi/:dokumen', asesorController.downloadFileAsesi)



module.exports = routes