'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apl02Dynamic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Apl02Dynamic.belongsTo(models.Apl02Base,{
        foreignKey:'baseId',
        as:'base'
      })
    }
  }
  Apl02Dynamic.init({
    unitKompetensiId: {
      type:DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg:'harap mengisi data MUK'
        }
      }
    },
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
    baseId: {
      type: DataTypes.INTEGER, // Ensure baseId is defined as a field
      references: {
        model: 'APL02Base', // Name of the target model
        key: 'id'          // Primary key of the target model
      }
    }
  }, {
    sequelize,
    modelName: 'Apl02Dynamic',
  });
  return Apl02Dynamic;
};