const BannerController = require("../controllers/bannerController");
const router = require("express").Router();
const authorize = require('../middlewares/authorize');
const authenticate = require('../middlewares/authenticate');

router.get('/', BannerController.getBanners)
router.use(authenticate)
router.use(authorize);
router.post('/', BannerController.postBanner)
router.put('/:banner_id', BannerController.putBanner)
router.delete('/:banner_id', BannerController.delBanner)

module.exports = router;