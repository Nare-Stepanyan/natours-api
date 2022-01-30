import express from 'express';
import {
  getOverview,
  getTour,
  getLoginForm,
  updateUserData,
  getAccount,
  getMyTours
} from '../controllers/viewsController.js';
import { isLoggedIn, protect } from './../controllers/authController.js';
import { createBookingCheckout } from '../controllers/bookingController.js';

const viewRouter = express.Router();

viewRouter.get('/', createBookingCheckout, isLoggedIn, getOverview);

viewRouter.get('/tour/:slug', isLoggedIn, getTour);

viewRouter.get('/me', protect, getAccount);

viewRouter.get('/my-tours', createBookingCheckout, protect, getMyTours);

viewRouter.get('/login', isLoggedIn, getLoginForm);

viewRouter.post('/submit-user-data', protect, updateUserData);

export default viewRouter;
