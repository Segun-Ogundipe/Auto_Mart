/* eslint-disable class-methods-use-this */
import { compareSync } from 'bcrypt';

import users from '../db/userdb';
import Success from '../models/SuccessModel';
import Error from '../models/ErrorModel';
import TokenGenerator from '../middlewares/TokenMiddleware';
import UserResponse from '../models/UserResponse';
import UserService from '../services/UserService';

export default class UserController {
  static create(req, res) {
    const { body } = req;
    let user = null;

    user = UserService.createUser(body);

    const token = TokenGenerator.generateToken(user.email);

    res.status(201).json(new Success(201, new UserResponse(user, token)));
  }

  static signin(req, res) {
    const { body } = req;
    let user = null;

    user = UserService.findUserByEmail(body.email, users);
    if (user === null) {
      res.status(422).json(new Error(422, 'The email is not associated with any user'));
    } else if (user !== null) {
      if (compareSync(body.password, user.password)) {
        const token = TokenGenerator.generateToken(user.email);

        res.status(200).json(new Success(200, new UserResponse(user, token)));
      } else {
        res.status(422).json(new Error(422, 'The password is incorrect'));
      }
    }
  }
}
