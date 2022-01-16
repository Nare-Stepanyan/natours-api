import Tour from '../models/tourModel.js';

export const getAllTours = async (req, res) => {
  try {
    // filtering

    const queryObj = { ...req.query };
    const excludeFields = ['sort', 'page', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    // Advanced filtering

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    queryStr = JSON.parse(queryStr);

    let query = Tour.find(queryStr);

    // sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else query = query.sort('-createdAt');

    const tours = await query;
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      },
      requestedAt: req.requestTime
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err
    });
  }
};

export const getTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findById(id);

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

export const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent'
    });
  }
};
export const updateTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const id = req.params.id;
    await Tour.findByIdAndDelete(id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
