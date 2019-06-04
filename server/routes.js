import express from 'express';
import UserController from './controllers/userController';
import CarController from './controllers/carController';
import TokenUtility from './helpers/middleware';
import ImageUploader from './helpers/imageUpload';
import OrderController from './controllers/orderControler';

const router = express.Router();
const userController = new UserController();
const carController = new CarController();
const tokenUtility = new TokenUtility();
const imageUploader = new ImageUploader();
const orderControler = new OrderController();

// User routes
router.post('/auth/signup', userController.create);
router.post('/auth/signin', userController.signin);

// Car routes
router.post('/car/', tokenUtility.checkToken, imageUploader.upload, carController.create);

// Order routes
router.post('/order/', tokenUtility.checkToken, orderControler.create);

export default router;
