import express from 'express';
import UserController from './controllers/userController';
import CarController from './controllers/carController';
import TokenUtility from './helpers/middleware';

const router = express.Router();
const userController = new UserController();
const carController = new CarController();
const tokenUtility = new TokenUtility();

router.post('/auth/signup', userController.create);
router.post('/auth/signin', userController.signin);

router.post('/car/', tokenUtility.checkToken, carController.create);

export default router;
