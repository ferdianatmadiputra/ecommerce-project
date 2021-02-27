const ProductController = require("../controllers/productController");
const router = require("express").Router();
const authorize = require('../middlewares/authorize');
const authenticate = require('../middlewares/authenticate');

router.get('/', ProductController.getProducts)
router.use(authenticate)
router.use(authorize);
router.post('/', ProductController.postProduct)
router.put('/:product_id', ProductController.putProduct)
router.delete('/:product_id', ProductController.delProduct)

module.exports = router;