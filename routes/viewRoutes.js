import express from 'express';
import { getOverview, getTour } from './../controllers/viewsController.js';

const viewRouter = express.Router();

viewRouter.get('/', getOverview);
viewRouter.get('/tour/:slug', getTour);

export default viewRouter;
