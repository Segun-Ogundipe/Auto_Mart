import express from 'express';
import UserController from './controllers/userController';
import CarController from './controllers/carController';

const router = express.Router();
const userController = new UserController();
const carController = new CarController();

router.post('/auth/signup', userController.create);
router.post('/auth/signin', userController.signin);

router.post('/car/', carController.create);

export default router;
