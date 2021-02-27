const router = require('express').Router();
const user = require('./user.js')
const product = require('./product.js');
const banner = require('./banner')
const cart = require('./cart')
const errorhandler = require('../middlewares/errorhandler.js');
const authenticate = require('../middlewares/authenticate');

router.use('/user', user);
router.use('/banner', banner);
router.use('/product', product);
router.use(authenticate);
router.use('/cart', cart)

router.use(errorhandler);

module.exports = router;