'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pesertaUjikom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pesertaUjikom.hasOne(models.bandingUjikom)
      pesertaUjikom.hasMany(models.jadwalUjikom)
      pesertaUjikom.hasMany(models.rekamanAsesmen)
      pesertaUjikom.hasMany(models.skemaUjikom)
      pesertaUjikom.belongsTo(models.User)
    }
  }
  pesertaUjikom.init({
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
    modelName: 'pesertaUjikom',
    freezeTableName: true
  });
  return pesertaUjikom;
};