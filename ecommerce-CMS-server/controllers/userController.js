const { User } = require("../models/index");
const { comparePass } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const createError = require('http-errors');

// const {OAuth2Client} = require('google-auth-library');

class UserController {
  static postRegister(req, res, next) {
    let { email, password, name } = req.body;
    if(!email || !password || !name) {
      throw createError(400, 'Please fill all required fields');
    }
    let role = 'customer'
    User.create({ email, password, name, role })
      .then((user) => {
        res.status(201).json({
          email: user.email,
          name: user.name,
          role: user.role,
          profPic: user.profPic,
        });
      })
      .catch((err) => {
        next(err)
      });
  }

  static postLogin(req, res, next) {
    const { email, password } = req.body;
    if(!email || !password) {
      throw createError(400, 'Please fill all required fields');
    }
    User.findOne({
      where: {
        email
      },
    })
      .then((user) => {
        // console.log(user)
        if (!user)
          throw createError(400, 'Invalid email or password');
        const comparedPassword = comparePass(password, user.password);
        if (!comparedPassword) 
          throw createError(400, 'Invalid email or password');

        let dataUser = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          profPic: user.profPic,
        }
        const access_token = generateToken(dataUser);
        res.status(200).json({
          access_token,
          dataUser
        });
      })
      .catch((err) => {
        // console.log(err)
        next(err);
      });
  }
}

module.exports = UserController;