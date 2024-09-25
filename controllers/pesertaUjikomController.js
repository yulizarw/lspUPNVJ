const { User, PesertaUjikom, JadwalUjikom} = require('../models')
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class pesertaUjikomController {
  // home
  static async home(req, res) {
    console.log('controller')
    try {
      res.status(200).json({
        home: 'ini halama home'
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // // get MUK
  // static async pesertaGetMUK(req, res) {
  //   try {
  //     const { mukId } = req.params;
  //     const fields = await Apl2Dynamic.findAll({ where: { mukId } });
  //     res.json(fields);

  //   } catch (error){

  //   }
  // }

  // static async pesertaPostApl01(req, res) {
  //   try {
  //     const { applicantName, dynamicFields } = req.body;

  //     const base = await Apl02Base.create({ applicantName });

  //     const dynamicEntries = dynamicFields.map(field => ({
  //       mukId: field.mukId,
  //       fieldName: field.fieldName,
  //       fieldValue: field.fieldValue,
  //       baseId: base.id
  //     }));
  //     }catch(error) {

  //     }
  //   }

    // `peserta melakukan input data dan memulai proses pendaftaran`
  static async inputDataPeserta(req,res){
    try{
      let userIsLogin = req.userLogin
     
      if(userIsLogin.role.toLowerCase()==='peserta ujikom'){
        let findPeserta = await User.findOne({
          where:{id:userIsLogin.id}
        })
        if (findPeserta){
          let params ={
            namaPeserta:req.body.namaPeserta,
            lat: req.body.lat,
            long:req.body.long,
            apl01:'Pending',
            apl02:'Pending',
            frAK01:'Pending',
            userId: findPeserta.id
            
          }
          let findPesertaData = await PesertaUjikom.findOne({
            where:{namaPeserta:req.body.namaPeserta}
          })
          if (findPesertaData){
            res.status(401).json('Data Peserta Sudah Tersedia')
          }else{
            let postPendaftaran = await PesertaUjikom.create(params)
            if(postPendaftaran){
              res.status(201).json(`Pendataan Peserta ${params.namaPeserta} Berhasil `)
            }else{
              res.status(400).json('Pendataan Peserta Tidak Berhasil')
            }
          }
          
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
  // melihat data pribadi
  static async listDataPribadi (req,res){
    try{
      let {id} = req.params
      let userIsLogin = req.userLogin
      
      if(userIsLogin.role.toLowerCase()==='peserta ujikom'){
        let findDataPeserta = await PesertaUjikom.findOne({
          where:{userId:id}
        })
        res.status(200).json(findDataPeserta)
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
  // edit data pribadi peserta
  static async editDataPribadi (req,res){
    try{
      let userIsLogin = req.userLogin
      let id = userIsLogin.id
      let {namaPeserta, lat, long, apl01,apl02,frAK01} = req.body
      let findDataPeserta = await PesertaUjikom.findOne({
        where:{userId:id}
      })

      if(userIsLogin.role.toLowerCase()==='peserta ujikom' && findDataPeserta){
        
        if (namaPeserta) findDataPeserta.namaPeserta = namaPeserta
        if (lat) findDataPeserta.lat = lat
        if (long) findDataPeserta.long = long
        if (apl01) findDataPeserta.apl01 = apl01
        if (apl02) findDataPeserta.apl02 = apl02
        if (frAK01) findDataPeserta.frAK01 = frAK01
        let saveUpdate = await findDataPeserta.save()
        
        if(saveUpdate){
          res.status(201).json(`Data Pribadi ${findDataPeserta.namaPeserta} berhasil di update`)
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
  // delete data pribadi perserta
  static async deleteDataPribadi (req,res){
    try{
      
      let userIsLogin = req.userLogin
      let id = userIsLogin.id
      let findDataPeserta = await PesertaUjikom.findOne({
        where:{userId:id}
      })
      if(userIsLogin.role.toLowerCase()==='peserta ujikom' && findDataPeserta){
        let hapusData = await findDataPeserta.destroy()
        if (hapusData){
          res.status(201).json(`Data Pribadi ${findDataPeserta.namaPeserta} berhasil dihapus`)
        }else{
          res.status(401).json('Data Tidak dapat Dihapus, silahkan hubungi Admin untuk melakukan ini')
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
  // jadwal ujikom peserta
  static async jadwalUjikomPeserta (req, res){
    try{
      
      let userIsLogin = req.userLogin
      let id = userIsLogin.id
      if(userIsLogin.role.toLowerCase()==='peserta ujikom'){
        let findSchedule = await JadwalUjikom.findOne({
          where:{pesertaUjikomId:id}
        })

        let findDataPeserta = await PesertaUjikom.findOne({
          where:{userId:id}
        }) 
        if (findSchedule && findDataPeserta){
          res.status(200).json(findSchedule)
        }if (!findSchedule){
          res.status(401).json('Anda Belum Mendaftar Pada Suatu Skema Ujikom, silahkan mendaftarkan diri dahulu')
        }else{
          res.status(401).json('Anda Belum Memiliki Jadwal Ujikom, harap mendaftar ke Skema atau silahkan tunggu admin untuk melakukan Plotting')
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
  // news lsp
  // about LSP UPN VJ
  // reviewer LSP UPNVJ
  // pemetaan anak didik LSP UPNVJ
}