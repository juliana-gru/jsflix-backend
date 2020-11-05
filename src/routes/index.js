const routes = require('express').Router();

const userRouter = require('./users.routes');

routes.get('/', (req, res) => {
  res.send('Welcome to the homepage.')
})

routes.use('/users', userRouter);

module.exports = routes;