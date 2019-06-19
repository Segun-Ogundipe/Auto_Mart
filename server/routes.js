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

const router = express.Router();

// Documentation
router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerDoc));

// User routes
router.post('/auth/signup',
  UserMiddleware.validateSignup, UserMiddleware.validateEmail,
  UserMiddleware.validatePassword, UserMiddleware.validateUser, UserController.create);
router.post('/auth/signin',
  UserMiddleware.validateLogin, UserMiddleware.validateEmail,
  UserMiddleware.validatePassword, UserController.signin);
router.post('/users/:email/resetPassword', TokenUtility.checkToken, UserMiddleware.validatePasswordChange,
  UserMiddleware.validatePassword);

// Car routes
router.post('/cars',
  TokenUtility.checkToken, CarMiddleware.validateCreate,
  CarMiddleware.validateOwner, ImageUploader.upload,
  CarController.create);
router.patch('/cars/:carId/price',
  TokenUtility.checkToken, CarMiddleware.validateCarUpdate,
  CarMiddleware.validatePriceUpdate, CarController.updatePrice);
router.patch('/cars/:carId/status',
  TokenUtility.checkToken, CarMiddleware.validateCarUpdate,
  CarMiddleware.validateStatusUpdate, CarController.updateStatus);
router.get('/cars/:carId',
  CarController.getCar);
router.get('/cars',
  CarController.getCarsByStatus);
router.delete('/admin/cars/:carId',
  TokenUtility.checkToken, CarMiddleware.validateAdmin,
  CarController.delete);
router.get('/admin/cars',
  TokenUtility.checkToken, CarMiddleware.validateAdmin,
  CarController.getAll);

// Order routes
router.post('/orders',
  TokenUtility.checkToken, OrderMiddleware.validateCreate,
  OrderController.create);
router.patch('/orders/:orderId/price',
  TokenUtility.checkToken, OrderMiddleware.validateUpdate,
  OrderMiddleware.validateBuyer, OrderController.updateOrder);

export default router;
