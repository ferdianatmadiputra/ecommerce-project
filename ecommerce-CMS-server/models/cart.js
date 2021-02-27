'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isCheckedOut: DataTypes.BOOLEAN,
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "Quantity cannot be empty"},
        notEmpty: {msg: "Quantity cannot be empty"},
        min: {args: [1], msg: "Minimum quantity is 1"},
        isNumeric: {args: true, msg: "Quantity must be in number"}
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
    hooks: {
      beforeCreate (cart, options) {
        cart.isCheckedOut = false
      }
    }
  });
  return Cart;
};