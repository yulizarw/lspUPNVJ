'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FrAk01 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FrAk01.belongsTo(models.PesertaUjikom,{
        foreignKey:'pesertaUjikomId'
      })
      FrAk01.belongsTo(models.SkemaUjikom,{
        foreignKey:'skemaUjikomId'
      })
      FrAk01.belongsTo(models.Tuk,{
        foreignKey:'tukId'
      })
    }
  }
  FrAk01.init({
    skemaSertifikasi: DataTypes.STRING,
    tuk: DataTypes.STRING,
    namaTuk: DataTypes.STRING,
    namaAsesor: DataTypes.STRING,
    namaPeserta: DataTypes.STRING,
    usernamePeserta: DataTypes.STRING,
    buktiDikumpulkan: DataTypes.STRING,
    tanggalPelaksanaan: DataTypes.DATE,
    waktuPelaksanaan: DataTypes.STRING,
    tandaTanganAsesor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FrAk01',
  });
  return FrAk01;
};