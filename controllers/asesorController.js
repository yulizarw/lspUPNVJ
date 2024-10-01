const {User, Asesor, JadwalUjikom, Apl02Base, Apl02Dynamic} = require('../models')
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



module.exports = class asesorController{
  // asesor only

  // Buat profil asesor
  static async updateProfil (req,res){
    try{
      let userisLogin = req.userLogin
      let asesorIsLogin = userisLogin.role.toLowerCase()
      console.log(userisLogin)
      if (asesorIsLogin =='asesor'){
        let params = {
          namaAsesor:req.body.namaAsesor,
          noRegMET: req.body.noRegMET,
          tahunAkhirRegMET: req.body.tahunAkhirRegMET,
          jumlahMelaksanakanUjikom:'0',
          kumulatifMelakukanUjikom:'0',
          userId:userisLogin.id
        }

        let findAsesorData = await Asesor.findOne({
          where:{namaAsesor:req.body.namaAsesor}
        })

        if (findAsesorData) {
          res.status(401).json('Data Asesor Sudah Tersedia')
        }else {
          let postProfilAsesor = await Asesor.create(params)
          if (postProfilAsesor){
            res.status(201).json(`Profil ${params.namaAsesor} berhasil dibuat`)
          }else{
            res.status(401).json('Terjadi Kesalahan pada Sistem Kami')
          }
        }
        
      } else{
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
    }catch(error){
      res.status(500).json({
        message:'Internal Server Error',
        error: error.message
      })
    }
  }

  // ubah profil data diri
  static async ubahProfil (req,res){
    try{
      let userisLogin = req.userLogin
      let id = userisLogin.id
      console.log(id,'<<<<')
      let {namaAsesor, noRegMET, tahunAkhirRegMET, jumlahMelaksanakanUjikom,kumulatifMelakukanUjikom} = req.body
      let findDataAsesor= await Asesor.findOne({
        where:{userId:id}
      })
      console.log(findDataAsesor)
      if(userisLogin.role.toLowerCase()==='asesor' && findDataAsesor){
        
        if (namaAsesor) findDataAsesor.namaAsesor = namaAsesor
        if (noRegMET) findDataAsesor.noRegMET = noRegMET
        if (tahunAkhirRegMET) findDataAsesor.tahunAkhirRegMET = tahunAkhirRegMET
        if (jumlahMelaksanakanUjikom) findDataAsesor.jumlahMelaksanakanUjikom = jumlahMelaksanakanUjikom
        if (kumulatifMelakukanUjikom) findDataAsesor.kumulatifMelakukanUjikom= kumulatifMelakukanUjikom
        
        let saveUpdate = await findDataAsesor.save()
        
        if(saveUpdate){
          res.status(201).json(`Data Pribadi ${findDataAsesor.namaAsesor} berhasil di update`)
        }else{  
          res.status(401).json('Tidak dapat melakukan update')
        }
        
      }else{
        res.status(401).json('Anda Tidak Memiliki Akses')
      }

    }catch(error){
      res.status(500).json({
        message:'Internal Server Error',
        error: error.message
      })
    }
  }
  //  tambah MUK
  static async addMUK(req,res){
    try {
      let userisLogin = req.userLogin
      let asesorisLogin = false
      let id = userisLogin.id
      let idAsesor = await Asesor.findOne({where:{userId:id}})
      
      if (userisLogin.role.toLowerCase() ==='asesor' ) {
        asesorisLogin = true
        
        if (asesorisLogin == true){
          let {namaSkema, dynamicFields}= req.body

          let base = await Apl02Base.create({namaSkema,asesorId:idAsesor.id});
  
          let dynamicEntries = dynamicFields.map(field => ({
            unitKompetensiId: field.unitKompetensiId,
            fieldQuestion: field.fieldQuestion,
            fieldName: field.fieldName,
            fieldValue: field.fieldValue,
            baseId: base.id,
          }));
          await Apl02Dynamic.bulkCreate(dynamicEntries);
          res.status(201).send('MUK berhasil dibuat');
        } else {
          res.status(401).json('Mohon Maaf Anda Harus Login Terlebih Dahulu')
        }
      }else {
        res.status(401).json('Anda Tidak Memiliki Akses')
      }
    }catch(error){
      res.status(500).json({
        message:'Internal Server Error',
        error: error.message
      })
    }
   
  }

  // patch muk
  static async updateMUK (req,res){
    try{
      let asesorIsLogin = req.userLogin.role.toLowerCase()
      let {id} = req.params
      let {fieldName, fieldQuestion, fieldValue} = req.body

      if (asesorIsLogin){
        let detailedMUK = await Apl02Dynamic.findOne({
          where:{unitKompetensiId:id}
        })
        console.log(detailedMUK)
        if (fieldName) detailedMUK.fieldName = fieldName
        if (fieldQuestion) detailedMUK.fieldQuestion = fieldQuestion
        if (fieldValue) detailedMUK.fieldValue = fieldValue
        let saveUpdate = await detailedMUK.save()
        console.log(saveUpdate)
        if(saveUpdate){
          res.status(201).json(`Unit Kompetensi ke ${detailedMUK.unitKompetensiId} berhasil di update`)
        }else{  
          res.status(401).json('Tidak dapat melakukan update')
        }

      }else{
        res.status(401).json('Anda Tidak Memiliki Akses')
      }

    }catch(error){
      res.status(500).json({
        message:'Internal Server Error',
        error:error.message
      })
    }
  }



}

 