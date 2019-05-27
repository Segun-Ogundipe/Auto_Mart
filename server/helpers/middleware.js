/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import properties from '../config';

export default class TokenUtility {
  generateToken(email, password) {
    return jwt.sign({ email, password },
      properties.secrete_key,
      { expiresIn: '24h' });
  }
}
