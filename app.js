import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import xss from 'xss-clean';
import cors from 'cors';
import path from 'path';
const __dirname = path.resolve();
import express from 'express';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';

import tourTestRouter from './routes/tourTestRoutes.js';
import userTestRouter from './routes/userTestRoutes.js';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import viewRouter from './routes/viewRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

const app = express();

app.use(
  cors({
    'Cross-Origin-Resource-Policy': 'cross-origin'
  })
);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Global middlewares

// Set security HTTP headers

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", 'data:', 'blob:', 'https:', 'ws:'],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
        scriptSrc: [
          "'self'",
          'https:',
          'http:',
          'blob:',
          'https://*.mapbox.com',
          'https://js.stripe.com',
          'https://*.cloudflare.com'
        ],
        frameSrc: ["'self'", 'https://js.stripe.com'],
        objectSrc: ['none'],
        styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
        workerSrc: ["'self'", 'data:', 'blob:'],
        childSrc: ["'self'", 'blob:'],
        imgSrc: ["'self'", 'data:', 'blob:'],
        connectSrc: [
          "'self'",
          'blob:',
          'wss:',
          'https://*.tiles.mapbox.com',
          'https://api.mapbox.com',
          'https://events.mapbox.com'
        ],
        upgradeInsecureRequests: []
      }
    }
  })
);
// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body-parser, reading data from body into req.body
app.use(
  express.json({
    limit: '10kb'
  })
);

app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// reading data from cookie

app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(ExpressMongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
      'ratingAverage'
    ]
  })
);

// Test middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use('/', viewRouter);

app.use('/api/v1/toursTest', tourTestRouter);
app.use('/api/v1/usersTest', userTestRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  const message = `Can't find the ${req.originalUrl} on this server`;
  const status = 404;
  next(new AppError(message, status));
});

app.use(globalErrorHandler);

export default app;
