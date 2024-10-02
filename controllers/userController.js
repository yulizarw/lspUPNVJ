const { News, User, Asesor, PesertaUjikom, JadwalUjikom, JadwalSkemaUjikom, Apl02Base, Apl02Dynamic, SkemaUjikom, Tuk, Apl01, Apl02DinaPeserta, FrAk01 } = require('../models')
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pesertaujikom = require('../models/pesertaujikom');

module.exports = class userController {
  
  // create news
  static async createNews(req,res) {
    try{
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      if (adminIsLogin === 'admin') {
        let {content, picture} = req.body
        let params = {
          content,picture
        }

        await News.create(params)
        res.status(201).json(params)
      }
    }catch(error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  static async newsList (req,res) {
    try {
      let findNews = await News.findAll()
 
      if (findNews.length == 0){
        res.status(404).json('tidak ada berita')
      }else {
        res.status(200).json(findNews)
      }
    }catch(error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  static async updateNews (req,res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      let {idBerita} =req.params
      let {content,picture} = req.body
      if (adminIsLogin === 'admin'){
        let findBerita = await News.findOne({
          where:{
            id:idBerita
          }
        })
        if (findBerita) {
          if (content) findBerita.content = content
          if(picture) findBerita.picture = picture
          await findBerita.save()
          res.status(201).json(`Berita berhasil diupdate`)
        }else {
          res.status(404).json('Tidak ada Berita yang dimaksud')
        }
      }else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
    }catch(error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  static async deleteBerita (req,res) {
    try{
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      let {idBerita} =req.params
      let findBerita = await News.findOne({
        where:{
          id:idBerita
        }
      })
      if(adminIsLogin =='admin') {
        if (findBerita) {
          
          await findBerita.destroy()
          res.status(201).json(`Berita berhasil dihapus`)
        }else {
          res.status(404).json('Tidak ada Berita yang dimaksud')
        }
      }else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
    }catch(error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }
  static async registerUser(req, res) {
    try {
      let params = {
        userRole: req.body.userRole,
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPassword: req.body.userPassword,
        userPhoto: req.body.userPhoto,
        userDepartment: req.body.userDepartment,
        userPhone: +req.body.userPhone,
        userBirthdate: new Date(req.body.userBirthdate),
        userDomisili: req.body.userDomisili,
        sptAsesor: req.body.sptAsesor
      }
      let allowedRoles = ['Admin', 'Asesor', 'Peserta Ujikom']
      if (allowedRoles.includes(req.body.userRole)) {
        let findUser = await User.findOne({
          where: { userName: params.userName }
        })

        if (!findUser) {
          let registerUser = await User.create(params)
          let access_token = jwt.sign({ email: registerUser.userEmail, userName: registerUser.userName, role: registerUser.userRole, password: registerUser.userPassword, photo: registerUser.userPhoto, department: registerUser.userDepartment, phone: registerUser.userPhone, domisili: registerUser.userDomisili }, process.env.SECRET)
          res.status(201).json({
            access_token, email: registerUser.userEmail, userName: registerUser.userName, role: registerUser.userRole, password: registerUser.userPassword, photo: registerUser.userPhoto, department: registerUser.userDepartment, phone: registerUser.userPhone, domisili: registerUser.userDomisili
          })
        } else {
          res.status(401).json('Username anda sudah digunakan')
        }
      } else {
        res.status(400).json('Bad Request')
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }
  // if role = asesor maka harus ada sptAsesor
  static async loginRole(req, res) {
    try {
      let params = {
        userName: req.body.userName,
        password: req.body.password,
        role: req.body.role
      };
      let loginUser = await User.findOne({
        where: { userName: params.userName },
      });

      if (
        loginUser &&
        bcrypt.compareSync(params.password, loginUser.userPassword)
      ) {
        let access_token = jwt.sign(
          {
            id: loginUser.id,
            email: loginUser.userEmail,
            userName: loginUser.userName,
            role: loginUser.userRole,
            password: loginUser.userPassword,
            photo: loginUser.userPhoto,
            department: loginUser.userDepartment,
            phone: loginUser.userPhone,
            domisili: loginUser.userDomisili
          },
          process.env.SECRET
        );
        let allowedRoles = ['Admin', 'Asesor', 'Peserta Ujikom']

        let matchedRoles = allowedRoles.map(role => role === req.body.role ? req.body.role : null).filter(role => role)

        if (matchedRoles.length > 0 && matchedRoles[0] === loginUser.userRole) {
          res.status(201).json({
            id: loginUser.id,
            access_token,
            userName: loginUser.userName,
            role: loginUser.userRole,
            password: loginUser.userPassword,
            photo: loginUser.userPhoto,
            department: loginUser.userDepartment,
            phone: loginUser.userPhone,
            domisili: loginUser.userDomisili
          });
        } else {
          res.status(401).json('Mohon Maaf anda tidak memiliki akses')
        }
      } else {
        res.status(400).json("Password / Username are incorrect");
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error.message);
    }
  }

  // jadwal uji
  static async jadwalUji(req, res) {
    try {
      let userIsLogin = req.userLogin;


      if (userIsLogin) {
        let allJadwalUji = await JadwalUjikom.findAll(); // Use singular form if the model is named 'jadwalUjikom'

        if (allJadwalUji.length !== 0) {
          res.status(200).json(allJadwalUji)
        } else {
          res.status(404).json('Belum Ada Jadwal Ujikom saat ini, cek kembali secara berkala')
        }
      } else {
        res.status(404).json('Silahkan lakukan Log In terlebih dahulu');
      }
    } catch (error) {
      console.error('Error:', error); // Log the error to get more details
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message // Send a readable error message
      });
    }
  }
  // allMUK
  static async allMUK(req, res) {
    try {
      let userIsLogin = req.userLogin

      if (userIsLogin) {
        let listMUK = await Apl02Dynamic.findAll({
          include: [
            {
              model: Apl02Base,
              as: 'base'
            },

          ]
        })
        res.status(200).json(listMUK)
      } else {

        res.status(401).json('Anda Tidak Memiliki Akses')

      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }
  // all list skema
  static async listAllSkema(req, res) {
    try {
      let userisLogin = req.userLogin
      console.log(userisLogin)
      if (userisLogin) {
        let listAllSkema = await SkemaUjikom.findAll()

        if (listAllSkema.length > 0) {
          res.status(200).json(listAllSkema)
        } else {
          res.status(400).json('Tidak Ada Skema Ujikom untuk saat ini')
        }
      } else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }
  // detail MUK on specific MUK id
  // static async detailMUK(req,res){
  //   try{
  //     let userIsLogin = req.userLogin
  //     let {id} = req.params

  //     if(userIsLogin){
  //       let detailedMUK = await Apl02Dynamic.findOne({
  //         where:{baseId:id}
  //       })
  //       res.status(200).json(detailedMUK)
  //     }else{
  //       res.status(401).json('Anda Tidak Memiliki Akses')
  //     }

  //   }catch(error){
  //     res.status(500).json({
  //       message:'Internal Server Error',
  //       error:error.message
  //     })
  //   }
  // }
  static async detailAllMUK(req, res) {
    try {
      let userIsLogin = req.userLogin
      let asesorisLogin = false
      let { id } = req.params

      if (userIsLogin) {
        asesorisLogin = true
        let detailedMUK = await Apl02Dynamic.findAll({
          where: { baseId: id }
        })
        res.status(200).json(detailedMUK)
      } else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }

    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }


  // admin tambah skema
  static async tambahSkema(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()

      if (adminIsLogin === 'admin') {
        console.log(adminIsLogin)
        let params = {
          namaSkema: req.body.namaSkema,
          nomorSkema: req.body.nomorSkema,
          sektorSkema: req.body.sektorSkema,
          jenisSkema: req.body.jenisSkema,
          kodeUnitKompetensi: req.body.kodeUnitKompetensi,
          judulUnitKompetensi: req.body.judulUnitKompetensi,
          instrumenSkema: req.body.instrumenSkema,
          peninjauanInstrumen: req.body.peninjauanInstrumen,
          userId: userisLogin.id,
        }
        let filterSkema = await SkemaUjikom.findOne({
          where: { namaSkema: params.namaSkema }
        })
        if (!filterSkema) {
          let postSkema = await SkemaUjikom.create(params)
          if (postSkema) {
            res.status(201).json(`Skema Kompetensi ${params.namaSkema} telah diperbaharui`)
          } else {
            res.status(400).json('Terjadi kendala pada server kami')
          }
        } else {
          res.status(401).json(`Skema ${params.namaSkema} sudah tersedia di database`)
        }
      } else {
        res.status(401).json('Anda Tidak Memiliki Akses, silahkan login terlebih dahulu')
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }
  // admin patch skema
  static async patchSkema(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      let { id } = req.params
      let { namaSkema, nomorSkema, sektorSkema, jenisSkema, kodeUnitKompetensi, judulUnitKompetensi, instrumenSkema, peninjauanInstrumen } = req.body
      let filterSkemaPatch = await SkemaUjikom.findOne({
        where: { id, userId: userisLogin.id }
      })
      if (filterSkemaPatch) {

        if (namaSkema) filterSkemaPatch.namaSkema = namaSkema
        if (nomorSkema) filterSkemaPatch.nomorSkema = nomorSkema
        if (sektorSkema) filterSkemaPatch.sektorSkema = sektorSkema
        if (jenisSkema) filterSkemaPatch.jenisSkema = jenisSkema
        if (kodeUnitKompetensi) filterSkemaPatch.kodeUnitKompetensi = kodeUnitKompetensi
        if (judulUnitKompetensi) filterSkemaPatch.judulUnitKompetensi = judulUnitKompetensi
        if (instrumenSkema) filterSkemaPatch.instrumenSkema = filterSkemaPatch
        if (peninjauanInstrumen) filterSkemaPatch.peninjauanInstrumen = peninjauanInstrumen

        let saveUpdate = await filterSkemaPatch.save()

        if (saveUpdate) {
          res.status(201).json(`Skema ${namaSkema} berhasil di update`)
        } else {
          res.status(401).json('Tidak Dapat menyimpan perubahan')
        }
      } else {
        res.status(400).json('Anda Tidak Memiliki Akses')
      }

    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }
  // admin list peserta ujikom
  static async listPeserta(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()

      if (adminIsLogin === 'admin') {
        let listNamaPeserta = await PesertaUjikom.findAll()
        if (listNamaPeserta) {
          res.status(200).json(listNamaPeserta)
        } else {
          res.status(400).json('Belum ada Peserta yang mendaftar')
        }
      } else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  // admin add TUK
  static async addTUK(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      if (adminIsLogin === 'admin') {
        let { namaTUK, lokasiTUK, sptVerifikasiTUK, rekamanVerifikasi, skPenetapanTUK, lat, long } = req.body
        let filterTuk = await Tuk.findOne({
          where: { namaTUK }
        })

        if (!filterTuk) {
          let params = { namaTUK, lokasiTUK, sptVerifikasiTUK, rekamanVerifikasi, skPenetapanTUK, lat, long }
          console.log(params)
          let createTUK = await Tuk.create(params)
          if (createTUK) {
            res.status(201).json(`TUK ${namaTUK} berhasil dimasukkan dalam server`)
          }
        } else {
          res.status(404).json(`Sudah ada TUK yang terdaftar dengan nama ${namaTUK}, silahkan melakukan Pendataan TUK`)
        }

      } else {
        res.status(401).json('Anda Tidak memiliki Akses')
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  static async patchTUK(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      let { id } = req.params
      let { namaTUK, lokasiTUK, sptVerifikasiTUK, rekamanVerifikasi, skPenetapanTUK, lat, long } = req.body
      if (adminIsLogin == 'admin') {
        let findTUK = await Tuk.findOne({
          where: { id }
        })
        if (findTUK) {
          if (namaTUK) findTUK.namaTUK = namaTUK
          if (lokasiTUK) findTUK.lokasiTUK = lokasiTUK
          if (sptVerifikasiTUK) findTUK.sptVerifikasiTUK = sptVerifikasiTUK
          if (rekamanVerifikasi) findTUK.rekamanVerifikasi = rekamanVerifikasi
          if (skPenetapanTUK) findTUK.skPenetapanTUK = skPenetapanTUK
          if (lat) findTUK.lat = lat
          if (long) findTUK.long = long

          let saveUpdate = await findTUK.save()
          if (saveUpdate) {
            res.status(201).json(`Perubahan pada TUK ${findTUK.namaTUK} berhasil disimpan`)
          } else {
            res.status(400).json(`Perubahan tidak dapat disimpan`)
          }
        }
      } else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }
  // all user list TUK
  static async listTUK(req, res) {
    try {
      let userisLogin = req.userLogin

      if (userisLogin) {
        let findTUK = await Tuk.findAll({
          include: SkemaUjikom
        })
        if (findTUK) {
          res.status(200).json(findTUK)
        } else {
          res.status(400).json('Belum ada TUK yang terdaftar')
        }
      } else {
        res.status(401).json('Anda Tidak memiliki Akses')
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  // admin melakukan penghapusan skema
  static async deleteSkema(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      let { id } = req.params

      if (adminIsLogin == 'admin') {
        let filterSkema = await SkemaUjikom.findOne({
          where: { id }
        })
        if (filterSkema) {
          let deleteSkema = await filterSkema.destroy()
          res.status(200).json(`Skema ${filterSkema.namaSkema} berhasil dihapus`)
        } else {
          res.status(400).json('Skema tidak dapat ditemukan')
        }
      } else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  static async hapusTUK(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      let { id } = req.params
      let findTUK = await Tuk.findOne({
        where: { id }
      })
      if (adminIsLogin === 'admin') {
        let deleteTUK = await findTUK.destroy()
        if (deleteTUK) {
          res.status(201).json(`TUK dengan nama ${findTUK.namaTUK} berhasil dihapus`)
        } else {
          res.status(400).json(`Tidak ada TUK dengan nama ${findTUK.namaTUK}`)
        }
      } else {
        res.status(401).json(`Anda Tidak Memiliki Akses`)
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  static async plotTUK(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      let { namaSkema } = req.body
      let { id } = req.params
      let searchSkema = await SkemaUjikom.findOne({
        where: { namaSkema }
      })

      let searchTUK = await Tuk.findOne({
        where: { id }
      })

      if (adminIsLogin) {
        searchTUK.skemaUjikomId = searchSkema.id
        let plotTUK = await searchTUK.save()
        if (plotTUK) {
          res.status(201).json(`Penambahan ${searchSkema.namaSkema} berhasil ditetapkan ke TUK ${searchTUK.namaTUK}`)
        } else {
          res.status(400).json(`Tidak dapat menetapkan TUK ${searchTUK.namaTUK} ke Skema ${searchSkema.namaSkema}`)
        }
      } else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  static async hapusDataAPL01(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      let { id } = req.params

      let findPeserta = await PesertaUjikom.findOne({
        where: { id }
      })
      if (adminIsLogin) {
        let findAPL01 = await Apl01.findOne({ where: { pesertaUjikomId: id } })
        console.log(findAPL01)
        if (findAPL01) {
          let deleteData = await findAPL01.destroy()

          if (deleteData) {
            res.status(201).json(`Data APL01 ${findAPL01.namaLengkap} berhasil dihapus`)
            findPeserta.apl01 = 'Sudah Terisi'
            await findPeserta.save()

          } else {
            res.status(400).json('Terjadi Kesalahan dalam sistem kami')
          }
        }
      } else {
        res.status(401).json('Anda Tidak memiliki Akses')
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  static async listApl01(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()

      if (adminIsLogin) {
        let findAllApl01 = await Apl01.findAll({ include: PesertaUjikom })

        if (findAllApl01) {
          res.status(200).json(findAllApl01)
        } else {
          res.status(400).json('Belum ada yang mengisi APL 01')
        }
      } else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }

    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  // delete detil APL02 dinapeserta
  static async hapusApl02DinaPeserta(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      let { id } = req.params

      if (adminIsLogin) {
        let findPesertaDetail = await PesertaUjikom.findOne({
          where: { id },
          include: {
            model: Apl02Dynamic,
            through: { model: Apl02DinaPeserta }
          }
        })


        if (findPesertaDetail) {
          let deleteData = await Apl02DinaPeserta.destroy({
            where: {
              pesertaUjikomId: id
            }
          })
          if (deleteData) {
            res.status(200).json(`Detil APL 02 ${findPesertaDetail.namaPeserta} berhasil Dihapus`)
            findPesertaDetail.apl02 = 'Pending'
            await findPesertaDetail.save()
          }
        }
      } else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  static async listApl02Dina(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      if (adminIsLogin) {
        let findPesertaDetail = await PesertaUjikom.findAll({

          include: {
            model: Apl02Dynamic,
            through: { model: Apl02DinaPeserta }
          }
        })
        if (findPesertaDetail) {
          res.status(200).json(findPesertaDetail)
        }
      } else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }
  static async buatJadwal(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      if (adminIsLogin === 'admin') {
        let params = {
          tanggalWaktu: req.body.tanggalWaktu
        }
        let makeJadwal = await JadwalUjikom.create(params)
        if (makeJadwal) {
          res.status(201).json(params)
        } else {
          res.status(400).json('Bad Request')
        }
      } else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  static async gantiJadwal(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      let { id } = req.params
      let { tanggalWaktu } = req.body
      if (adminIsLogin === 'admin') {
        let cariJadwal = await JadwalUjikom.findOne({
          where: { id }
        })
        if (tanggalWaktu) cariJadwal.tanggalWaktu = tanggalWaktu
        let saveUpdate = await cariJadwal.save()
        if (saveUpdate) {
          res.status(201).json(tanggalWaktu)
        } else {
          res.status(400).json('Bad Request')
        }
      } else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  static async listJadwal(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      if (adminIsLogin === 'admin') {
        let findAllJadwal = await SkemaUjikom.findAll({
          include: [
            {
              model: PesertaUjikom
            },
            {
              model: JadwalUjikom
            },
          ]
        })

        let findJadwal = await JadwalUjikom.findAll({
          include: [
            {
              model: PesertaUjikom
            }
          ]
        })
        res.status(201).json({ findAllJadwal, findJadwal })
      } else { }

    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  static async plotJadwal(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      let { idJadwal } = req.params
      let { namaSkema } = req.body

      

      let findSkema = await SkemaUjikom.findOne({
        where: {
          namaSkema
        },
        include: [
          {
            model: PesertaUjikom
          },
          {
            model: JadwalUjikom
          },
     
        ]
      })

      let findPeserta = await PesertaUjikom.findAll({
        where: { skemaUjikomId: findSkema.id }
      })

      let findAsesor = await Asesor.findAll({
        where: { skemaUjikomId: findSkema.id }
      })

      if (adminIsLogin === 'admin') {
        if (findSkema) {
          let params = {
            jadwalUjikomId: idJadwal,
            skemaUjikomId: findSkema.id
          }

          let saveJadwal = await JadwalSkemaUjikom.create(params)
 
          if (saveJadwal) {
            res.status(201).json(saveJadwal)
            let filterJadwal = await JadwalSkemaUjikom.findOne({
              where:{
                jadwalUjikomId:idJadwal
              },
              attributes:['id'],
            
            })
            const masukanJadwalkePeserta = await Promise.all(
              findPeserta.map(async (peserta) => {
               
                peserta.jadwalUjikomId = idJadwal
                return await peserta.save()
              })
            )
            const masukanJadwalkeAsesor = await Promise.all(
              findAsesor.map(async (asesor) => {
                // console.log(peserta)
                asesor.jadwalSkemaUjikomId = filterJadwal.id
                return await asesor.save()
              })
            )
          } else {
            res.status(400).json('Bad Request')
          }
        } else {
          res.status(400).json(`${namaSkema} belum terdaftar di database LSP`)
        }
      } else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  static async editJadwal(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      let { idJadwal } = req.params
      let { namaSkema, tanggalWaktu } = req.body

      let findSkema = await SkemaUjikom.findOne({
        where: {
          namaSkema
        },
        include: [
          {
            model: PesertaUjikom
          },
          {
            model: JadwalUjikom
          },
        ]
      })
      let gantiJadwal = findSkema.dataValues.JadwalUjikoms

      let filterJadwalUjikom = await JadwalSkemaUjikom.findOne({
        where: {
          id: idJadwal
        }
      })
      let filterJadwal = await JadwalUjikom.findOne({
        where: {
          id: idJadwal
        },
        incude: [{
          model: SkemaUjikom,
          through: {
            model: JadwalSkemaUjikom
          }
        }]
      })
      if (filterJadwalUjikom) {
        if (tanggalWaktu) filterJadwal.tanggalWaktu = tanggalWaktu
        let saveJadwal = await filterJadwal.save()
        if (saveJadwal) {
          res.status(200).json(findSkema.dataValues)

        } else {
          res.status(400).json('Bad Request')
        }
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  static async hapusJadwalSkema(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      let { idJadwal } = req.params

      let filterJadwalUjikom = await JadwalSkemaUjikom.findOne({
        where: {
          jadwalUjikomId: idJadwal
        }
      })

      let findPeserta = await PesertaUjikom.findAll({
        where: { jadwalUjikomId: idJadwal }
      })

      if (adminIsLogin === 'admin') {
        if (filterJadwalUjikom) {
          let deleteJadwal = await filterJadwalUjikom.destroy()
      
          let valueIdJadwal = '0'
          if (deleteJadwal) {
            res.status(200).json('Jadwal Berhasil Dihapus')
            const masukanJadwalkePeserta = await Promise.all(
              findPeserta.map(async (peserta) => {
                peserta.jadwalUjikomId = idJadwal
                console.log(peserta.jadwalUjikomId, '----')
                return await peserta.save()
              })
            )
          }
        } else {
          res.status(400).json('Tidak Ada Jadwal yang dimaksud')
        }
      } else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  static async hapusJadwal(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      let { idJadwal } = req.params

      let filterJadwalUjikom = await JadwalUjikom.findOne({
        where: {
          id: idJadwal
        }
      })
      if (adminIsLogin === 'admin') {
        if (filterJadwalUjikom) {
          let deleteJadwal = await filterJadwalUjikom.destroy()
          if (deleteJadwal) {
            res.status(200).json('Jadwal Berhasil Dihapus')
          }
        } else {
          res.status(400).json('Tidak Ada Jadwal yang dimaksud')
        }
      } else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  static async hapusFrak01(req, res) {
    try {
      let userisLogin = req.userLogin
      let adminIsLogin = userisLogin.role.toLowerCase()
      let { idPeserta } = req.params

      let findFrak01 = await FrAk01.findOne({
        where: {
          pesertaUjikomId: idPeserta
        }
      })
      let findPeserta = await PesertaUjikom.findOne({
        where: { id: idPeserta }
      })
      if (adminIsLogin === 'admin') {
        console.log(findFrak01)
        let deleteFrak01 = await findFrak01.destroy()

        if (deleteFrak01) {
          res.status(200).json(`${findFrak01.namaPeserta} berhasil dihapus`)
          findPeserta.frAK01 = 'Pending'
          await findPeserta.save()
        }
      } else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }
  // news lsp
  // about LSP UPN VJ
  // reviewer LSP UPNVJ

  // pemetaan anak didik LSP UPNVJ
}