import express from 'express';

import {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds
} from '../controllers/reviewController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const reviewRouter = express.Router({ mergeParams: true });
reviewRouter
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourUserIds, createReview);

reviewRouter
  .route('/:id')
  .patch(updateReview)
  .delete(deleteReview);

export default reviewRouter;
