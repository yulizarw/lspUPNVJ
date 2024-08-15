'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class umpanBalik extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  umpanBalik.init({
    frak03Umpan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'umpanBalik',
    freezeTableName: true
  });
  return umpanBalik;
};