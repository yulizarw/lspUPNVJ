const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {SkemaUjikom, PesertaUjikom} = require ('../models')
// Konfigurasi Multer untuk menyimpan file di direktori spesifik
// Storage multer untuk menyimpan file
const storageFileAsesi= multer.diskStorage({
    destination: async (req, file, cb) => {
        try {
            const userId = req.userLogin.id
          
            if ( !userId) {
                return cb(new Error('Parameter namaSkema dan namaPeserta wajib diisi.'));
            }

            // Validasi peserta ujian
            const peserta = await PesertaUjikom.findOne({ where: { userId } , include :[{model:SkemaUjikom}]});
            if (!peserta.SkemaUjikom.namaSkema) {
                return cb(new Error('Peserta dengan skema ini tidak ditemukan.'));
            }
           
            // Path folder tujuan
            const dir = path.join(
                process.env.HOME,
                `Desktop/Yulizar/Desktop/UPNVJ/lspUpnvj/File Drop/File Asesi/${peserta.SkemaUjikom.namaSkema.replace(/\s+/g, '_')}/${peserta.namaPeserta.replace(/\s+/g, '_')}`
            );

            // Buat folder jika belum ada
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            cb(null, dir); // Set folder tujuan
        } catch (error) {
            cb(error); // Lempar error jika ada masalah
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nama file unik
    },
});

const uploadFileAsesi = multer({ storage: storageFileAsesi });

const storageFileMUK = multer.diskStorage({
  destination: async (req, file, cb) => {
      try {
       
          // Cari skema ujian di database berdasarkan nama
          const schemaName = req.body.namaSkema; // Nama skema dikirim melalui request body
          const skema = await SkemaUjikom.findOne({ where: { namaSkema: schemaName } });
          if (!skema) {
              // Jika skema tidak ditemukan, lempar error
              return cb(new Error('Nama skema tidak valid. Pastikan skema ujian sudah terdaftar.'));
          }

          // Nama skema valid, buat folder jika belum ada
          const dir = path.join(
              process.env.HOME,
              `Desktop/Yulizar/Desktop/UPNVJ/lspUpnvj/File Drop/File MUK/${schemaName.replace(/\s+/g, '_')}`
          );

          if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true }); // Buat folder jika belum ada
          }

          cb(null, dir); // Set folder tujuan
      } catch (error) {
          cb(error); // Lempar error jika terjadi masalah
      }
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Nama file unik
  },
});
const uploadFileMuk = multer({ storage: storageFileMUK });
module.exports ={ uploadFileAsesi, uploadFileMuk}