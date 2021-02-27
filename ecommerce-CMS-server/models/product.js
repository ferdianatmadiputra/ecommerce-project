'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart)

    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Product name cannot be empty"},
        notNull: { msg: "Product name cannot be empty"}
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Image_url cannot be empty" },
        notNull: { msg: "Image_url cannot be empty" }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Category cannot be empty" },
        notNull: { msg: "Category cannot be empty" }
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: { msg: "Price cannot be empty" },
        notEmpty: { msg: "Price cannot be empty" },
        min: {args: [0], msg: "Minimum price is 0"},
        isNumeric: {args: true, msg: "Price must be in number"}
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "Stock cannot be empty"},
        notEmpty: {msg: "Stock cannot be empty"},
        min: {args: [0], msg: "Minimum stock is 0"},
        isNumeric: {args: true, msg: "Stock must be in number"}
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};