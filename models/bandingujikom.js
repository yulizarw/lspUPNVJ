'use strict';
const {
  Model
} = require('sequelize');
const pesertaujikom = require('./pesertaujikom');
module.exports = (sequelize, DataTypes) => {
  class bandingUjikom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bandingUjikom.belongsTo(models.pesertaUjikom)
      bandingUjikom.belongsToMany(models.rekamanAsesmen,{through:models.umpanBalik})
    }
  }
  bandingUjikom.init({
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
    modelName: 'bandingUjikom',
    freezeTableName: true
  });
  return bandingUjikom;
};