/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';

import properties from '../config/properties';
import Error from '../models/ErrorModel';
import UserService from '../services/UserService';
import ApiError from '../helpers/ErrorClass';

export default class TokenUtility {
  static generateToken(id) {
    return jwt.sign({ userId: id },
      properties.secret_key,
      { expiresIn: '24h' });
  }

  static checkToken(req, res, next) {
    try {
      let token = req.headers.authorization;
      let TokenUser = null;
      if (token) {
        if (token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        jwt.verify(token, properties.secret_key, (err, decoded) => {
          if (err) {
            throw new ApiError(401, `Token Error: ${err.message}`);
          }

          TokenUser = UserService.findUserById(decoded.userId);
          req.body.TokenUser = TokenUser;
          next();
        });
      } else {
        throw new ApiError(401, 'Authorization token is empty. Please provide a valid token');
      }
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }
}
