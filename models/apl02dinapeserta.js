'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apl02DinaPeserta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Apl02DinaPeserta.init({
    
    fieldName: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'harap mengisi fieldname'
        }
      }

    },
    fieldQuestion: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'harap mengisi Pertanyaan'
        }
      }
    },
    fieldValue: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'harap mengisi Kompeten / Tidak'
        }
      }
    },
    pesertaUjikomId: DataTypes.INTEGER,
    apl02DynamicId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Apl02DinaPeserta',
  });
  return Apl02DinaPeserta;
};