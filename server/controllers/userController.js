/* eslint-disable class-methods-use-this */
// import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validators from '../helpers/validators';
import userqueries from '../queries/userqueries';
import User from '../models/userModel';
import helper from '../helpers/helper';
import users from '../db/userdp';

export default class UserController {
  create(req, res) {
    const { body } = req;
    let user = null;
    if (!validators.isValidUser(body)) {
      res.status(400).json({ status: 400, message: 'The request body is malformed' });
    } else if (!validators.isValidEmail(body.email)) {
      res.status(400).json({ status: 400, message: `The email: ${body.email} is not valid` });
    } else if (!validators.isValidPassword(body.password)) {
      res.status(400).json({ status: 400, message: 'The password is too short' });
    } else if (userqueries.findUserByEmail(body.email) === null) {
      res.status(400).json({ status: 400, message: `User with email: ${body.email} already exist` });
    } else {
      user = new User();
      user.setId(helper.getNewId(users));
      user.setEmail(body.email);
      user.setFirstName(body.first_name);
      user.setLastName(body.last_name);
      user.setGender(body.gender);
      user.setPassword(bcrypt.hashSync(body.password, bcrypt.genSaltSync(10)));
      user.setIsAdmin(body.is_admin);

      users.push(user);

      res.status(201).json({ status: 201, data: user });
    }
  }
}
