import { hashSync, genSaltSync } from 'bcrypt';
import User from '../models/userModel';
import helper from '../helpers/helper';
import users from '../db/userdb';

/* eslint-disable class-methods-use-this */
export default class UserQueries {
  createUser(body) {
    const user = new User();

    user.setId(helper.getNewId(users));
    user.setEmail(body.email);
    user.setFirstName(body.firstName);
    user.setLastName(body.lastName);
    user.setGender(body.gender);
    user.setPassword(hashSync(body.password, genSaltSync(10)));
    user.setAddress(body.address);
    user.setIsAdmin(body.isAdmin);

    users.push(user);

    return user;
  }

  findUserByEmail(email) {
    let user = null;
    for (let i = 0; i < users.length; i += 1) {
      if (user[i] !== null && users[i] !== undefined) {
        if (users[i].getEmail() === email) {
          user = users[i];
          break;
        }
      }
    }
    return user;
  }

  findUserById(id) {
    let user = null;
    for (let i = 0; i < users.length; i += 1) {
      // if (user[i].getId() !== null && users[i] !== undefined) {
      if (users[i].getId() === id) {
        user = users[i];
        break;
      }
      // }
    }
    return user;
  }
}
