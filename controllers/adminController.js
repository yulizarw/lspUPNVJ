const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs');
const { fileMUK, SkemaUjikom } = require('../models')
// path untuk file upload
const { uploadFileAsesi, uploadFileMuk } = require('../middlewares/storage')

const multer = require('multer');
module.exports = class adminController {
  static async postMUK(req, res) {
    try {
      let adminIsLogin = req.userLogin.role.toLowerCase()
      console.log(fileMUK)
      if(adminIsLogin === 'admin') {
        const uploadedFile = req.file;

        // Simpan metadata file di database
        await fileMUK.create({
          fileName: uploadedFile.originalname,
          path: uploadedFile.path,
          mimeType: uploadedFile.mimetype,
          adminId:req.userLogin.id,
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

      if (adminIsLogin === 'admin') {
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
      const {namaSkema} = req.body

      let adminIsLogin = req.userLogin.role.toLowerCase()

      if (adminIsLogin ==='admin') {
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
      if (adminIsLogin === 'admin') {
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
          adminId: req.userLogin.id
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
      if (adminIsLogin === 'admin') {
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
 
}
