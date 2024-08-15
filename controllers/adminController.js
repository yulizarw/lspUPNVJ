const {Admin, Product, Order, User, Farmer} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


module.exports = class adminController {
  static async postNews (req,res) {
    try{

    }
    catch(error){
      
    }
  }1
  // static async register(req,res) {
  //   try{
  //     let params = {
  //       name: req.body.name,
  //       userName:req.body.userName,
  //       email:req.body.email,
  //       password:req.body.password,
  //       address:req.body.address,
  //       phone:+req.body.phone,
  //       role:'Admin',
  //       province:req.body.province,
  //       city:req.body.city,
  //     }
  //     let registerAdmin = await Admin.create(params)

  //     let access_token = jwt.sign({id:registerAdmin.id, email:registerAdmin.email, role:registerAdmin.role, userName:registerAdmin.userName}, process.env.SECRET)
  //     res.status(201).json({access_token,userName:registerAdmin.userName, id:registerAdmin.id, email:registerAdmin.email, role:registerAdmin.role})
  //   }
  //   catch(error){
  //     res.status(500).json(error)
  //   }
  // }

  // static async login(req,res){
  //   try{
  //     let params = {
  //       userName: req.body.userName,
  //       password: req.body.password
  //     }
  //     let loginAdmin = await Admin.findOne({where:{userName:params.userName}})
  //     if(loginAdmin && bcrypt.compareSync(params.password,loginAdmin.password)){
  //       let access_token = jwt.sign({id:loginAdmin.id, email:loginAdmin.email, role:loginAdmin.role, userName:loginAdmin.userName}, process.env.SECRET)
  //       res.status(200).json({access_token,userName:loginAdmin.userName, id:loginAdmin.id, email:loginAdmin.email, role:loginAdmin.role, province:loginAdmin.province, city:loginAdmin.city})
  //     }else{
  //       res.status(400).json('Password / Username are incorrect')
  //     }
  //   }
  //   catch(error){
  //     res.status(500).json('Password / Username are incorrect')
  //   }
  // }

  // static async listProduct(req,res) {
  //   try {
  //     let product = await Product.findAll({order:[['price','DESC']]})
   
  //     if(product){
  //       if(product.length > 0) {
  //         res.status(200).json(product)
  //       }else {
  //         res.status(400).json('No Product at the moment')
  //       }
  //     }
  //   }catch (error) {
  //     res.status(500).json('Product Cannot Found')
  //   }
  // }

  // static async addProduct (req,res){
  //   try{
  //     let adminIsLogIn = req.userLogin.id

  //     if(adminIsLogIn){
  //       let params = {
  //         name: req.body.name,
  //         category: req.body.category,
  //         quantity: +req.body.quantity,
  //         price: +req.body.price,
  //         adminId: adminIsLogIn,
  //         image: req.body.image
  //       }
  //       let createProduct = await Product.create(params)
  //       res.status(201).json(createProduct)
  //     }else{
  //       res.status(401).json('Unauthorized')
  //     }
  //   }catch(error){
  //     res.status(500).json(error)
  //   }
  // }

  // static async deleteProduct(req,res){
  //   try{
  //     let {id} = req.params
  //     let LogInadminId = req.userLogin.id
  //     let findProduct = await Product.findOne({where:{id}})

  //     if(findProduct.adminId === LogInadminId){
  //       let deleteProduct = await Product.destroy({where:{id}})

  //       if(deleteProduct){
  //         res.status(200).json(`Product ID ${id} Has Been Deleted`)
  //       }else{
  //         res.status(400).json('Product Not Found')
  //       }
  //     }else {
  //       res.status(401).json('Unauthorized Access')
  //     }
  //   }catch(error){
  //     res.status(500).json('Internal Server Error')
  //   }
  // }

  // static async editProduct(req,res){
  //   try{
  //     let adminLoginId = req.userLogin.id
  //     let {id} = req.params

  //     let filterProduct = await Product.findOne({where:{id}})
  //     if(filterProduct.adminId === adminLoginId){
  //       let params = {
  //         name: req.body.name,
  //         category: req.body.category,
  //         quantity: +req.body.quantity,
  //         price: +req.body.price,
  //         adminId: adminLoginId,
  //         image:req.body.image
  //       }
  //       let editProduct = await Product.update(params,{where:{id},returning:true})
  //       if(editProduct[0] == 0){
  //         res.status(400).json('Product Not Found')
  //       }else if(!params){
  //         res.status(400).json('Please Fill the product detail')
  //       }else{
  //         res.status(200).json(`Product with id ${id} has been updated`)
  //       }
  //     }else{
  //       res.status(401).json('Unauthorized Access')
  //     }
  //   }catch(error){
  //     res.status(500).json('Edit Product Failed')
  //   }
  // }

  // static async getAllOrders(req,res) {
  //   try{
  //     let showOrder = await Order.findAll({order:[['totalPrice','DESC']],
  //     include:[{model: Product, include:Admin}, {model:Farmer}],
  //    attributes:['id', 'address','totalPrice', 'quantityProduct', 'courierName', 'status', 'transferName', 'transferImage', 'origin', 'destination', 'weight' ,'bank', 'shippingCost', 'FarmerId', 'ProductId']
  //   })
  //     res.status(200).json(showOrder)
  //   }catch(error){
  //     console.log(error)
  //     res.status(500).json(error)
  //   }
  // }
  // static async deleteOrder(req,res){
  //   try{
  //     let adminLogIn = req.userLogin.id
  //     let {id} = req.params

  //     let filterOrder = await Order.findOne({where:{id}})
  //     console.log(filterOrder.status)
  //     if (!filterOrder){
  //       res.status(400).json('Product not found')
  //     }else if (filterOrder){
  //       let orderDelete = await Order.destroy({where:{id}})
  //       res.status(200).json(`Order No ${id} Has Been Deleted`)
  //     }else{
  //       res.status(401).json('Order Cannot Deleted')
  //     }
  //   }catch(error){
  //     res.status(500).json(error)
  //   }
  // }
  // static async editOrder (req,res){
  //   try{
  //     let adminIsLogin = req.userLogin
  //     if (adminIsLogin.role==='Admin'){
  //       let {id} = req.params
  //       let filterOrder = await Order.findOne({where:{id}})
  //       console.log(filterOrder)
  //       if(filterOrder){
  //         let params ={
  //           status : req.body.status
  //         }
  //         let updateOrder = await Order.update(params,{where:{id}})
  //         res.status(200).json(`Order ${id} has been updated`)
  //       }else{
  //         res.status(400).json('Order Not Found')
  //       }
  //     }else{
  //       res.status(401).json('Unauthorize access')
  //     }
  //   }catch(error){
  //     res.status(500).json(error)
  //   }
  // }

  // static async getDetailProduct (req,res){
  //   try {
  //     let {id} = req.params
  //     let filterProduct = await Product.findOne({where:{id}})
  //     if(filterProduct){
  //       res.status(200).json(filterProduct)
  //     }else{
  //       res.status(404).json('Cannot Find Product')
  //     }
  //   }catch(error){
  //     res.status(500).json(error)
  //   }
  // }

  // static async getDetailOrder (req,res) {
  //   try {
  //     let {id} = req.params
  //     let filterOrder = await Order.findOne({where:{id}, attributes:['id', 'totalPrice', 'quantityProduct', 'courierName', 'status', 'transferName', 'transferImage', 'origin', 'destination', 'weight' ,'bank', 'shippingCost', 'FarmerId', 'ProductId']})
  //     if(filterOrder){
  //       res.status(200).json(filterOrder)
  //     }else{
  //       res.status(404).json('Wrong Authentication for Searching Order')
  //     }
  //   }catch(error){
  //     res.status(500).json(error)
  //   }
  // }
}
