import ApiError from '../helpers/ErrorClass';
import users from '../db/userdb';
import Error from '../models/ErrorModel';

export default class UserMiddleware {
  static validateSignup(req, res, next) {
    try {
      if (!req.body) {
        throw new ApiError(400, 'body is required');
      } else if (!req.body.email) {
        throw new ApiError(400, 'email is required');
      } else if (!req.body.firstName) {
        throw new ApiError(400, 'firstName is required');
      } else if (!req.body.lastName) {
        throw new ApiError(400, 'lastName is required');
      } else if (!req.body.gender) {
        throw new ApiError(400, 'gender is required');
      } else if (!req.body.password) {
        throw new ApiError(400, 'password is required');
      } else if (!req.body.address) {
        throw new ApiError(400, 'address is required');
      } else if (!req.body.isAdmin) {
        throw new ApiError(400, 'isAdmin is required');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static validateEmail(req, res, next) {
    try {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

  static validateUser(req, res, next) {
    try {
      if (users.some(value => value.email === req.body.email)) {
        throw new ApiError(409, `User with email: ${req.body.email} already exist`);
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static validateLogin(req, res, next) {
    try {
      if (!req.body) {
        throw new ApiError(400, 'body is required');
      } else if (!req.body.email) {
        throw new ApiError(400, 'email is required');
      } else if (!req.body.password) {
        throw new ApiError(400, 'password is required');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }
}
