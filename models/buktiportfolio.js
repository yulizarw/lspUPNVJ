'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BuktiPortfolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BuktiPortfolio.init({
    pasfoto: DataTypes.STRING,
    identitasPribadi: DataTypes.STRING,
    buktiPendidikan: DataTypes.STRING,
    buktiPelatihan: DataTypes.STRING,
    buktiPengalamanKerja: DataTypes.STRING,
    portfolio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BuktiPortfolio',
  });
  return BuktiPortfolio;
};