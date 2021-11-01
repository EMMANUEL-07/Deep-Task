const path = require('path');

const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  WINDOW_TIME: process.env.WINDOWTIME || 10000,
} 