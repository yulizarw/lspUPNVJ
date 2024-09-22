'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BandingUjikom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BandingUjikom.belongsTo(models.PesertaUjikom, {
        foreignKey:'pesertaUjikomId'
      })
      BandingUjikom.belongsToMany(models.RekamanAsesmen,{through:models.UmpanBalik, foreignKey:'bandingUjikomId', otherKey:'rekamanAsesmenId'})
    }
  }
  BandingUjikom.init({
    formBanding: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
         msg:'Form Banding Harus diisi'
        }
       }
    }
  },{
    sequelize,
    modelName: 'BandingUjikom',
  });
  return BandingUjikom;
};