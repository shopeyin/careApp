const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(cors());

const serviceUserRouter = require('./routes/serviceUserRoutes');
const carerRouter = require('./routes/carerRoutes');
const getPrivateDataRoute = require('./routes/privateRoute');
const taskRouter = require('./routes/taskRoute');

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
app.use('/api/v1/carers', carerRouter);
app.use('/api/v1/task', taskRouter);
app.use('/api/v1/private', getPrivateDataRoute);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `can't find ${req.originalUrl} on this server`,
  // });

  // const err = new Error(`can't find ${req.originalUrl} on this server`);
  // (err.status = 'fail'), (err.statusCode = 404);

  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

// 2v2h8Hl2jtGRikEl
