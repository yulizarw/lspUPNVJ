const { User,fileMUK, Asesor, JadwalUjikom, Apl02Base, Apl02Dynamic, SkemaUjikom, JadwalSkemaUjikom, Apl02DinaPeserta, PesertaUjikom} = require('../models')
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require('path');

const fs = require('fs');

module.exports = class asesorController {
  // asesor only

  // Buat profil asesor
  static async updateProfil(req, res) {
    try {
      let userisLogin = req.userLogin
      let asesorIsLogin = userisLogin.role.toLowerCase()
      let { namaSkema } = req.body
      let findSkema = await SkemaUjikom.findOne({
        where: { namaSkema }
      })

      if (asesorIsLogin == 'asesor') {
        if (findSkema) {
          let params = {
            namaAsesor: req.body.namaAsesor,
            noRegMET: req.body.noRegMET,
            tahunAkhirRegMET: req.body.tahunAkhirRegMET,
            jumlahMelaksanakanUjikom: '0',
            kumulatifMelakukanUjikom: '0',
            skemaUjikomId: findSkema.id,
            userId: userisLogin.id
          }

          let findAsesorData = await Asesor.findOne({
            where: { userId:userisLogin.id }
          })

          if (findAsesorData) {
            res.status(401).json('Data Asesor Sudah Tersedia')
          } else {
            let postProfilAsesor = await Asesor.create(params)
            if (postProfilAsesor) {
              let findAsesorData2 = await Asesor.findOne({
                where: { namaAsesor: req.body.namaAsesor }
              })
              if (findAsesorData2) {
                let paramsBuatAPL02 = {
                  namaSkema,
                  asesorId: findAsesorData2.id
                }
               
                let saveToAPL02Base = await Apl02Base.create(paramsBuatAPL02)
              } else {
                res.status(401).json('Terjadi Kesalahan pada Sistem Kami')
              }


              res.status(201).json(`Profil ${params.namaAsesor} berhasil dibuat`)
            } else {
              res.status(401).json('Terjadi Kesalahan pada Sistem Kami')
            }
          }
        } else {
          res.status(404).json('Tidak ada nama skema itu')
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

  // ubah profil data diri
  static async ubahProfil(req, res) {
    try {
      let userisLogin = req.userLogin
      let id = userisLogin.id

      let { namaAsesor, noRegMET, tahunAkhirRegMET, jumlahMelaksanakanUjikom, kumulatifMelakukanUjikom } = req.body

      let findDataAsesor = await Asesor.findOne({
        where: { userId: id }
      })

      if (userisLogin.role.toLowerCase() === 'asesor' && findDataAsesor) {
        if (namaAsesor) findDataAsesor.namaAsesor = namaAsesor
        if (noRegMET) findDataAsesor.noRegMET = noRegMET
        if (tahunAkhirRegMET) findDataAsesor.tahunAkhirRegMET = tahunAkhirRegMET
        if (jumlahMelaksanakanUjikom) findDataAsesor.jumlahMelaksanakanUjikom = jumlahMelaksanakanUjikom
        if (kumulatifMelakukanUjikom) findDataAsesor.kumulatifMelakukanUjikom = kumulatifMelakukanUjikom

        let saveUpdate = await findDataAsesor.save()
        if (saveUpdate) {
          res.status(201).json(`Data Pribadi ${findDataAsesor.namaAsesor} berhasil di update`)
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
    //  tambah MUK
    // static async addMUK(req, res) {
    //   try {
    //     let userisLogin = req.userLogin
    //     let asesorisLogin = false
    //     let id = userisLogin.id
    //     let idAsesor = await Asesor.findOne({ where: { userId: id } })

    //     if (userisLogin.role.toLowerCase() === 'asesor') {
    //       asesorisLogin = true

    //       if (asesorisLogin == true) {
    //         let { namaSkema, dynamicFields } = req.body
            
    //         let base = await Apl02Base.create({ namaSkema, asesorId: idAsesor.id });

    //         let dynamicEntries = dynamicFields.map(field => ({
    //           unitKompetensiId: field.unitKompetensiId,
    //           fieldQuestion: field.fieldQuestion,
    //           fieldName: field.fieldName,
    //           fieldValue: field.fieldValue,
    //           baseId: base.asesorId,
    //         }));
    //         await Apl02Dynamic.bulkCreate(dynamicEntries);
    //         res.status(201).send('MUK berhasil dibuat');
    //       } else {
    //         res.status(401).json('Mohon Maaf Anda Harus Login Terlebih Dahulu')
    //       }
    //     } else {
    //       res.status(401).json('Anda Tidak Memiliki Akses')
    //     }
    //   } catch (error) {
    //     res.status(500).json({
    //       message: 'Internal Server Error',
    //       error: error.message
    //     })
    //   }

    // }
    static async addMUK(req, res) {
      try {
        let userisLogin = req.userLogin;
        let asesorisLogin = false;
        let id = userisLogin.id;
        let idAsesor = await Asesor.findOne({ where: { userId: id } });
    
        if (userisLogin.role.toLowerCase() === 'asesor') {
          asesorisLogin = true;
    
          if (asesorisLogin) {
            let { namaSkema, dynamicFields } = req.body;
    
            // Buat Apl02Base baru
            // let base = await Apl02Base.create({ namaSkema, asesorId: idAsesor.id });
            const findAsesorBase = await Apl02Base.findOne({
              where:{
                asesorId:idAsesor.id
              }
            })

            
            let newDynamicEntries = [];
            for (const field of dynamicFields) {
             
              // Cek apakah item sudah ada di database
              const existingEntry = await Apl02Dynamic.findOne({
                where: {
                  unitKompetensiId: field.unitKompetensiId,
                  fieldQuestion: field.fieldQuestion,
                  fieldName: field.fieldName,
                  baseId: findAsesorBase.id, // Pastikan data dihubungkan ke base yang sesuai
                },
              });
    
              if (!existingEntry) {
                // Jika tidak ada, tambahkan ke array untuk dimasukkan
                newDynamicEntries.push({
                  unitKompetensiId: field.unitKompetensiId,
                  fieldQuestion: field.fieldQuestion,
                  fieldName: field.fieldName,
                  fieldValue: field.fieldValue,
                  baseId: findAsesorBase.id,
                });
              }
            }
    
            // Tambahkan data baru ke database
            if (newDynamicEntries.length > 0) {
              await Apl02Dynamic.bulkCreate(newDynamicEntries);
            }
    
            res.status(201).send('MUK berhasil ditambahkan');
          } else {
            res.status(401).json('Mohon Maaf Anda Harus Login Terlebih Dahulu');
          }
        } else {
          res.status(401).json('Anda Tidak Memiliki Akses');
        }
      } catch (error) {
        res.status(500).json({
          message: 'Internal Server Error',
          error: error.message,
        });
      }
    }
    

  // patch muk
  static async updateMUK(req, res) {
    try {
      let asesorIsLogin = req.userLogin.role.toLowerCase()
      let { id } = req.params
      let { fieldName, fieldQuestion, fieldValue, unitKompetensiId} = req.body

      if (asesorIsLogin) {
        let detailedMUK = await Apl02Dynamic.findOne({
          where: { id }
        })

        if (fieldName) detailedMUK.fieldName = fieldName
        if (fieldQuestion) detailedMUK.fieldQuestion = fieldQuestion
        if (fieldValue) detailedMUK.fieldValue = fieldValue
        if (unitKompetensiId) detailedMUK.unitKompetensiId = unitKompetensiId
        let saveUpdate = await detailedMUK.save()

        if (saveUpdate) {
          res.status(201).json(`Unit Kompetensi ke ${detailedMUK.unitKompetensiId} berhasil di update`)
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

  // memilih skema
  static async memilihSkema(req, res) {
    try {
      let asesorIsLogin = req.userLogin.role.toLowerCase()
      let { namaSkema } = req.body
      if (asesorIsLogin) {
        let findSkema = await SkemaUjikom.findOne({
          where: { namaSkema }
        })
        if (findSkema) {
          let userIsLogin = req.userLogin
          let findAsesor = await Asesor.findOne({
            where: { userId: userIsLogin.id }
          })
          if (namaSkema) findAsesor.skemaUjikomId = findSkema.id
          let saveUpdate = await findAsesor.save()



          if (saveUpdate) {
            res.status(201).json(`${namaSkema} telah dipilih oleh ${findAsesor.namaAsesor}`)
          } else {
            res.status(400).json(`${namaSkema} tidak berhasil disimpan pada data ${findAsesor.namaAsesor}`)
          }
        } else {
          res.status(400).json(`${namaSkema} belum terdaftar sebagai Skema Ujikom di LSP UPNVJ`)
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

  // get data diri asesor
  static async fetchDataDiriAsesor(req, res) {
    try {
      let asesorIsLogin = req.userLogin.role.toLowerCase()
      if (asesorIsLogin) {
        let findOneData = await Asesor.findOne({
          where: { userId: req.userLogin.id },
          include: [
            {
              model: SkemaUjikom
            }
          ]
        })

        if (findOneData) {

          let filterJadwalAwal = await JadwalSkemaUjikom.findOne({
            where: {
              id: findOneData.jadwalSkemaUjikomId
            },
            incude: [{
              model: SkemaUjikom,
              through: {
                model: JadwalSkemaUjikom
              }
            }]
          })

          if (filterJadwalAwal) {
            let findOneJadwal = await JadwalUjikom.findOne({
              where: {
                id: filterJadwalAwal.jadwalUjikomId
              }
            })
            
            res.status(200).json({ Asesor: findOneData, filterJadwal: findOneJadwal })

          } else {
            res.status(200).json({ Asesor: findOneData })
          }
        } else {
          res.status(200).json(null)
        }

      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }
  // list APL 02 all user
  static async listAPL02(req,res) {
    try {
      let userisLogin = req.userLogin
      let asesorIsLogin = req.userLogin.role.toLowerCase()
    
      if (asesorIsLogin) {
       
        let findAsesorData = await Asesor.findOne({
          where: { userId: userisLogin.id },
          include: [
            {
              model: SkemaUjikom
            }
          ]
        })
     
        let listAPL02Base = await Apl02Base.findOne({
          where:{asesorId:findAsesorData.dataValues.id}
        })
  
        let listAPL02 = await Apl02Dynamic.findAll({
          where:{baseId : listAPL02Base.dataValues.id },
          order:[['unitKompetensiId', 'ASC']]
        })
        if (listAPL02) {
          res.status(200).json(listAPL02)
        }else {
          res.status(404).json(null)
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

  // delete muk
  static async deleteMUK (req,res) {
    try {
      let userisLogin = req.userLogin
      let asesorIsLogin = userisLogin.role.toLowerCase()
      let {id} = req.params
      if (asesorIsLogin) {
        // let deleteAPL02 = await Apl02DinaPeserta.destroy({
        //   where:{id}
        // })
        // if (deleteAPL02) {
          let deleteAPL02 = await Apl02Dynamic.destroy({
            where:{id}
          })
          res.status(200).json('MUK berhasil dihapus')
        // }else {
        //   res.status(404).json("Data tidak ditemukan")
        // }
    
      }else {
        res.status(401).json('Anda Tidak memiliki Akses')
      }
    }catch(error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message
      })
    }
  }

  static async postMUK(req, res) {
    try {
      let adminIsLogin = req.userLogin.role.toLowerCase()
      console.log(fileMUK)
      if(adminIsLogin === 'asesor') {
        const uploadedFile = req.file;

        // Simpan metadata file di database
        await fileMUK.create({
          fileName: uploadedFile.originalname,
          path: uploadedFile.path,
          mimeType: uploadedFile.mimetype,
          asesorId:req.userLogin.id,
          namaSkema: req.body.namaSkema, // Nama skema ujian
        });
        console.log(req.body)
        res.json({
          message: 'File berhasil diunggah',
          file: uploadedFile,
        });
      }else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
     
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }

  static async getFileMUK(req, res) {
    try {

      let adminIsLogin = req.userLogin.role.toLowerCase()

      if (adminIsLogin === 'asesor') {
        const fileId = req.params.id;  // ID file dari URL
        const file = await fileMUK.findOne({ where: { id: fileId } });
  
        if (!file) {
          return res.status(404).json({ message: 'File tidak ditemukan' });
        }
  
        res.json({
          message: 'File ditemukan',
          file: file,
        });
      }else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
      
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }

  static async getAllFileMUK(req, res) {
    try {
      const {namaSkema} = req.params
      
      let adminIsLogin = req.userLogin.role.toLowerCase()

      if (adminIsLogin ==='asesor') {
        const file = await fileMUK.findAll({ where: { namaSkema: namaSkema} });
        if (!file) {
          return res.status(404).json({ message: 'File tidak ditemukan' });
        }
  
        res.json({
          message: 'File ditemukan',
          file: file,
        });
      }else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
      
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }

  static async updateFileMUK(req, res) {
    try {
      const fileId = req.params.id;  // ID file dari URL

      let adminIsLogin = req.userLogin.role.toLowerCase()
      if (adminIsLogin === 'asesor') {
        const uploadedFile = req.file;
  
        // Cari file lama
        const oldFile = await fileMUK.findOne({ where: { id: fileId } });
    
        if (!oldFile) {
          return res.status(404).json({ message: 'File tidak ditemukan' });
        }
    
        // Hapus file lama dari sistem berkas (pastikan file path benar)
        fs.unlinkSync(oldFile.path);
    
        // Update metadata di database dengan file baru
        await oldFile.update({
          fileName: uploadedFile.originalname,
          path: uploadedFile.path,
          mimeType: uploadedFile.mimetype,
          namaSkema: req.body.namaSkema,
          asesorId: req.userLogin.id
        });
    
        res.json({
          message: 'File berhasil diperbarui',
          file: uploadedFile,
        });
      }else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
      
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }

  static async deleteFileMUK(req, res) {
    try {
      const fileId = req.params.id;  // ID file dari URL
      let adminIsLogin = req.userLogin.role.toLowerCase()
      if (adminIsLogin === 'asesor') {
        const file = await fileMUK.findOne({ where: { id: fileId } });
  
        if (!file) {
          return res.status(404).json({ message: 'File tidak ditemukan' });
        }
        // Hapus file dari sistem berkas
        fs.unlinkSync(file.path);
    
        // Hapus metadata file dari database
        await file.destroy();
    
        res.json({
          message: 'File berhasil dihapus',
        });
      }else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }

    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }

  static async downloadFileMUK (req,res) {
    try {
      const { dokumen } = req.params;
      const isAllowed = req.userLogin.role.toLowerCase()
      const namaSkema = req.body.namaSkema
      if (!dokumen) {
        return res.status(400).json({
          message: 'Parameter dokumenKe harus diisi dengan nilai 1-24.',
        });
      } 
      
      const file = await fileMUK.findOne({ where: {namaSkema, fileName:dokumen } });
      if (!isAllowed || isAllowed !== 'asesor' ) {
        return res.status(404).json({ message: 'Anda Tidak Memiliki Akses.' });
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
    }catch(error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }

  static async downloadFileAsesi (req,res) {
    try {
      const { dokumen } = req.params;
      const isAllowed = req.userLogin.role.toLowerCase()
      const {namaSkema, namaPeserta }= req.body
      
      if (!dokumen) {
        return res.status(400).json({
          message: 'Parameter dokumenKe harus diisi dengan nilai 1-24.',
        });
      } 
      const fileAsesi = await PesertaUjikom.findOne ({where: {namaPeserta}})
      if (!isAllowed || isAllowed !== 'asesor' ) {
        return res.status(404).json({ message: 'Anda Tidak Memiliki Akses.' });
      }
     
      const filePath = fileAsesi[dokumen];

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
    }catch(error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }

}

