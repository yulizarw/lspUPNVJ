const {User, umpanBalikRouter} = require('../models')
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = class umpanBalikController{
  // home
  static async home (req,res){
    console.log('controller')
    // try{
    //   res.status(200).json({
    //     home:'ini halama home'
    //   })
    // }catch(error){
    //   res.status(500).json(error)
    // }
  }
  
}