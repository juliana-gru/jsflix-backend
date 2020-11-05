const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

class UserController {
  create() {
    return async (req, res) => {
      //Get validationService results
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Get user data
      const userInfo = {
        username: req.body.username,
        password: hashedPassword
      }
      
      // Creates new user
      const user = new User(userInfo);

      try {
        const createdUser = await user.save();
        res.status(200).json({ message: `Welcome ${createdUser.username}` });
        //res.redirect('/browse')
      } catch(err) {
        res.status(400).json({ message: err });
      }
    }    
  }

  login() {
    return async (req, res) => {
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
          return res.status(400).json(errors);
      }
      
      const token = jwt.sign({ username: req.body.username }, process.env.TOKEN_SECRET);
      res.header('auth-token', token).json('Logged in');
    }
  }
}

module.exports = new UserController;