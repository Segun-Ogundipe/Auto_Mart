/* eslint-disable class-methods-use-this */
import validators from '../helpers/validators';
import users from '../db/userdb';
import Success from '../models/success';
import Error from '../models/error';
import TokenGenerator from '../helpers/middleware';
import UserResponse from '../models/userResponse';
import Queries from '../queries/userqueries';

const Query = new Queries();

export default class UserController {
  create(req, res) {
    const { body } = req;
    let user = null;

    if (!validators.isValidUser(body)) {
      res.status(400).json(new Error(400, 'The request body is malformed'));
    } else if (!validators.isValidEmail(body.email)) {
      res.status(400).json(new Error(400, `The email: ${body.email} is not valid`));
    } else if (!validators.isValidPassword(body.password)) {
      res.status(400).json(new Error(400, 'The password is too short'));
    } else if (validators.isDuplicatedUser(users, body.email)) {
      res.status(409).json(new Error(409, `User with email: ${body.email} already exist`));
    } else {
      user = Query.createUser(body, users);

      const token = new TokenGenerator().generateToken(user.getEmail(), user.getPassword());

      res.status(201).json(new Success(201, new UserResponse(user, token)));
    }
  }

  signin(req, res) {
    const { body } = req;
    let user = null;

    if (!validators.isValidLogin(body)) {
      res.status(400).json(new Error(400, 'The request body is malformed'));
    } else if (!validators.isValidEmail(body.email)) {
      res.status(400).json(new Error(400, `The email: ${body.email} is not valid`));
    } else if (!validators.isValidPassword(body.password)) {
      res.status(400).json(new Error(400, 'The password is too short'));
    } else {
      user = Query.getUserByEmail(body.email, users);
      console.log(user);
      if (user === null) {
        res.status(422).json(new Error(422, 'The email is not associated with any user'));
      } else if (user !== null) {
        if (user.password === body.password) {
          const token = new TokenGenerator().generateToken(user.getEmail(), user.getPassword());

          res.status(200).json(new Success(200, new UserResponse(user, token)));
        } else {
          res.status(422).json(new Error(422, 'The password is incorrect'));
        }
      }
    }
  }
}
