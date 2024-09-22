const {User, JadwalUjikom, PesertaUjikom} = require('../models')
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class userController {
  // register
  // if role = asesor maka sptAsesor harus ada
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
      console.log(error)
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
        if(allowedRoles.includes(req.body.role)){
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
          res.status(401).json('Bad Request')
        } 
      } else {
        res.status(400).json("Password / Username are incorrect");
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  }

  // jadwal uji
  static async jadwalUji(req, res) {
    try {
      let userIsLogin = req.userLogin;
      console.log(userIsLogin);
  
      if (userIsLogin) {
        // let paraPeserta = await PesertaUjikom.findAll()

        // console.log(!paraPeserta)
        let allJadwalUji = await JadwalUjikom.findAll(); // Use singular form if the model is named 'jadwalUjikom'
        // console.log(allJadwalUji)
        // if (allJadwalUji){
        //   res.status(200).json(allJadwalUji)
        // }else {
        //   res.status(404).json('Belum Ada Jadwal Ujikom saat ini, cek kembali secara berkala')
        // }
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
  
  // news lsp
  // about LSP UPN VJ
  // reviewer LSP UPNVJ
  
  // pemetaan anak didik LSP UPNVJ
}