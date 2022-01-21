import express from 'express';
import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan
} from '../controllers/tourController.js';
import { protect, restrictTo } from '../controllers/authController.js';
import reviewRouter from './reviewRoutes.js';

const tourRouter = express.Router();

tourRouter.use('/:tourId/reviews', reviewRouter);

tourRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours);

tourRouter.route('/tour-stats').get(getTourStats);

tourRouter
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide'), getMonthlyPlan);

tourRouter
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

export default tourRouter;
