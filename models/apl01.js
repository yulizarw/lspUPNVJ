'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apl01 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Apl01.belongsTo(models.PesertaUjikom,{
        foreignKey:'pesertaUjikomId'
      })
    }
  }
  Apl01.init({
    nik: DataTypes.STRING,
    namaLengkap: DataTypes.STRING,
    jenisKelamin: DataTypes.STRING,
    tempatLahir: DataTypes.STRING,
    tanggalLahir: DataTypes.DATE,
    alamatDomisili: DataTypes.STRING,
    provinsi: DataTypes.STRING,
    kota: DataTypes.STRING,
    kecamatan: DataTypes.STRING,
    noTelp: DataTypes.DOUBLE,
    email: DataTypes.STRING,
    pendidikanTerakhir: DataTypes.STRING,
    namaSekolahPT: DataTypes.STRING,
    jurusanProdi: DataTypes.STRING,
    pekerjaan: DataTypes.STRING,
    namaPerusahaan: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    alamatPerusahaan: DataTypes.STRING,
    telpPerusahaan: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Apl01',
  });
  return Apl01;
};