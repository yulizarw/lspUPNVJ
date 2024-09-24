'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RekamanAsesmen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RekamanAsesmen.belongsTo(models.PesertaUjikom, {
        foreignKey:'pesertaUjikomId'
      })
      RekamanAsesmen.belongsToMany(models.BandingUjikom, {through:models.UmpanBalik,foreignKey:'rekamanAsesmenId', otherKey:'bandingUjikomId'})
      RekamanAsesmen.belongsTo(models.JadwalUjikom, {
        foreignKey:'jadwalUjikomId'
      })
      RekamanAsesmen.belongsTo(models.Asesor,{
        foreignKey:'asesorId'
      })
    }
  }
  RekamanAsesmen.init({
    statusUjikom: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Status harus terisi'
        }
      }
    },
    sertifikatUjikom: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
           msg:'Sertifikat Harus terisi'
        }
      }
    },
    skKomiteTeknis: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'SK Komite Teknik Harus Terisi'
        }
      }
    },
    skHasilUjikom: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'SK Hasil Ujikom harus Terisi'
        }
      }
    },
    frak06Peninjauan:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'FR AK 06 Harus Tersedia'
        }
      }
    },
    laporanUjikom:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Laporan Ujikom Pada periode ini harus Tersedia'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'RekamanAsesmen',
  });
  return RekamanAsesmen;
};