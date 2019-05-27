import { hashSync, genSaltSync } from 'bcrypt';
import User from '../models/userModel';
import helper from '../helpers/helper';

/* eslint-disable class-methods-use-this */
export default class Queries {
  checkUserExist(users, email) {
    users.some((value) => {
      if (value.email === email) {
        return true;
      }
      return false;
    });
  }

  createUser(body, users) {
    const user = new User();

    user.setId(helper.getNewId(users));
    user.setEmail(body.email);
    user.setFirstName(body.first_name);
    user.setLastName(body.last_name);
    user.setGender(body.gender);
    user.setPassword(hashSync(body.password, genSaltSync(10)));
    user.setAddress(body.address);
    user.setIsAdmin(body.is_admin);

    users.push(user);

    return user;
  }
}
