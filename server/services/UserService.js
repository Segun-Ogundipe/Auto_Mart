import User from '../models/UserModel';
import users from '../db/userdb';
import ApiError from '../helpers/ErrorClass';
import pool from './index';

/* eslint-disable class-methods-use-this */
export default class UserService {
  static async createUser(body) {
    if (body === undefined) {
      throw new ApiError(400, 'Body can\'t be empty');
    }

    const query = 'INSERT INTO users(email, "firstName", "lastName", address, password, gender, "isAdmin", "registeredOn") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

    const UserData = new User();

    UserData.setUserWithBody(body);

    const user = await pool.query(query, UserData.getUserAsArray());

    return user;
  }

  static async findUserByEmail(email) {
    if (email === undefined) {
      throw new ApiError(400, 'Please provide a valid email');
    }
    const query = 'SELECT * FROM users WHERE email = $1';
    const user = await pool.query(query, [email]);

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
