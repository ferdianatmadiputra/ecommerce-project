const createError = require('http-errors');

async function authorize(req, res, next) {
  try {
    if (req.decoded.role !== 'admin'){
      throw createError(401, "Unauthorized")
    } else {
      next();
    }
  } catch (err) {
    next(err)
  }
}

module.exports = authorize;