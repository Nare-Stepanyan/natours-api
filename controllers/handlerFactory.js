import catchAsync from '../utils/catchAsync.js';
import AppError from './../utils/appError.js';

export const deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
      const message = 'No document found with that ID';
      const status = 404;
      return next(new AppError(message, status));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
