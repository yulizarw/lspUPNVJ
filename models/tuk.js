'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tuk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tuk.belongsTo(models.SkemaUjikom,{
        foreignKey:'skemaUjikomId'
      })
    }
  }
  Tuk.init({
    namaTUK:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Nama TUK harus sudah tersedia'
        }
      }
    },
    lokasiTUK:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Lokai TUK sudah harus ditentukan dan disetujui'
        }
      }
    },
    lat:{
      type: DataTypes.DOUBLE,
      validate:{
        notEmpty:{
          msg:'Koordinate latittude Lokasi sudah harus ditentukan'
        }
      }
    },
    long:{
      type: DataTypes.DOUBLE,
      validate:{
        notEmpty:{
          msg:'Koordinate longitude lokasi sudah harus ditentukan'
        }
      }
    },
    sptVerifikasiTUK:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'SPT Verifikasi TUK sudah harus tersedia'
        }
      }
    },
    rekamanVerifikasi: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Rekaman Verifikasi harus sudah tersedia'
        }
      }
    },
    skPenetapanTUK:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'SK Penetapan TUK harus sudah tersedia'
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'Tuk',
  });
  return Tuk;
};