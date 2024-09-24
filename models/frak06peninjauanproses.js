'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FrAk06PeninjauanProses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FrAk06PeninjauanProses.belongsTo(models.Asesor,{
        foreignKey:'asesorId'
      })
      FrAk06PeninjauanProses.belongsTo(models.SkemaUjikom,{
        foreignKey:'skemaUjikomId'
      })
    }
  }
  FrAk06PeninjauanProses.init({
    namaSkema: DataTypes.STRING,
    tuk: DataTypes.STRING,
    namaAsesor: DataTypes.STRING,
    tanggalPelaksanaan: DataTypes.STRING,
    rencanaAsesmen: DataTypes.STRING,
    persiapanAsesmen: DataTypes.STRING,
    implementasiAsesmen: DataTypes.STRING,
    keputusanAsesmen: DataTypes.STRING,
    umpanBalikAsesmen: DataTypes.STRING,
    rekomendasiPeningkatan: DataTypes.STRING,
    konsistensiKeputusanAsesmen: DataTypes.STRING,
    namaPeninjau: DataTypes.STRING,
    tangalPeninjauan: DataTypes.DATE,
    komentar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FrAk06PeninjauanProses',
  });
  return FrAk06PeninjauanProses;
};