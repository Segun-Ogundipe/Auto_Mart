/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import properties from '../config/properties';

export default class TokenUtility {
  generateToken(email, password) {
    return jwt.sign({ email, password },
      properties.secret_key,
      { expiresIn: '24h' });
  }

  checkToken(token) {
    jwt.verify(token, properties.secret_key, (err, decoded) => {
      if (err) {
        return err;
      }
      return decoded;
    });
  }
}
