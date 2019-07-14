import express from 'express';
import swaggerUI from 'swagger-ui-express';

import UserController from './controllers/UserController';
import CarController from './controllers/CarController';
import TokenMiddleware from './middlewares/TokenMiddleware';
import ImageUploader from './middlewares/ImageMiddleware';
import OrderController from './controllers/OrderController';
import CarMiddleware from './middlewares/CarMiddleWare';
import OrderMiddleware from './middlewares/OrderMiddleware';
import UserMiddleware from './middlewares/UserMiddleware';
import swaggerDoc from './docs/swagger';
import FlagController from './controllers/FlagController';
import FlagMiddleware from './middlewares/FlagMiddleware';

const router = express.Router();

// Documentation
router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerDoc));

// User routes
router.post('/auth/signup',
  UserMiddleware.validateSignup, UserMiddleware.validateEmail, /*UserMiddleware.verifyEmail,*/
  UserMiddleware.validatePassword, UserMiddleware.validateUser, UserController.create);
router.post('/auth/signin',
  UserMiddleware.validateLogin, UserMiddleware.validateEmail,
  UserMiddleware.validatePassword, UserController.signin);
router.post('/users/:email/reset_password',
  UserMiddleware.validateUpdateEmail, UserController.resetPassword,
  TokenMiddleware.checkToken, UserMiddleware.validatePasswordChange,
  UserMiddleware.validatePassword, UserController.updatePassword);

// Car routes
// router.post('/car',
//   TokenMiddleware.checkToken, CarMiddleware.validateCreate,
//   ImageUploader.upload, CarController.create);
router.patch('/car/:car_id/price',
  TokenMiddleware.checkToken, CarMiddleware.validateParam,
  CarMiddleware.validateCarUpdate, CarMiddleware.validatePriceUpdate,
  CarController.updatePrice);
router.patch('/car/:car_id/status',
  TokenMiddleware.checkToken, CarMiddleware.validateParam,
  CarMiddleware.validateCarUpdate, CarMiddleware.validateStatusUpdate,
  CarController.updateStatus);
router.get('/car/:car_id',
  TokenMiddleware.checkToken, CarMiddleware.validateParam,
  CarController.getCar);
router.get('/car',
  TokenMiddleware.checkToken, CarController.getAll,
  CarMiddleware.validateStatus, CarController.getCarsByStatus);
router.delete('/car/:car_id',
  TokenMiddleware.checkToken, CarMiddleware.validateParam,
  CarMiddleware.validateAdmin, CarController.delete);

// Order routes
router.post('/order',
  TokenMiddleware.checkToken, OrderMiddleware.validateCreate,
  OrderController.create);
router.patch('/order/:order_id/price',
  TokenMiddleware.checkToken, OrderMiddleware.validateUpdate,
  OrderMiddleware.validateBuyer, OrderController.updateOrder);

// Flag routes
router.post('/flags',
  FlagMiddleware.validateFlag, FlagController.create);

export default router;
