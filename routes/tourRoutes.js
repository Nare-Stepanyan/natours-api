import express from 'express';
import {
  checkID,
  getAllTours,
  checkBody,
  createTour,
  getTour,
  updateTour,
  deleteTour
} from './../controllers/tourController.js';

const tourRouter = express.Router();

tourRouter.param('id', checkID);

tourRouter
  .route('/')
  .get(getAllTours)
  .post(checkBody, createTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

export default tourRouter;
