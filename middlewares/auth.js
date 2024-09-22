const {User, Admin} = require("../models")
const jwt = require('jsonwebtoken')
const config =require('../config/config')

const authentication = async (req, res, next) => {
  try {
      const { access_token } = req.headers;
      console.log(access_token)
      if (access_token) {
          req.userLogin = jwt.verify(access_token, process.env.SECRET);

          console.log(req.userLogin.role.toLowerCase(),'<<<<')
          if (req.userLogin.role.toLowerCase() === "admin") {
              await User.findByPk(req.userLogin.id)
                  .then((admin) => {
                      if (!admin) {
                          res.status(400).json("Wrong Auth");
                      }
                      next();
                  })
                  .catch((err) => {
                      res.status(500).json(err);
                  });
          } else if (req.userLogin.role.toLowerCase()=== "mahasiswa") {
              await User.findByPk(req.userLogin.id).then((mahasiswa) => {
                  if (!mahasiswa) {
                      res.status(400).json("Wrong Auth");
                  }
                  next();
              });
          } else if (req.userLogin.role.toLowerCase() === "asesor") {
              await User.findByPk(req.userLogin.id)
                  .then((Dikjar) => {
                      if (!Dikjar) {
                          res.status(400).json("Wrong Auth");
                      }
                      next()
                  })
          } else if (req.userLogin.role.toLowerCase() === "dosen pembimbing") {
              await dosenPembimbing.findByPk(req.userLogin.id)
                  .then((dospem) => {
                      if (!dospem) {
                          res.status(400).json("Wrong Auth");
                      }
                      next()
                  })
          } 
          // else if (req.userLogin.role === "Pembimbing Instansi") {
          //     await pembimbingInstansi.findByPk(req.userLogin.id)
          //         .then((instansiPembimbing) => {
          //             if (!instansiPembimbing) {
          //                 res.status(400).json("Wrong Auth")
          //             }
          //             next()
          //         })
          // } else if (req.userLogin.role === "Kaprodi") {
          //     await kaprodi.findByPk(req.userLogin.id)
          //         .then((ketuaProdi) => {
          //             if (!ketuaProdi) {
          //                 res.status(400).json("Wrong Auth")
          //             }
          //             next()
          //         })
          // }else if (req.userLogin.role === "Dekanat") {
          //     await Dekanat.findByPk(req.userLogin.id)
          //         .then((dekanat) => {
          //             if (!dekanat) {
          //                 res.status(400).json("Wrong Auth")
          //             }
          //             next()
          //         })
          //     }
      } else {
          // res.status(401).json("You are unauthorized to do this");
          console.log(access_token,'a')
          
      }
  } catch (error) {
      res.status(500).json(error)
      console.log(error)
  }
};

module.exports = { authentication };