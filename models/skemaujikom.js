'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class skemaUjikom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      skemaUjikom.hasOne(models.jadwalUjikom)
      skemaUjikom.belongsTo(models.pesertaUjikom)
      skemaUjikom.hasOne(models.tuk)
      skemaUjikom.belongsTo(models.User)
    }
  }
  skemaUjikom.init({
    namaAsesor: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Nama Asesor harus ditentukan'
        }
      }
    },
    namaSkema: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Nama Skema harus ditentukan'
        }
      }
    },
    nomorSkema: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Nomor Skema harus sudah tersedia'
        }
      }
    },
    sektorSkema: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Sektor Skema harus ditentukan'
        }
      }
    },
    jenisSkema:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Jenis Skema harus sudah diketahui'
        }
      }
    }, 
    kodeUnitKompetensi:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Kode Unit Kompetensi harus sudah diketahui'
        }
      }
    },
    judulUnitKompetensi:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Judul Unit Kompetensi harus sudah diketahui'
        }
      }
    },
    instrumenSkema:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Instrumen Skema sudah harus tersedia'
        }
      }
    },
    peninjauanInstrumen:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Peninjauan Instrumen Uji Kompetensi sudah harus dilakukan'
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'skemaUjikom',
    freezeTableName: true
  });
  return skemaUjikom;
};