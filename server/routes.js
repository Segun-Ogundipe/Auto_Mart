import express from 'express';
import UserController from './controllers/userController';
import CarController from './controllers/carController';
import TokenUtility from './helpers/middleware';
import ImageUploader from './helpers/imageUpload';
import OrderController from './controllers/orderControler';

const router = express.Router();
const userController = new UserController();
const tokenUtility = new TokenUtility();
const imageUploader = new ImageUploader();
const orderControler = new OrderController();

// User routes
router.post('/auth/signup', userController.create);
router.post('/auth/signin', userController.signin);

// Car routes
router.post('/car', tokenUtility.checkToken, imageUploader.upload, CarController.create);
router.patch('/car/:carId', tokenUtility.checkToken, CarController.update);
router.get('/car/:carId', tokenUtility.checkToken, CarController.getCar);
router.get('/car', tokenUtility.checkToken, CarController.getCarsByStatus);
router.delete('/car/:carId', tokenUtility.checkToken, CarController.delete);
router.get('/car', tokenUtility.checkToken, CarController.getAll);

// Order routes
router.post('/order/', tokenUtility.checkToken, orderControler.create);
router.patch('/order/:orderId', tokenUtility.checkToken, orderControler.updateOrder);

export default router;
