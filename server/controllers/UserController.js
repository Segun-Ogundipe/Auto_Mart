/* eslint-disable class-methods-use-this */
import { compareSync } from 'bcrypt';

import Success from '../models/SuccessModel';
import Error from '../models/ErrorModel';
import TokenGenerator from '../middlewares/TokenMiddleware';
import UserResponse from '../models/UserResponse';
import UserService from '../services/UserService';
import ApiError from '../helpers/ErrorClass';

export default class UserController {
  static async create(req, res) {
    try {
      const { body } = req;
      const user = await UserService.createUser(body);

      const token = TokenGenerator.generateToken(user[0].id);

      res.status(201).json(new Success(201, new UserResponse(user[0], token)));
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static async signin(req, res) {
    try {
      const { body } = req;
      const user = await UserService.findUserByEmail(body.email);

      if (user.length < 1) {
        throw new ApiError(404, 'The email is not associated with any user');
      }

      if (compareSync(body.password, user[0].password)) {
        const token = TokenGenerator.generateToken(user[0].id);

        res.status(200).json(new Success(200, new UserResponse(user[0], token)));
      } else {
        res.status(400).json(new Error(400, 'The password is incorrect'));
      }
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }
}
