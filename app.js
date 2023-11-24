const express = require('express');
const bookRouter = require('./routers/bookRoutes');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('hello from middleware');
  next();
});

app.use('/book', bookRouter);
module.exports = app;
