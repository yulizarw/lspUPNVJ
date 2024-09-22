const {User, rekamanAsesmens, pesertaUjikom, News, skemaUjikom} = require('../models')
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class homeController {
  // home
  static async home (req,res){
    try{
      res.status(200).json('home ini halaman home')
    }catch(error){
      res.status(500).json(error)
    }
  }
  // news lsp
  static async newsList(req,res){
    try{
      let berita = await News.findAll({
        order:[['createdAt','DESC']]
      })
      berita.length != 0 ? res.status(201).json(berita): res.status(404).json('Belum ada berita yang ditambahkan')
    }catch(error){
      res.status(500).json(error)
    }
  }
  // list skema tanpa login
  static async skemaBerita(req,res){
    try{
      let skemaList = await skemaUjikom.findAll()
      console.log('skemaList')
      // skemaList.length != 0 ? res.status(201).json(skemaList): res.status(404).json('Belum ada skema uji kompetensi yang ditambahkan')
    }catch(error){
      res.status(500).json(error)
    }
  }

  static async pesertaLulusList(req,res){
    try{
      let mahasiswaList = await User.findAll({
        where:{
          userRole:'Mahasiswa'
        }
      })
      mahasiswaList.length != 0 ? res.status(201).json(mahasiswaList): res.status(404).json('Belum ada peserta uji kompetensi yang mengikuti Uji Kompetensi')
    }catch(error){
      res.status(500).json(error)
    }
  }
  // about LSP UPN VJ
  // reviewer LSP UPNVJ
  static async listAsesor (req,res){
    try{
      let asesorList = await User.findAll({
        where:{
          userRole:'Asesor' 
        }
      })
      asesorList.length != 0 ? res.status(201).json(asesorList): res.status(404).json('Belum ada asesor yang terdaftar dalam LSP UPN Veteran Jakarta')
    }catch(error){
      res.status(500).json(error)
    }
  }
  // pemetaan anak didik LSP UPNVJ
  

  static async testUmpan (req,res){
    try{
      let rekamanList = await rekamanAsesmens.findOne({where:'id'})
      console.log(rekamanList)
    }catch(error){
      res.status(500).json(error)
    }
  }
}