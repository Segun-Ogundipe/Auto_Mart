import ApiError from '../helpers/ErrorClass';
import Error from '../models/ErrorModel';
import UserService from '../services/UserService';

export default class UserMiddleware {
  static validateSignup(req, res, next) {
    try {
      const {
        email, firstName, lastName,
        gender, password, address, isAdmin,
      } = req.body;
      const nameRegEx = /^([A-Z][a-z]{2,})$/;
      const addressRegEx = /^[ \w]{3,}([A-Za-z]\.)?[ \w]{3,},\x20[A-Za-z]{2,}$/;

      if (req.body === undefined) {
        throw new ApiError(400, 'body is required');
      } else if (email === undefined) {
        throw new ApiError(400, 'email is required');
      } else if (typeof email !== 'string') {
        throw new ApiError(400, 'email must be a string');
      } else if (firstName === undefined) {
        throw new ApiError(400, 'firstName is required');
      } else if (typeof firstName !== 'string') {
        throw new ApiError(400, 'firstName must be a string');
      } else if (!nameRegEx.test(firstName)) {
        throw new ApiError(400, 'firstName must be in this format \'Firstname\'');
      } else if (lastName === undefined) {
        throw new ApiError(400, 'lastName is required');
      } else if (typeof lastName !== 'string') {
        throw new ApiError(400, 'lastName must be a string');
      } else if (!nameRegEx.test(lastName)) {
        throw new ApiError(400, 'lastName must be in this format \'Lastname\'');
      } else if (gender === undefined) {
        throw new ApiError(400, 'gender is required');
      } else if (typeof gender !== 'string') {
        throw new ApiError(400, 'gender must be a string');
      } else if (gender !== 'MALE' && gender !== 'FEMALE') {
        throw new ApiError(400, 'gender value can either be MALE or FEMALE');
      } else if (password === undefined) {
        throw new ApiError(400, 'password is required');
      } else if (typeof password !== 'string') {
        throw new ApiError(400, 'password must be a string');
      } else if (address === undefined) {
        throw new ApiError(400, 'address is required');
      } else if (typeof address !== 'string') {
        throw new ApiError(400, 'address must be a string');
      } else if (!addressRegEx.test(address)) {
        throw new ApiError(400, 'address should be in this format \'123 Some Street. Agege Lagos, Nigeria\', \'12 Some Street off Some Street. Ikeja Lagos, NG\'');
      } else if (isAdmin === undefined) {
        throw new ApiError(400, 'isAdmin is required');
      } else if (typeof isAdmin !== 'boolean') {
        throw new ApiError(400, 'isAdmin must be a boolean');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static validateEmail(req, res, next) {
    try {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(req.body.email)) {
        throw new ApiError(400, `The email: ${req.body.email} is not valid`);
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static validatePassword(req, res, next) {
    try {
      const re = /^([a-zA-Z0-9@*#]{8,15})$/;
      if (!re.test(req.body.password)) {
        throw new ApiError(400, 'The password is not valid. Password must include alphanumeric characters and must consists of at least 8 characters and not more than 15 characters');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static async validateUser(req, res, next) {
    try {
      const user = await UserService.findUserByEmail(req.body.email);
      if (user.length > 0) {
        throw new ApiError(409, `User with email: ${req.body.email} already exist`);
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static validateLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (req.body === undefined) {
        throw new ApiError(400, 'body is required');
      } else if (email === undefined) {
        throw new ApiError(400, 'email is required');
      } else if (typeof email !== 'string') {
        throw new ApiError(400, 'email must be a string');
      } else if (password === undefined) {
        throw new ApiError(400, 'password is required');
      } else if (typeof password !== 'string') {
        throw new ApiError(400, 'password must be a string');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static async validatePasswordChange(req, res, next) {
    try {
      const { password, newPassword } = req.body;

      if (password === undefined) {
        throw new ApiError(400, 'password field is required');
      } else if (typeof password !== 'string') {
        throw new ApiError(400, 'password must be a string');
      } else if (newPassword === undefined) {
        throw new ApiError(400, 'newPassword field is required');
      } else if (typeof newPassword !== 'string') {
        throw new ApiError(400, 'newPassword must be a string');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }
}
