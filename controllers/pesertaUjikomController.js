const { fileMUK, User, Asesor, PesertaUjikom, JadwalUjikom, Apl01, Apl02Base, Apl02Dynamic, SkemaUjikom, Apl02DinaPeserta, BuktiPortfolio, Tuk, JadwalSkemaUjikom, FrAk01 } = require('../models')
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = class pesertaUjikomController {
  // home
  static async home(req, res) {

    try {
      res.status(200).json({
        home: 'ini halaman home'
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // `peserta melakukan input data dan memulai proses pendaftaran`
  static async inputDataPeserta(req, res) {
    try {
      let userIsLogin = req.userLogin

      if (userIsLogin.role.toLowerCase() === 'peserta ujikom') {
        let findPeserta = await User.findOne({
          where: { id: userIsLogin.id }
        })
        if (findPeserta) {
          let params = {
            namaPeserta: req.body.namaPeserta,
            lat: req.body.lat,
            long: req.body.long,
            apl01: 'Pending',
            apl02: 'Pending',
            frAK01: 'Pending',
            userId: findPeserta.id

          }
          let findPesertaData = await PesertaUjikom.findOne({
            where: { namaPeserta: req.body.namaPeserta }
          })
          if (findPesertaData) {
            res.status(401).json('Data Peserta Sudah Tersedia')
          } else {
            let postPendaftaran = await PesertaUjikom.create(params)
            if (postPendaftaran) {
              res.status(201).json(`Pendataan Peserta Berhasil`)
            } else {
              res.status(400).json('Pendataan Peserta Tidak Berhasil')
            }
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
  // melihat data pribadi
  static async listDataPribadi(req, res) {
    try {
      let userIsLogin = req.userLogin
      let id = userIsLogin.id

      let filterPeserta = await PesertaUjikom.findOne({
        where: { userId: userIsLogin.id },
        include: [
          { model: JadwalUjikom },
          { model: SkemaUjikom },
          { model: BuktiPortfolio }
        ]
      })

      if (userIsLogin.role.toLowerCase() === 'peserta ujikom') {
        if (filterPeserta) {
          res.status(200).json(filterPeserta)

        } else {
          res.status(400).json('Anda Belum Mengisi Kelengkapan data Profil')
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
  // edit data pribadi peserta
  static async editDataPribadi(req, res) {
    try {
      let userIsLogin = req.userLogin
      let id = userIsLogin.id
      let { namaPeserta, lat, long, apl01, apl02, frAK01 } = req.body
      let findDataPeserta = await PesertaUjikom.findOne({
        where: { userId: id }
      })

      if (userIsLogin.role.toLowerCase() === 'peserta ujikom' && findDataPeserta) {

        if (namaPeserta) findDataPeserta.namaPeserta = namaPeserta
        if (lat) findDataPeserta.lat = lat
        if (long) findDataPeserta.long = long
        if (apl01) findDataPeserta.apl01 = apl01
        if (apl02) findDataPeserta.apl02 = apl02
        if (frAK01) findDataPeserta.frAK01 = frAK01
        let saveUpdate = await findDataPeserta.save()

        if (saveUpdate) {
          res.status(201).json(`Data Pribadi ${findDataPeserta.namaPeserta} berhasil di update`)
        } else {
          res.status(401).json('Tidak dapat melakukan update')
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
  // delete data pribadi perserta
  static async deleteDataPribadi(req, res) {
    try {

      let userIsLogin = req.userLogin
      let id = userIsLogin.id
      let findDataPeserta = await PesertaUjikom.findOne({
        where: { userId: id }
      })
      if (userIsLogin.role.toLowerCase() === 'peserta ujikom' && findDataPeserta) {
        let hapusData = await findDataPeserta.destroy()
        if (hapusData) {
          res.status(201).json(`Data Pribadi ${findDataPeserta.namaPeserta} berhasil dihapus`)
        } else {
          res.status(401).json('Data Tidak dapat Dihapus, silahkan hubungi Admin untuk melakukan ini')
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
  // jadwal ujikom peserta
  static async jadwalUjikomPeserta(req, res) {
    try {

      let userIsLogin = req.userLogin
      let id = userIsLogin.id
      if (userIsLogin.role.toLowerCase() === 'peserta ujikom') {
        // let findSchedule = await JadwalUjikom.findAll({
        //   include:{
        //     model:PesertaUjikom
        //   },
        //   where:{
        //     id
        //   }
        // })
        // let findDataPeserta = await PesertaUjikom.findOne({
        //   where: { userId: id }
        // })
        // if (findSchedule && findDataPeserta) {
        //   res.status(200).json(findSchedule)
        // } if (!findSchedule) {
        //   res.status(401).json('Anda Belum Mendaftar Pada Suatu Skema Ujikom, silahkan mendaftarkan diri dahulu')
        // } else {
        //   res.status(401).json('Anda Belum Memiliki Jadwal Ujikom, harap mendaftar ke Skema atau silahkan tunggu admin untuk melakukan Plotting')
        // }

        let findOneJadwal = await SkemaUjikom.findOne({
          where: {}, // Kondisi untuk SkemaUjikom (kosong jika tidak ada kondisi khusus)
          include: [
            {
              model: PesertaUjikom,
              where: { userId: id }, // Sesuaikan dengan ID peserta yang dicari
              include: [
                {
                  model: JadwalUjikom, // Mengambil jadwal hanya untuk peserta terkait
                }
              ]
            },
            {
              model: Tuk, // Jika masih ingin menampilkan TUK (tidak terkait Peserta)
            }
          ]
        });
        if (findOneJadwal) {
          res.status(200).json(findOneJadwal)
        } else {
          res.status(404).json('Tidak Ada Jadwal yang terdaftar untuk anda')
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
  static async isiAPL01(req, res) {
    try {
      let userIsLogin = req.userLogin
      let pesertaIsLogin = userIsLogin.role.toLowerCase()
      let { nik, namaLengkap, jenisKelamin, tempatLahir, tanggalLahir, alamatDomisili, provinsi, kota, kecamatan, noTelp, email, pendidikanTerakhir, namaSekolahPT, jurusanProdi,
        pekerjaan, namaPerusahaan, jabatan, alamatPerusahaan, telpPerusahaan
      } = req.body

      let cekDaftarPeserta = await PesertaUjikom.findOne({
        where: { userId: userIsLogin.id }
      })
      let cekApl01 = await Apl01.findOne({ where: { pesertaUjikomId: cekDaftarPeserta.id } })

      if (pesertaIsLogin === 'peserta ujikom') {
        if (cekDaftarPeserta) {
          let params = {
            nik, namaLengkap, jenisKelamin, tempatLahir, tanggalLahir, alamatDomisili, provinsi, kota, kecamatan, noTelp, email, pendidikanTerakhir, namaSekolahPT, jurusanProdi,
            pekerjaan, namaPerusahaan, jabatan, alamatPerusahaan, telpPerusahaan, pesertaUjikomId: cekDaftarPeserta.id
          }

          if (!cekApl01) {
            let saveApl01 = await Apl01.create(params)
            // let saveApl01 = params
            if (saveApl01) {
              res.status(201).json('Data APL 01 anda telah berhasil disimpan')
              cekDaftarPeserta.apl01 = 'Sudah Terisi'
              let saveStatus = await cekDaftarPeserta.save()
              if (!saveStatus) {
                res.status(400).json('Terjadi Kesalahan dalam update data status apl01')
              }
            }
          } else {
            res.status(401).status('Anda Telah menyerahkan form APL 01, hubungi Admin untuk melakukan perubahan')
          }
        } else {
          res.status(400).json('Anda Belum mendaftarkan diri sebagai Peserta Ujikom, lakukan update data diri sebagai peserta ujikom')
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
  static async pilihSkema(req, res) {
    try {
      let userIsLogin = req.userLogin
      let pesertaIsLogin = userIsLogin.role.toLowerCase()
      if (pesertaIsLogin) {
        let cekDaftarPeserta = await PesertaUjikom.findOne({
          where: { userId: userIsLogin.id }
        })
        let { namaSkema } = req.body
        let searchSkema = await SkemaUjikom.findOne({
          where: {
            namaSkema
          }
        })
        if (cekDaftarPeserta) {
          if (namaSkema) cekDaftarPeserta.skemaUjikomId = searchSkema.id
          let saveUpdate = cekDaftarPeserta.save()
          if (saveUpdate) {
            res.status(201).json(`Anda Telah berhasil memilih skema`)
          }
        }
      } else {
        res.status(401).json('Anda Belum Mendaftarkan Diri sebagai Peserta Ujikom')
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }
  static async detilAPL02(req, res) {
    try {
      let userIsLogin = req.userLogin
      let pesertaIsLogin = userIsLogin.role.toLowerCase()
      if (pesertaIsLogin) {
        let pesertaUjikom = await PesertaUjikom.findOne({
          where: { userId: userIsLogin.id },
          include: SkemaUjikom
        })
        let searchingNamaSkema = pesertaUjikom.SkemaUjikom.namaSkema
        // console.log(searchingNamaSkema)
        let searchFormApl02 = await Apl02Base.findOne({
          where: { namaSkema: searchingNamaSkema },
          include: {
            model: Apl02Dynamic,
            as: 'dynamicFields'
          }
        })

        let params = {
          dynamicFields: req.body.map(dynamicField => ({
            // id: dynamicField.id,
            fieldName: dynamicField.fieldName,
            fieldQuestion: dynamicField.fieldQuestion,
            fieldValue: dynamicField.fieldValue,
            pesertaUjikomId: pesertaUjikom.id,
            apl02DynamicId: dynamicField.id
          }))
        }
        const createdEntries = await Promise.all(
          params.dynamicFields.map(async (dynamicField) => {
            return await Apl02DinaPeserta.create({
              apl02DynamicId: dynamicField.apl02DynamicId,  // This comes from params.dynamicFields
              pesertaUjikomId: pesertaUjikom.id,  // This is assumed to come from input
              fieldName: dynamicField.fieldName,
              fieldQuestion: dynamicField.fieldQuestion,
              fieldValue: dynamicField.fieldValue

            });
          })
        );

        if (createdEntries) {
          res.status(201).json(`Detil APL02 ${pesertaUjikom.namaPeserta} berhasil disimpan`)
          pesertaUjikom.apl02 = 'Sudah Terisi'
          await pesertaUjikom.save()
        } else {
          res.status(400).json('Data APL 02 anda tidak tersimpan')
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
  static async isiPortofolio(req, res) {
    try {
      let userIsLogin = req.userLogin
      let pesertaIsLogin = userIsLogin.role.toLowerCase()
      let { pasfoto, identitasPribadi, buktiPendidikan, buktiPelatihan, buktiPengalamanKerja, portfolio } = req.body

      let pesertaUjikomDetil = await PesertaUjikom.findOne({
        where: { userId: userIsLogin.id }
      })
      let idPeserta = pesertaUjikomDetil.id
      if (pesertaIsLogin) {
        let params = {
          pasfoto, identitasPribadi, buktiPendidikan, buktiPelatihan, buktiPengalamanKerja, portfolio, pesertaUjikomId: idPeserta
        }
        let createBukti = await BuktiPortfolio.create(params)
        if (createBukti) {
          res.status(201).json(`Portfolio anda berhasil disimpan`)
        } else {
          res.status(400).json(`Terjadi Kesalahan di sistem Kami`)
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
  static async isiFrak01(req, res) {
    try {
      let userIsLogin = req.userLogin
      let pesertaIsLogin = userIsLogin.role.toLowerCase()
      let filterPeserta = await PesertaUjikom.findOne({
        where: { userId: userIsLogin.id },
        include: [
          { model: JadwalUjikom },
          { model: SkemaUjikom, attributes: ['id', 'namaSkema'] },
          { model: User, attributes: ['userName'] }
        ]
      })

      let findTUK = await Tuk.findOne({
        where: { skemaUjikomId: filterPeserta.dataValues.SkemaUjikom.id },
        include: {
          model: SkemaUjikom,
          attributes: ['id', 'namaSkema']
        }
      })

      let findAsesor = await Asesor.findOne({
        where: {
          skemaUjikomId: filterPeserta.dataValues.SkemaUjikom.id
        }
      })
      let findJadwal = await SkemaUjikom.findOne({
        where: { id: filterPeserta.dataValues.SkemaUjikom.id },
        include: {
          model: JadwalUjikom,
          through: {
            model: JadwalSkemaUjikom,
          }
        }
      })

      if (pesertaIsLogin === 'peserta ujikom') {
        let params = {
          skemaSertifikasi: filterPeserta.dataValues.SkemaUjikom.namaSkema,
          tuk: 'Sewaktu',
          namaTuk: findTUK.namaTUK,
          namaAsesor: findAsesor.namaAsesor,
          namaPeserta: filterPeserta.namaPeserta,
          usernamePeserta: filterPeserta.User.userName,
          buktiDikumpulkan: req.body.buktiDikumpulkan,
          // tanggalPelaksanaan:new Date(findJadwal.dataValues.JadwalUjikoms),
          // waktuPelaksanaan :new Date(findJadwal.dataValues.JadwalUjikoms) ,
          tanggalPelaksanaan: req.body.tanggalPelaksanaan,
          waktuPelaksanaan: req.body.waktuPelaksanaan,
          tandaTanganAsesor: req.body.tandaTanganAsesor,
          pesertaUjikomId: filterPeserta.id,
          skemaUjikomId: filterPeserta.SkemaUjikom.id,
          tukId: findTUK.id
        }

        let createFrak01 = await FrAk01.create(params)

        if (createFrak01) {
          res.status(201).json(params)
          filterPeserta.frAK01 = 'Sudah Terisi'
          await filterPeserta.save()
        } else {
          res.status(400).json('Frak01 tidak tersimpan')
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

  static async checkPorto(req, res) {
    try {
      let userIsLogin = req.userLogin
      let pesertaIsLogin = userIsLogin.role.toLowerCase()

      if (pesertaIsLogin == 'peserta ujikom') {
        let filterPeserta = await PesertaUjikom.findOne({
          where: { userId: userIsLogin.id },
          include: [
            { model: BuktiPortfolio },
            // {model: SkemaUjikom, attributes:['id','namaSkema']},
            // {model:User, attributes:['userName']}
          ]
        })
        res.status(200).json(filterPeserta)
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

  static async listAPL02(req, res) {
    try {
      const userIsLogin = req.userLogin
      const pesertaIsLogin = userIsLogin.role.toLowerCase()
      if (pesertaIsLogin == 'peserta ujikom') {
        const findDataAsesi = await PesertaUjikom.findOne({
          where: {
            userId: userIsLogin.id
          },
          include: { model: SkemaUjikom }
        })

        if (findDataAsesi) {
          const findAPL02 = await Apl02Base.findOne({
            where: {
              namaSkema: findDataAsesi.SkemaUjikom.namaSkema
            }
          })

          if (findAPL02) {
            const findListAPL02 = await Apl02Dynamic.findAll({
              where: {
                baseId: findAPL02.id
              },
              order: [[
                'unitKompetensiId', 'ASC'
              ]]
            })
            res.status(200).json(findListAPL02)
          } else {
            res.status(404).json('Anda belum Memilih skema ujikom')
          }

        } else {
          res.status(404).json('Anda Belum Melengkapi Data Sebagai Asesi')
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
  static async postMUK(req, res) {
    try {
      const { dokumen } = req.body;
      const userId = req.userLogin.id;
      console.log(dokumen, 'dari fe')
      // Validasi: Pastikan dokumen ada
      if (!dokumen) {
        return res.status(400).json({
          message: 'Parameter dokumen harus diisi dengan nama dokumen yang benar.',
        });
      }

      // Cari peserta berdasarkan userId
      const peserta = await PesertaUjikom.findOne({
        where: { userId },
        include: [{ model: SkemaUjikom }]
      });

      if (!peserta) {
        return res.status(404).json({ message: 'Peserta tidak ditemukan.' });
      }

      // Validasi: Pastikan ada file yang diunggah
      const uploadedFile = req.file;
      if (!uploadedFile) {
        return res.status(400).json({ message: 'File harus diunggah.' });
      }



      // Pastikan dokumen yang dikirim adalah kolom yang valid dalam PesertaUjikom
      if (!(dokumen in peserta)) {
        return res.status(400).json({
          message: `Kolom dokumen '${dokumen}' tidak ditemukan dalam database.`,
        });
      }

      // Update kolom dalam PesertaUjikom sesuai dengan nilai dokumen yang dikirim
      peserta[dokumen] = uploadedFile.path;
      await peserta.save();  // Simpan perubahan

      res.json({
        message: `File berhasil diunggah dan disimpan pada kolom '${dokumen}'.`,
        file: uploadedFile,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }


  // Mendapatkan file berdasarkan dokumenKe
  static async getFileMUK(req, res) {
    try {

      const { dokumen } = req.params;
      const userId = req.userLogin.id
      console.log(dokumen)
      if (!dokumen) {
        return res.status(400).json({
          message: 'Parameter dokumenKe harus diisi dengan nilai 1-24.',
        });
      }

      const peserta = await PesertaUjikom.findOne({ where: { userId }, include: [{ model: SkemaUjikom }] });
      if (!peserta) {
        return res.status(404).json({ message: 'Peserta tidak ditemukan.' });
      }

      const fileColumn = `${dokumen}`;
      const filePath = peserta[fileColumn];

      if (!filePath || !fs.existsSync(filePath)) {
        return res.status(404).json({ message: `File untuk dokumen ${dokumen} tidak ditemukan.` });
      }
      console.log(filePath)
      res.download(filePath, path.basename(filePath));
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  };

  static async downloadFileStream(req, res) {
    try {
      const { dokumen } = req.params;
      const userId = req.userLogin.id

      if (!dokumen) {
        return res.status(400).json({
          message: 'Parameter dokumenKe harus diisi dengan nilai 1-24.',
        });
      }


      const peserta = await PesertaUjikom.findOne({ where: { userId }, include: [{ model: SkemaUjikom }] });
      const file = await fileMUK.findOne({ where: { namaSkema: peserta.SkemaUjikom.namaSkema, fileName: dokumen } });
      if (!peserta) {
        return res.status(404).json({ message: 'Peserta tidak ditemukan.' });
      }

      const filePath = file.path;

      if (!filePath || !fs.existsSync(filePath)) {
        return res.status(404).json({ message: `File untuk dokumen ${dokumen} tidak ditemukan.` });
      }
      console.log(`Mencoba mengunduh file di path: ${filePath}`);
      // res.download(filePath, path.basename(filePath));
      res.download(filePath, path.basename(filePath), (err) => {
        if (err) {
          return res.status(500).json({
            message: 'Gagal mengunduh file.',
            error: err.message,
          });
        }
      })
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }

  static async getAllFileAsesi(req, res) {
    try {
      console.log('a')
      const userId = req.userLogin.id

      const peserta = await PesertaUjikom.findOne({ where: { userId }, include: [{ model: SkemaUjikom }] });

      const file = peserta
      if (!file) {
        return res.status(404).json({ message: 'File tidak ditemukan' });
      }

      res.json({
        message: 'File ditemukan',
        file: file,
      });


    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }

  static async streamFileMUK(req, res) {
    try {
      const userId = req.userLogin.id
      const peserta = await PesertaUjikom.findOne({ where: { userId }, include: [{ model: SkemaUjikom }] });
      if (!peserta) {
        res.status(404).json("anda belum terdaftar")
      }
      const file = await fileMUK.findAll({ where: { namaSkema: peserta.SkemaUjikom.namaSkema } });
      // const file = peserta
      if (!file) {
        return res.status(404).json({ message: 'File tidak ditemukan' });
      }

      res.json({
        message: 'File ditemukan',
        file: file,
      });

    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }

  static async updateFileAsesiMUK(req, res) {
    try {
      const namaKolom = req.params.namaFile;  // ID file dari URL
      const userId = req.userLogin.id
      const uploadedFile = req.file;


      // Cari data peserta ujikom berdasarkan userId
      const oldFile = await PesertaUjikom.findOne({ where: { id: userId } });
      if (!oldFile) {
        return res.status(404).json({ message: 'Data peserta tidak ditemukan' });
      }

      // Hapus file lama jika ada
      const oldFilePath = oldFile[namaKolom];
      if (oldFilePath && fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath); // Hapus file dari sistem
      }

      // Update metadata di database dengan file baru
      oldFile[namaKolom] = uploadedFile.path; // Update nilai kolom dinamis
      await oldFile.save(); // Simpan perubahan ke database

      res.json({
        message: 'File berhasil diperbarui',
        updatedColumn: namaKolom,
        filePath: uploadedFile.path,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }

  static async getAllFileMUK(req, res) {
    try {
      const { namaSkema } = req.params

      let adminIsLogin = req.userLogin.role.toLowerCase()

      if (adminIsLogin === 'peserta ujikom') {
        const file = await fileMUK.findAll({ where: { namaSkema: namaSkema } });
        if (!file) {
          return res.status(404).json({ message: 'File tidak ditemukan' });
        }

        res.json({
          message: 'File ditemukan',
          file: file,
        });
      } else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }

    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }

  
static async deleteFileAsesi(req, res) {
  try {
    const { dokumen } = req.params; // ambil dokumen yang diterima
    const fileColumn = dokumen; // kolom yang ingin dihapus (misalnya 'apl01')

    // Cari data peserta yang memiliki nilai di kolom sesuai dengan dokumen yang diterima
    const cariFile = await PesertaUjikom.findOne({
      where: {
        [fileColumn]: {
          [Sequelize.Op.ne]: null, // pastikan kolom tidak null
        },
      },
    });

    if (!cariFile) {
      return res.status(404).json({
        message: 'Dokumen tidak ditemukan atau kolom tidak ada',
      });
    }

    // Dapatkan path file dari kolom yang sesuai
    const filePath = cariFile[fileColumn];

    // Cek apakah filePath ada dan file tersebut ada di server
    if (filePath) {
      // Hapus file fisik di server
      fs.unlink(filePath, (err) => {
        if (err) {
          return res.status(500).json({
            message: 'Gagal menghapus file',
            error: err.message,
          });
        }
        // Jika file berhasil dihapus, update database untuk menghapus nilai kolom
        PesertaUjikom.update(
          { [fileColumn]: null }, // set nilai kolom menjadi null
          {
            where: { id: cariFile.id }, // update baris yang sesuai
          }
        )
          .then(() => {
            res.json({
              message: 'File dan kolom berhasil dihapus',
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: 'Gagal mengupdate database',
              error: error.message,
            });
          });
      });
    } else {
      return res.status(404).json({
        message: 'File tidak ditemukan di server',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
}
}