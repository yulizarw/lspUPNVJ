'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jadwalUjikom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      jadwalUjikom.belongsTo(models.pesertaUjikom)
      jadwalUjikom.hasMany(models.rekamanAsesmen)
      jadwalUjikom.belongsTo(models.skemaUjikom)
    }
  }
  jadwalUjikom.init({
    tanggalWaktu: 
    {
      type:DataTypes.DATE,
      validate:{
        notEmpty:{
          msg:'Tanggal Harus diisi'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'jadwalUjikom',
    freezeTableName: true
  });
  return jadwalUjikom;
};