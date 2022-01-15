import express from 'express';
import morgan from 'morgan';
import path from 'path';
const __dirname = path.resolve();

import tourTestRouter from './routes/tourTestRoutes.js';
import userTestRouter from './routes/userTestRoutes.js';
import tourRouter from './routes/tourRoutes.js';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/toursTest', tourTestRouter);
app.use('/api/v1/usersTest', userTestRouter);
app.use('/api/v1/tours', tourRouter);

export default app;
