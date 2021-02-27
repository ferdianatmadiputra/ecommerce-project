const { Banner } = require('../models/index')

module.exports = class BannerController {

  static async postBanner(req, res, next) {
    let { title, image_url, status } = req.body;
    try {
      let newBanner = await Banner.create({
        title,
        image_url,
        status
      })
      res.status(201).json(newBanner)
    } catch (err) {
      next(err);
    }
  }

  static async putBanner (req, res, next) {
    let id = req.params.banner_id;
    let { title, image_url, status} = req.body;
    try {
      let editedBanner = await Banner.update({ title, image_url, status},{
        where: { id},
        returning: true
      })
      if (editedBanner[0] === 1) {
        res.status(200).json(editedBanner[1][0])
      } else {
        throw createError(404, 'Error Banner not found')
      }
    } catch (err) {
      next(err)
    }
  }

  static async delBanner (req, res, next) {
    let id = req.params.banner_id;
    try {
      let deletedBanner = await Banner.destroy({
        where: {
          id
        }
      })
      if (deletedBanner == 1){
        res.status(200).json({message: 'Banner deleted successfully'})
      } else {
        throw createError(404, 'Error Banner not found')
      }
    } catch (err) {
      next(err)
    }
  }

  static async getBanners (req, res, next) {
    try {
      let banners = await Banner.findAll()
      res.status(200).json(banners)
    } catch (err) {
      next(err)
    }
  }
}