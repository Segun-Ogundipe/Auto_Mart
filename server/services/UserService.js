import { hashSync, genSaltSync } from 'bcrypt';

import User from '../models/UserModel';
import ApiError from '../helpers/ErrorClass';
import pool from './index';

/* eslint-disable class-methods-use-this */
export default class UserService {
  static async createUser(body) {
    if (body === undefined) {
      throw new ApiError(400, 'Body can\'t be empty');
    }

    const query = 'INSERT INTO users(email, "firstName", "lastName", street, password, gender, "isAdmin", "registeredOn", city, state, country, phone, zip) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *';

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

  static async findUserById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const user = await pool.query(query, [id]);

    return user;
  }

  static updatePassword(email, newPassword) {
    const query = 'UPDATE users SET password=$1 WHERE email=$2';
    const password = hashSync(newPassword, genSaltSync(10));
    pool.query(query, [password, email]);
  }
}
