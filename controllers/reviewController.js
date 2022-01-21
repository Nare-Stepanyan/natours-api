import Review from '../models/reviewModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from './../utils/appError.js';

export const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  if (!reviews) {
    const message = 'No reviews found!';
    return next(new AppError(message, 404));
  }
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  });
});
export const createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview
    }
  });
});
