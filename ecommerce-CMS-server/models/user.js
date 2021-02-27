'use strict';
const {hashPass} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart)
    }
  };
  User.init({
    role: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      },
      unique: {
        args: true,
        msg: 'This email has been used'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password cannot be empty'
        },
        notNull: { 
          msg: "password cannot be empty"
        },
        len: {
          args: [6,200],
          msg: 'minimum password length is 6 characters'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'name cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'name cannot be empty'
        }
      }
    },
    profPic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, option) => {
        let name;
        if (!user.profPic){
          if (user.name.includes(' ')){
            name = user.name.replace(' ','+')
          } else {
            name = user.name
          }
          user.profPic = `https://ui-avatars.com/api/?background=random&name=${name}&rounded=true`;
        }
        user.password = hashPass(user.password)
      }
    }
  });
  return User;
};