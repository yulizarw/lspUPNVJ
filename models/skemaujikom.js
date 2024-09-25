'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SkemaUjikom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // SkemaUjikom.belongsToMany(JadwalUjikom, {
      //   through: models.JadwalSkemaUjikom,
      //   foreignKey: 'skemaUjikomId',
      //   // as: 'jadwalUjikoms'  // Skema bisa diikuti di banyak jadwal
      // });
    
      SkemaUjikom.hasOne(models.Tuk,{
        foreignKey:'skemaUjikomId'
      })
      SkemaUjikom.belongsTo(models.User, {
        foreignKey:'userId'
      })
      SkemaUjikom.hasOne(models.FrAk01,{
        foreignKey:'skemaUjikomId'
      })
      SkemaUjikom.belongsTo(models.Asesor,{
        foreignKey:'asesorId'
      })
      SkemaUjikom.hasMany(models.FrAk05LaporanAsesmen,{
        foreignKey:'skemaUjikomId'
      })
      SkemaUjikom.hasMany(models.FrAk06PeninjauanProses,{
        foreignKey:'skemaUjikomId'
      })
    }
  }
  SkemaUjikom.init({
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
    modelName: 'SkemaUjikom',
  });
  return SkemaUjikom;
};