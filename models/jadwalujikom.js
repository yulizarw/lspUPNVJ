'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JadwalUjikom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      JadwalUjikom.belongsTo(models.PesertaUjikom,{
        foreignKey:'pesertaUjikomId'
      })
      JadwalUjikom.hasMany(models.RekamanAsesmen, {
        foreignKey:'jadwalUjikomId'
      })
      JadwalUjikom.belongsTo(models.SkemaUjikom,{
        foreignKey:'skemaUjikomId'
      })
    }
  }
  JadwalUjikom.init({
    tanggalWaktu: 
    {
      type:DataTypes.DATE,
      validate:{
        notEmpty:{
          msg:'Tanggal Harus diisi'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'JadwalUjikom',
  });
  return JadwalUjikom;
};