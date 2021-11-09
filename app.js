const express = require('express');

const logicRoutes = require('./routes');

const app = express();

app.use(logicRoutes);

app.get('/', (req, res, next) => {
  res.send('Server Logger API');
});

app.use(((err, req, res, next) => {
  if (!err) {
    return next();
  }
  console.error(err.response?.data ?? err.message);
  res.error(500, 'Internal server error');
}));

module.exports = app;