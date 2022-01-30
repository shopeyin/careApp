const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(cors());

const serviceUserRouter = require('./routes/serviceUserRoutes');

//MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// custom middleware
app.use((req, res, next) => {
  // eslint-disable-next-line prettier/prettier
  console.log('middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/serviceusers', serviceUserRouter);

module.exports = app;

// 2v2h8Hl2jtGRikEl
