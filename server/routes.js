import express from 'express';
import UserController from './controllers/userController';

const router = express.Router();
const userController = new UserController();

router.post('/auth/signup', userController.create);
router.post('/auth/signin', userController.signin);

export default router;
