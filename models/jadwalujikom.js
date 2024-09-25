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
      JadwalUjikom.hasMany(models.PesertaUjikom,{
        foreignKey:'jadwalUjikomId'
      })
      JadwalUjikom.hasMany(models.RekamanAsesmen, {
        foreignKey:'jadwalUjikomId'
      })
      // JadwalUjikom.belongsToMany(SkemaUjikom, {
      //   through: models.JadwalSkemaUjikom,
      //   foreignKey: 'jadwalUjikomId',
      //   // as: 'skemaUjikoms'  // Jadwal memiliki banyak skema
      // });
    
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