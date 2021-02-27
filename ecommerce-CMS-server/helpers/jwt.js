const jwt = require('jsonwebtoken');

function generateToken(dataObj) {
    return jwt.sign(dataObj, process.env.JWTSECRET)
}

module.exports= {generateToken}