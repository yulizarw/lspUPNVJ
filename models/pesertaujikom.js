'use strict';
const {
  Model,
  BelongsToMany
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
      PesertaUjikom.belongsTo(models.JadwalUjikom, {
        foreignKey:'jadwalUjikomId'
      })
      PesertaUjikom.hasMany(models.RekamanAsesmen,{
        foreignKey:'pesertaUjikomId'
      })
    
      PesertaUjikom.belongsTo(models.User, {
        foreignKey:{
          name:'userId'
        }
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
      PesertaUjikom.belongsTo(models.SkemaUjikom,{
        foreignKey:'skemaUjikomId'
      })

     

      PesertaUjikom.belongsToMany(models.Apl02Dynamic,{
        through:models.Apl02DinaPeserta,
        foreignKey:'pesertaUjikomId',
        otherKey:'apl02DynamicId'
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
    },
    portofolioAsesi: {
      type:DataTypes.STRING
    },
    mapa01: {
      type:DataTypes.STRING
    },
    mapa02: {
      type:DataTypes.STRING
    },
    frak04:{
      type:DataTypes.STRING
    },
    frak07:{
      type:DataTypes.STRING
    },
    fria01:{
      type:DataTypes.STRING
    },
    fria02:{
      type:DataTypes.STRING
    },
    fria03:{
      type:DataTypes.STRING
    },
    fria04a:{
      type:DataTypes.STRING
    },
    fria04b:{
      type:DataTypes.STRING
    },
    fria05:{
      type:DataTypes.STRING
    },
    fria06:{
      type:DataTypes.STRING
    },
    fria07:{
      type:DataTypes.STRING
    },
    frak02:{
      type:DataTypes.STRING
    },
    frak03:{
      type:DataTypes.STRING
    
    },
    frak05:{
      type:DataTypes.STRING
    },
    frak06:{
      type:DataTypes.STRING
    },
    fria08:{
      type:DataTypes.STRING
    },
    fria09:{
      type:DataTypes.STRING
    },
    fria10:{
      type:DataTypes.STRING
    },
    fria11:{
      type:DataTypes.STRING
    },
    statusKompetensi:{
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'PesertaUjikom',
  });
  return PesertaUjikom;
};