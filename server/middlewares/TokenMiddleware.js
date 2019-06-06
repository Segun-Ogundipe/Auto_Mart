/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';

import properties from '../config/properties';
import Error from '../models/ErrorModel';

export default class TokenUtility {
  static generateToken(email) {
    return jwt.sign({ email },
      properties.secret_key,
      { expiresIn: '24h' });
  }

  static checkToken(req, res, next) {
    try {
      let token = req.headers.authorization;
      if (token) {
        if (token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }

        jwt.verify(token, properties.secret_key, (err, decoded) => {
          if (err) {
            res.status(401).json(new Error(401, `Token Error: ${err.message}`));
          } else {
            next();
          }
        });
      } else {
        res.status(401).json(new Error(401, 'Authorization token is empty. Please provide a valid token'));
      }
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }
}
