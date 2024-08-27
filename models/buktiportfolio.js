'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class buktiPortfolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  buktiPortfolio.init({
    pasfoto: DataTypes.STRING,
    identitasPribadi: DataTypes.STRING,
    buktiPendidikan: DataTypes.STRING,
    buktiPelatihan: DataTypes.STRING,
    buktiPengalamanKerja: DataTypes.STRING,
    portfolio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'buktiPortfolio',
  });
  return buktiPortfolio;
};