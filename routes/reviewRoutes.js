import express from 'express';

import {
  getAllReviews,
  createReview,
  deleteReview
} from '../controllers/reviewController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const reviewRouter = express.Router({ mergeParams: true });
reviewRouter
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview);

reviewRouter.route('/:id').delete(deleteReview);

export default reviewRouter;
