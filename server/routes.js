import express from 'express';
import swaggerUI from 'swagger-ui-express';

import UserController from './controllers/UserController';
import CarController from './controllers/CarController';
import TokenUtility from './middlewares/TokenMiddleware';
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
  TokenUtility.checkToken, UserMiddleware.validatePasswordChange,
  UserMiddleware.validatePassword, UserController.updatePassword);

// Car routes
router.post('/car',
  TokenUtility.checkToken, CarMiddleware.validateCreate,
  CarMiddleware.validateOwner, ImageUploader.upload,
  CarController.create);
router.patch('/cars/:car_id/price',
  CarMiddleware.validateParam, TokenUtility.checkToken,
  CarMiddleware.validateCarUpdate, CarMiddleware.validatePriceUpdate,
  CarController.updatePrice);
router.patch('/cars/:car_id/status',
  CarMiddleware.validateParam, TokenUtility.checkToken,
  CarMiddleware.validateCarUpdate, CarMiddleware.validateStatusUpdate,
  CarController.updateStatus);
router.get('/cars/:car_id',
  CarMiddleware.validateParam, CarController.getCar);
router.get('/cars', CarMiddleware.validateStatus,
  CarController.getCarsByStatus);
router.delete('/admin/cars/:car_id',
  CarMiddleware.validateParam, TokenUtility.checkToken,
  CarMiddleware.validateAdmin, CarController.delete);
router.get('/admin/cars',
  TokenUtility.checkToken, CarMiddleware.validateAdmin,
  CarController.getAll);

// Order routes
router.post('/orders',
  TokenUtility.checkToken, OrderMiddleware.validateCreate,
  OrderController.create);
router.patch('/orders/:order_id/price',
  TokenUtility.checkToken, OrderMiddleware.validateUpdate,
  OrderMiddleware.validateBuyer, OrderController.updateOrder);

// Flag routes
router.post('/flags',
  FlagMiddleware.validateFlag, FlagController.create);

export default router;
