/* eslint-disable class-methods-use-this */
import validators from '../helpers/validators';
import users from '../db/userdb';
import Success from '../models/success';
import Error from '../models/error';
import TokenGenerator from '../helpers/middleware';
import UserResponse from '../models/userResponse';
import Queries from '../queries/userqueries';

export default class UserController {
  create(req, res) {
    const { body } = req;
    let user = null;
    const Query = new Queries();

    if (!validators.isValidUser(body)) {
      res.status(400).json(new Error(400, 'The request body is malformed'));
    } else if (!validators.isValidEmail(body.email)) {
      res.status(400).json(new Error(400, `The email: ${body.email} is not valid`));
    } else if (!validators.isValidPassword(body.password)) {
      res.status(400).json(new Error(400, 'The password is too short'));
    } else if (validators.isDuplicatedUser(users, body.email)) {
      res.status(400).json(new Error(400, `User with email: ${body.email} already exist`));
    } else {
      user = Query.createUser(body, users);

      const token = new TokenGenerator().generateToken(user.getEmail(), user.getPassword());

      res.status(201).json(new Success(201, new UserResponse(user, token)));
    }
  }
}
