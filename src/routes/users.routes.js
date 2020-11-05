const { validationResult } = require('express-validator');

const User = require('../models/User');
const userController = require('../controllers/UserController');
const validateData = require('../services/validateData');

const userRouter = require('express').Router();

userRouter.post('/signup', validateData.signup(), userController.create());
userRouter.post('/login', validateData.login(), userController.login());

module.exports = userRouter;

