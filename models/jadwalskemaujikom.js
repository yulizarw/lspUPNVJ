'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JadwalSkemaUjikom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      JadwalSkemaUjikom.hasMany(models.Asesor,{
        foreignKey:'jadwalSkemaUjikomId'
      })
    }
  }
  JadwalSkemaUjikom.init({
    jadwalUjikomId: DataTypes.INTEGER,
    skemaUjikomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'JadwalSkemaUjikom',
  });
  return JadwalSkemaUjikom;
};