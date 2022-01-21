import catchAsync from '../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import APIFeatures from './../utils/apiFeatures.js';

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

export const updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!doc) {
      const message = 'No document found with that ID';
      const status = 404;
      return next(new AppError(message, status));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

export const createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

export const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    let query = Model.findById(id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;
    if (!doc) {
      const message = 'No document found with that ID';
      const status = 404;
      return next(new AppError(message, status));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

export const getAll = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nnested Get reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });
