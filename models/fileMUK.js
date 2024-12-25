'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fileMUK extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  fileMUK.init({
    fileName: DataTypes.STRING,
    path: DataTypes.STRING,
    mimeType: DataTypes.STRING,
    namaSkema: DataTypes.STRING,
    asesorId:DataTypes.INTEGER,
    adminId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'fileMUK',
  });
  return fileMUK;
};