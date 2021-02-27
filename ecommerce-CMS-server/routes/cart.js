const CartController = require("../controllers/cartController");
const router = require("express").Router();
const { authorizeCart } = require('../middlewares/authorizeCustomer');
const { bulkAuthorizeCart } = require('../middlewares/authorizeCustomer');

router.get('/', CartController.getCarts)
router.get('/history', CartController.getHistory)
router.post('/', CartController.postCart)
router.delete('/:cart_id', authorizeCart, CartController.delCart)
router.patch('/:cart_id', authorizeCart, CartController.patchCartQty)
router.put('/', bulkAuthorizeCart, CartController.putCartCheckedOut)

module.exports = router;