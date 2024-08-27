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
      Apl02Base.hasMany(models.Apl02Dynamic, {as:'dynamicFields'})
    }
  }
  Apl02Base.init({
    namaPeserta: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'harap mengisi nama peserta'
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'Apl02Base',
  });
  return Apl02Base;
};