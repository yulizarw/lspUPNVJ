const {User, JadwalUjikom, Apl02Base, Apl02Dynamic} = require('../models')
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class userController {
  // register
  // if role = asesor maka sptAsesor harus ada

  // jika lupa password admin harus bisa recovery password untuk semua user
  // kerjakan yang user controller dlu
  static async registerUser (req,res){
    try{
      let params = {
        userRole :req.body.userRole,
        userName :req.body.userName,
        userEmail:req.body.userEmail,
        userPassword:req.body.userPassword,
        userPhoto:req.body.userPhoto,
        userDepartment:req.body.userDepartment,
        userPhone:+req.body.userPhone,
        userBirthdate:new Date(req.body.userBirthdate),
        userDomisili:req.body.userDomisili,
        sptAsesor:req.body.sptAsesor
      }
      let allowedRoles = ['Admin', 'Asesor', 'Peserta Ujikom']
      if(allowedRoles.includes(req.body.userRole)){
        let registerUser = await User.create(params)
        let access_token = jwt.sign({email:registerUser.userEmail, userName:registerUser.userName, role:registerUser.userRole, password:registerUser.userPassword, photo:registerUser.userPhoto, department:registerUser.userDepartment, phone:registerUser.userPhone, domisili:registerUser.userDomisili},process.env.SECRET)
        res.status(201).json({
        access_token, email:registerUser.userEmail, userName:registerUser.userName, role:registerUser.userRole, password:registerUser.userPassword, photo:registerUser.userPhoto, department:registerUser.userDepartment, phone:registerUser.userPhone, domisili:registerUser.userDomisili
      })
      }else {
        res.status(400).json('Bad Request')
      }
    }catch(error){
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
        where: { userName: params.userName},
      });
  
      if (
        loginUser &&
        bcrypt.compareSync(params.password, loginUser.userPassword)
      ) {
        let access_token = jwt.sign(
          {
            id:loginUser.id,
            email:loginUser.userEmail, 
            userName:loginUser.userName, 
            role:loginUser.userRole, 
            password:loginUser.userPassword, 
            photo:loginUser.userPhoto, 
            department:loginUser.userDepartment, 
            phone:loginUser.userPhone, 
            domisili:loginUser.userDomisili
          },
          process.env.SECRET
        );
        let allowedRoles = ['Admin', 'Asesor', 'Peserta Ujikom']

        let matchedRoles = allowedRoles.map(role=> role === req.body.role? req.body.role:null).filter(role => role)
       
        if(matchedRoles.length > 0 && matchedRoles[0] === loginUser.userRole){
          res.status(201).json({
            id:loginUser.id,
            access_token,
            userName:loginUser.userName, 
            role:loginUser.userRole, 
            password:loginUser.userPassword, 
            photo:loginUser.userPhoto, 
            department:loginUser.userDepartment, 
            phone:loginUser.userPhone, 
            domisili:loginUser.userDomisili
          });
        }else{
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

        if (allJadwalUji.length !== 0){
          res.status(200).json(allJadwalUji)
        }else {
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
  static async allMUK(req,res){
    try {
      let userIsLogin = req.userLogin
      
      if (userIsLogin) {
        let listMUK = await Apl02Base.findAll()
        res.status(200).json(listMUK)
      } else{

        res.status(401).json('Anda Tidak Memiliki Akses')

      }
    }catch(error){
      res.status(500).json({
        message:'Internal Server Error',
        error:error.message
      })
    }
  }
  // detail MUK on specific MUK id
  static async detailMUK(req,res){
    try{
      let userIsLogin = req.userLogin
      let {id} = req.params
   
      if(userIsLogin){
        let detailedMUK = await Apl02Dynamic.findOne({
          where:{baseId:id}
        })
        res.status(200).json(detailedMUK)
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
  static async detailAllMUK(req,res){
    try{
      let userIsLogin = req.userLogin
      let asesorisLogin = false
      let {id} = req.params
   
      if(userIsLogin){
        asesorisLogin = true
        let detailedMUK = await Apl02Dynamic.findAll({
          where:{baseId:id}
        })
        res.status(200).json(detailedMUK)
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

  // asesor only
  //  tambah MUK
  static async addMUK(req,res){
    try {
      let userisLogin = req.userLogin
      let asesorisLogin = false
      if (userisLogin.role.toLowerCase() ==='asesor' ) {
        asesorisLogin = true
        if (asesorisLogin == true){
          let {namaSkema, dynamicFields}= req.body
          let base = await Apl02Base.create({ namaSkema});
  
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
  
  // news lsp
  // about LSP UPN VJ
  // reviewer LSP UPNVJ
  
  // pemetaan anak didik LSP UPNVJ
}