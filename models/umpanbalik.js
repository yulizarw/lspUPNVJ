'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UmpanBalik extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UmpanBalik.belongsTo(models.PesertaUjikom,{
        foreignKey:'pesertaUjikomId'
      })
      UmpanBalik.belongsTo(models.Asesor,{
        foreignKey:'asesorId'
      })
    }
  }
  UmpanBalik.init({
    frak03Umpan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UmpanBalik',
  });
  return UmpanBalik;
};