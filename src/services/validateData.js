const { body } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const ValidateData = {
  signup() {
    return [
      body('username').isEmail(),
      body('password').isLength({ min: 5 }),
      body('password-confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match.')
        }
        return true;
      }),
      body('username').custom(async value => {
        const user = await User.findOne({ username: value });
          if (user) return Promise.reject('E-mail is already in use');          
          return true;        
      })
    ] 
  },


  login() {
    return [
      body('username').custom(async value => {
        const user = User.findOne({ username: value })
        if (!user) return Promise.reject('E-mail or password is incorrect');
        return true;                  
      }),
      body('password').custom( async (value, { req }) => {
        const user = await User.findOne({ username: req.body.username });
        const validPw = await bcrypt.compare(value, user.password);
        if (!validPw) return Promise.reject('E-mail or password is incorrect');
        return true;
      })      
    ]
  }   
}

module.exports = ValidateData;