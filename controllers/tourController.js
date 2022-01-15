import Tour from '../models/tourModel.js';

export const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

export const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime
  });
};

export const getTour = (req, res) => {
  const id = req.params.id * 1;

  res.status(200).json({
    status: 'success'
  });
};

export const createTour = (req, res) => {};
export const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};

export const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
