'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apl02Base extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Apl02Base.hasMany(models.Apl02Dynamic, {foreignKey:'baseId',as:'dynamicFields'})
      Apl02Base.belongsTo(models.Asesor,{foreignKey:'asesorId'})
    
    }
  }
  Apl02Base.init({
    namaSkema: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'harap mengisi nama Skema'
        }
      }
    },
    
  }, {
    sequelize,
    modelName: 'Apl02Base',
  });
  return Apl02Base;
};