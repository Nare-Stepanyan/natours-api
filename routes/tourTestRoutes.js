import express from 'express';
import {
  checkID,
  getAllTours,
  checkBody,
  createTour,
  getTour,
  updateTour,
  deleteTour
} from '../controllers/tourTestController.js';

const tourTestRouter = express.Router();

tourTestRouter.param('id', checkID);

tourTestRouter
  .route('/')
  .get(getAllTours)
  .post(checkBody, createTour);

tourTestRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

export default tourTestRouter;
