const createError = require('http-errors');
const { Cart, Product } = require('../models/index')
const Sequelize = require('sequelize');

const Op = Sequelize.Op


async function authorizeCart(req, res, next) {
  try {
    let cartId = req.params.cart_id
    let cart = await Cart.findByPk(cartId)
    if (req.decoded.id !== cart.UserId){
      throw createError(401, "Unauthorized")
    } else {
      next();
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function bulkAuthorizeCart(req, res, next) {
  try {
    let { arrOfCartId } = req.body
    console.log(arrOfCartId,'<<<< di author')
    console.log(arrOfCartId[0],'<<<,harusnya 1')
    let carts = await Cart.findAll({
      where: { id: {
        [Op.in]: arrOfCartId
      } },
      include: 'Product'
    })
    carts.forEach(cart => {
      if (req.decoded.id !== cart.UserId){
        throw createError(401, "Unauthorized")
      } else if (cart.Product.stock < cart.qty) {
      throw createError(400, `Stock for ${cart.Product.name} is not sufficient`)
      }
    });
    next();
  } catch (err) {
    console.log(err.message)
    next(err)
  }
}
module.exports = {
  authorizeCart,
  bulkAuthorizeCart
}