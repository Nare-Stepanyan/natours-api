import express from 'express';
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateCurrentUser,
  deleteCurrentUser,
  getCurrentUser,
  uploadUserPhoto,
  resizeUserPhoto
} from '../controllers/userController.js';
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
  logout
} from '../controllers/authController.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.patch('/resetPassword/:token', resetPassword);

// Protect all routes after this middleware
userRouter.use(protect);

userRouter.get('/currentUser', getCurrentUser, getUser);
userRouter.patch('/updateMyPassword', updatePassword);
userRouter.patch(
  '/updateCurrentUser',
  uploadUserPhoto,
  resizeUserPhoto,
  updateCurrentUser
);
userRouter.delete('/deleteCurrentUser', deleteCurrentUser);

userRouter.use(restrictTo('admin'));

userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser);

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

export default userRouter;
