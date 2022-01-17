import Tour from '../models/tourModel.js';
import APIFeatures from './../utils/apiFeatures.js';

export const aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage, summary, difficulty';
  next();
};
export const getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;
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
      message: err.message
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

export const getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      { $sort: { avgPrice: 1 } },
      {
        $match: { _id: { $ne: 'EASY' } }
      }
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
