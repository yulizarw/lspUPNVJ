const routes = require('express').Router()
const homeController = require('../controllers/homeController')

routes.get('/', homeController.home)


// list berita
routes.get('/berita',homeController.newsList)
// apakah perlu mencari berita ?

// list skema
routes.get('/berita/skema', homeController.skemaBerita)

// apa perlu skema bisa di search?

// list jumlah yang sudah lulus semua ujikom
routes.get('/berita/peserta-lulus', homeController.pesertaLulusList)

// map peserta yang telah mengikuti ujikom (nge for loop dari lat long dari peserta yang daftar ujikom)

// upcomming jadwal ujikom

// auth
// add berita bagi admin


// update berita

// delete berita



module.exports=routes