const routes = require ('express').Router()
const adminController = require('../controllers/adminController')
const {authentication} = require('../middlewares/auth')
const {uploadFileAsesi, uploadFileMuk} = require('../middlewares/storage')
// routes.post('/register', adminController.register)
// routes.post('/login', adminController.login)

// routes.get('/product',adminController.listProduct)

// routes.post('/product', adminController.addProduct)
// routes.get('/product/:id',adminController.getDetailProduct)
// routes.put('/product/:id', adminController.editProduct)
// routes.delete ('/product/:id', adminController.deleteProduct)


// routes.get('/orders', adminController.getAllOrders)
// routes.get('/orders/:id', adminController.getDetailOrder)
// routes.patch('/orders/:id',adminController.editOrder)
// routes.delete('/orders/:id',adminController.deleteOrder)

routes.use(authentication)
// admin

// upload file MUK
routes.post('/upload-muk',uploadFileMuk.single('file'), adminController.postMUK)
//  Route untuk mendapatkan file MUK
routes.get('/getMUK/:id', adminController.getFileMUK);
routes.get ('/getAllMUK', adminController.getAllFileMUK)
// Route untuk memperbarui file
routes.put('/editMUK/:id', uploadFileMuk.single('file'), adminController.updateFileMUK);
// route untuk delet MUK
routes.delete('/deleteMUK/:id', adminController.deleteFileMUK);
// routes untuk download dari folder muk
routes.get('/downloadFileMUK/:dokumen', adminController.downloadFileMUK)
// routes untuk download dari folder asesi by name
routes.get ('/downloadFileAsesi/:dokumen', adminController.downloadFileAsesi)

// list MUK
// create schedule
// create TUK
// assign asesor to kelas
// validate APL 01 

// validate APL 02


// asesor
// post MUK

// list MUK
// list asesi
// penilaian asesi

module.exports = routes