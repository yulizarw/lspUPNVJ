'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FrAk05LaporanAsesmen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FrAk05LaporanAsesmen.belongsTo(models.Asesor,{
        foreignKey:'asesorId'
      })
      FrAk05LaporanAsesmen.belongsTo(models.SkemaUjikom,{
        foreignKey:'skemaUjikomId'
      })
    }
  }
  FrAk05LaporanAsesmen.init({
    namaSkema: DataTypes.STRING,
    tuk: DataTypes.STRING,
    namaAsesor: DataTypes.STRING,
    tanggalPelaksanaan: DataTypes.STRING,
    namaPeserta: DataTypes.STRING,
    rekomendasiNilai: DataTypes.STRING,
    keteranganAsesmen: DataTypes.STRING,
    aspekPelaksanaan: DataTypes.STRING,
    catatanPenolakan: DataTypes.STRING,
    saranPerbaikan: DataTypes.STRING,
    tandaTanganAsesor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FrAk05LaporanAsesmen',
  });
  return FrAk05LaporanAsesmen;
};