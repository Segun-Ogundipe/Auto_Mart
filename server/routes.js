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
router.post('/auth/signin', UserMiddleware.validateLogin,
  UserMiddleware.validateEmail,
  UserMiddleware.validatePassword, UserController.signin);

// Car routes
router.post('/car', TokenUtility.checkToken, CarMiddleware.validateCreate,
  ImageUploader.upload, CarController.create);
router.patch('/car/:carId', TokenUtility.checkToken, CarController.update);
router.get('/car/:carId', TokenUtility.checkToken, CarController.getCar);
router.get('/car', TokenUtility.checkToken, CarController.getCarsByStatus);
router.delete('/car/:carId', TokenUtility.checkToken, CarController.delete);
router.get('/cars', TokenUtility.checkToken, CarController.getAll);

// Order routes
router.post('/order/', TokenUtility.checkToken, OrderMiddleware.validateCreate,
  OrderController.create);
router.patch('/order/:orderId', TokenUtility.checkToken, OrderController.updateOrder);

export default router;
