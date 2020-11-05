const mongoose = require('mongoose');
require('dotenv/config');

mongoose.connect(process.env.DB_CONNECTION_DEV, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to database.');
});

module.exports = mongoose;