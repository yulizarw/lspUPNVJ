'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PesertaUjikom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // pesertaujikom hasone buktiportfolio
      PesertaUjikom.hasOne(models.BandingUjikom,{
        foreignKey:'pesertaUjikomId'
      })
      PesertaUjikom.hasMany(models.JadwalUjikom, {
        foreignKey:'pesertaUjikomId'
      })
      PesertaUjikom.hasMany(models.RekamanAsesmen,{
        foreignKey:'pesertaUjikomId'
      })
      PesertaUjikom.hasMany(models.SkemaUjikom,{
        foreignKey:'pesertaUjikomId'
      })
      PesertaUjikom.belongsTo(models.User, {
        foreignKey:{
          name:'userId'
        }
      })
      PesertaUjikom.hasOne(models.Apl02Base, {
        foreignKey:'pesertaUjikomId'
      })
      PesertaUjikom.hasOne(models.Apl01, {
        foreignKey:'pesertaUjikomId'
      })
      PesertaUjikom.hasOne(models.UmpanBalik, {
        foreignKey:'pesertaUjikomId'
      })
      PesertaUjikom.hasOne(models.BuktiPortfolio,{
        foreignKey:'pesertaUjikomId'
      })
      PesertaUjikom.hasOne(models.FrAk01,{
        foreignKey:'pesertaUjikomId'
      })
      // bukti porto, umpanbalik dan punya satu frak01
    }
  }
  PesertaUjikom.init({
    namaPeserta: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Nama Peserta Harus Terisi'
        }
      }
    },
    lat:{
      type:DataTypes.DOUBLE,
      validate:{
        notEmpty:{
          msg:'koordinate latittude harus terisi'
        }
      }
    },
    long:{
      type:DataTypes.DOUBLE,
      validate:{
        notEmpty:{
          msg:'koordinate longitude harus terisi'
        }
      }
    },
    apl01: 
    {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'APL 01 Harus Terisi'
        }
      }
    },
    apl02: 
    {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'APL 02 Harus Terisi'
        }
      }
    },
    frAK01: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'FRAK 01 Harus Terisi'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'PesertaUjikom',
  });
  return PesertaUjikom;
};