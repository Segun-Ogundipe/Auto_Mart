import express from 'express';
import UserController from './controllers/userController';
import CarController from './controllers/carController';
import TokenUtility from './helpers/middleware';
import ImageUploader from './helpers/imageUpload';

const router = express.Router();
const userController = new UserController();
const carController = new CarController();
const tokenUtility = new TokenUtility();
const imageUploader = new ImageUploader();

// User routes
router.post('/auth/signup', userController.create);
router.post('/auth/signin', userController.signin);

// Car routes
router.post('/car/', tokenUtility.checkToken, imageUploader.upload, carController.create);

export default router;
