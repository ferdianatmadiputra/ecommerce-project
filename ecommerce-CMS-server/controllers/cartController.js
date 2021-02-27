const { Cart , Product } = require('../models/index')
const Sequelize = require('sequelize');
const createError = require('http-errors')
const Op = Sequelize.Op

module.exports = class CartController {
  static async getCarts (req, res, next) {
    try {
      const UserId = req.decoded.id
      const carts = await Cart.findAll({
        where: {
          UserId,
          isCheckedOut: false
        },
        include: 'Product'
      })
      res.status(200).json(carts)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
  static async getHistory (req, res, next) {
    try {
      const UserId = req.decoded.id
      const carts = await Cart.findAll({
        where: {
          UserId,
          isCheckedOut: true
        },
        include: 'Product'
      })
      res.status(200).json(carts)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
  static async postCart (req, res, next) {
    try {
      const { ProductId } = req.body
      const UserId = req.decoded.id
      const existingCart = await Cart.findOne({
        where: {
          UserId, ProductId, isCheckedOut: false
        },
        include: 'Product'
      })
      if (existingCart) {
        if (existingCart.Product.stock < existingCart.qty + 1){
          throw createError(400, `Stock for ${existingCart.Product.name} is not sufficient`)
        }
        const updatedCart = await Cart.update({ qty: existingCart.qty + 1 }, {
            where: { id: existingCart.id},
            returning: true
        })
        res.status(200).json(updatedCart[1][0])
      } else {
        const qty = 1
        const newCart = await Cart.create({
          UserId,
          ProductId,
          qty
        })
        res.status(201).json(newCart)
      }
    } catch (err) {
      console.log(err)
      next(err);
    }
  }
  static async delCart (req, res, next) {
    let idToDel = req.params.cart_id;
    try {
      let deletedCart = await Cart.destroy({
        where: {
          id: idToDel,
          isCheckedOut: false
        }
      })
      if (deletedCart == 1){
        res.status(200).json({message: 'Removed successfully'})
      } else {
        throw createError(404, 'Error not found')
      }
    } catch (err) {
      next(err)
    }
  }
  static async patchCartQty (req, res, next) {
    let idToEdit = req.params.cart_id;
    let { qty } = req.body;
    try {
      let theCart = await Cart.findOne({
        where: {
          id: idToEdit
        },
        include: 'Product'
      })
      console.log(theCart, 'ini cartnyaaaaaaaaa')
      if (theCart.Product.stock < qty) {
        throw createError(400, 'Stock is not sufficient')
      } else {
        let editedCart = await Cart.update({ qty },{
          where: { id: idToEdit, isCheckedOut: false },
          returning: true
        })
        if (editedCart[0] == 1) {
          res.status(200).json(editedCart[1][0])
        } else {
          throw createError(404, 'Error not found')
        }
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
  static async putCartCheckedOut (req, res, next) {
    let { arrOfCartId } = req.body;
    console.log(arrOfCartId,'<<<< di controller')
    try {
      let carts = await Cart.findAll({
        where: { id: {
          [Op.in]: arrOfCartId
        } },
        include: 'Product'
      })
      carts.forEach(cart => {
        Product.update({ stock: cart.Product.stock - cart.qty },{
          where: { id: cart.Product.id }
        })
      })
      let editedCart = await Cart.update({ isCheckedOut: true },{
        where: { id: {
          [Op.in]: arrOfCartId
        } },
        returning: true
      })
      if (editedCart[0] == arrOfCartId.length) {
        res.status(200).json(editedCart[1])
      } else {
        throw createError(404, 'Error not found')
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}