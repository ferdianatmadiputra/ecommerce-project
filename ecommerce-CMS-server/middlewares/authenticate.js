const jwt = require('jsonwebtoken');
const createError = require('http-errors')

function authenticate (req, res, next) {
    try {
        const token = req.headers.access_token;
        if (!req.headers.access_token) {
          throw createError(401, 'token must be provided')
        }
        req.decoded = jwt.verify(token, process.env.JWTSECRET);
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = authenticate;