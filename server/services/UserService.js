import { hashSync, genSaltSync } from 'bcrypt';

import User from '../models/UserModel';
import helper from '../helpers/helper';
import users from '../db/userdb';
import ApiError from '../helpers/ErrorClass';

/* eslint-disable class-methods-use-this */
export default class UserService {
  static createUser(body) {
    if (!body) {
      throw new ApiError(400, 'Body can\'t be empty');
    }

    const user = new User();

    user.id = helper.getNewId(users);
    user.email = body.email;
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.gender = body.gender;
    user.password = hashSync(body.password, genSaltSync(10));
    user.address = body.address;
    user.isAdmin = body.isAdmin;

    users.push(user);

    return user;
  }

  static findUserByEmail(email) {
    if (!email) {
      throw new ApiError(400, 'Please provide a valid email');
    }

    let user = null;

    users.forEach((value) => {
      if (value.email === email) {
        user = value;
      }
    });

    return user;
  }

  static findUserById(id) {
    let user = null;

    users.forEach((value) => {
      if (value.id === parseInt(id, 10)) {
        user = value;
      }
    });

    return user;
  }
}
