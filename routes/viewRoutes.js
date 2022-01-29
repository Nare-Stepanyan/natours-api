import express from 'express';
import {
  getOverview,
  getTour,
  getLoginForm,
  updateUserData,
  getAccount
} from '../controllers/viewsController.js';
import { isLoggedIn, protect } from './../controllers/authController.js';

const viewRouter = express.Router();

viewRouter.get('/', isLoggedIn, getOverview);

viewRouter.get('/tour/:slug', isLoggedIn, getTour);

viewRouter.get('/me', protect, getAccount);

viewRouter.get('/login', isLoggedIn, getLoginForm);

viewRouter.post('/submit-user-data', protect, updateUserData);

export default viewRouter;
