import express from 'express';
import { getCheckoutSession } from './../controllers/bookingController.js';
import { protect, restrictTo } from './../controllers/authController.js';
import {
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking
} from './../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.use(protect);

bookingRouter.get('/checkout-session/:tourId', getCheckoutSession);

bookingRouter.use(restrictTo('admin', 'lead-guide'));

bookingRouter
  .route('/')
  .get(getAllBookings)
  .post(createBooking);

bookingRouter
  .route('/:id')
  .get(getBooking)
  .patch(updateBooking)
  .delete(deleteBooking);

export default bookingRouter;
