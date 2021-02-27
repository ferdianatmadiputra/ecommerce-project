const { Product } = require('../models/index')

const createError = require('http-errors');

module.exports = class ProductController {

  static async postProduct(req, res, next) {
    try {
      let { name, image_url, category } = req.body;
      if (!req.body.price) {
        throw createError(400, 'Price cannot be empty')
      }
      if (!req.body.stock) {
        throw createError(400, 'Stock cannot be empty')
      }
      let price = +req.body.price;
      let stock = +req.body.stock;
        let newProduct = await Product.create({
          name,
          image_url,
          price,
          stock,
          category
        })
        res.status(201).json(newProduct)
    } catch (err) {
      next(err);
    }
  }

  static async putProduct(req, res, next) {
    let idToEdit = req.params.product_id;
    let { name, image_url, price, stock, category } = req.body;
    try {
      let editedProduct = await Product.update({ name, image_url, price, stock, category },{
        where: { id: idToEdit },
        returning: true
      })
      if (editedProduct[0] == 1) {
        res.status(200).json(editedProduct[1][0])
      } else {
        throw createError(404, 'Error Product not found')
      }
    } catch (err) {
      next(err)
    }
  }

  static async delProduct (req, res, next) {
    let idToDel = req.params.product_id;
    try {
      let deletedProduct = await Product.destroy({
        where: {
          id: idToDel
        }
      })
      if (deletedProduct == 1){
        res.status(200).json({message: 'Product deleted successfully'})
      } else {
        throw createError(404, 'Error Product not found')
      }
    } catch (err) {
      next(err)
    }
  }

  static async getProducts (req, res, next) {
    try {
      let products = await Product.findAll()
      res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }
}