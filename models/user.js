'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.PesertaUjikom, {
        foreignKey:{
          name:'userId'
        }
      })
      User.hasOne(models.SkemaUjikom, {
        foreignKey:{
          name:'userId'
        }
      })
    
    }
    
  }
  User.init({
    userRole:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'role user sudah harus ditentukan'
        }
      }
    },
    userName:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'username sudah harus ditentukan'
        }
      }
    }, 
    userEmail:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'email sudah harus terisi'
        }
      }
    }, 
    userPassword:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Password harus terisi'
        }
      }
    }, 
    userPhoto:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Foto harus tersedia untuk keperluan sertifikasi'
        }
      }
    }, 
    userDepartment:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Program Studi Harus disertakan'
        }
      }
    }, 
    userPhone: DataTypes.DOUBLE,
    userBirthdate: DataTypes.DATE,
    userDomisili: DataTypes.STRING,
    sptAsesor: DataTypes.STRING
  }, 
  {
    hooks:{
      beforeCreate(user){
        user.userPassword = bcrypt.hashSync(user.userPassword, 10);
      }
    },
    sequelize,
    modelName: 'User',
  }
);
  return User;
};