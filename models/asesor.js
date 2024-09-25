'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asesor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Asesor.hasMany(models.SkemaUjikom,{
        foreignKey:'asesorId'
      })
      Asesor.hasMany(models.RekamanAsesmen,{
        foreignKey:'asesorId'
      })
      Asesor.hasMany(models.UmpanBalik,{
        foreignKey:'asesorId'
      })
      Asesor.hasMany(models.FrAk05LaporanAsesmen,{
        foreignKey:'asesorId'
      })
      Asesor.hasMany(models.FrAk06PeninjauanProses,{
        foreignKey:'asesorId'
      })
      // asesor punya FR.AK.05 – Laporan Asesmen, FR.AK.06 – Meninjau Proses Asesmen 
    }
  }
  Asesor.init({
    namaAsesor: DataTypes.STRING,
    noRegMET:DataTypes.STRING,
    tahunAkhirRegMET:DataTypes.DATE,
    jumlahMelaksanakanUjikom:DataTypes.INTEGER,
    kumulatifMelakukanUjikom:DataTypes.INTEGER,
    userId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Asesor',
  });
  return Asesor;
};