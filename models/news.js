'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  News.init({
    content: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Konten berita harus diisi'
        }
      }
    },
    picture: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Gambar harus diisi'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};