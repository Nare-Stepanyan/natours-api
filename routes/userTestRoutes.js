import express from 'express';
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userTestController.js';

const userTestRouter = express.Router();

userTestRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser);

userTestRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

export default userTestRouter;
