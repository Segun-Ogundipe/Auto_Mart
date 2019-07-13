/* eslint-disable class-methods-use-this */
import { client } from 'kickbox';

import ApiError from '../helpers/ErrorClass';
import Response from '../models/ResponseModel';
import UserService from '../services/UserService';

const kickbox = client(process.env.API_KEY).kickbox();

export default class UserMiddleware {
  static validateSignup(req, res, next) {
    try {
      const {
        email, first_name, last_name,
        gender, password, address, is_admin,
      } = req.body;
      // const nameRegEx = /^([A-Z][a-z]{2,})$/;
      // const addressRegEx = /^[ \w]{3,}([A-Za-z]\.)?[ \w]{3,},\x20[A-Za-z]{2,}$/;

      if (email === undefined) {
        throw new ApiError(400, 'email field is required');
      }

      if (typeof email !== 'string') {
        throw new ApiError(400, 'email must be a string');
      }

      if (first_name === undefined) {
        throw new ApiError(400, 'first_name field is required');
      }

      if (typeof first_name !== 'string') {
        throw new ApiError(400, 'first_name must be a string');
      }

      // if (!nameRegEx.test(first_name)) {
      //   throw new ApiError(400, 'first_name must be in this format \'Firstname\'');
      // }

      if (last_name === undefined) {
        throw new ApiError(400, 'last_name field is required');
      }

      if (typeof last_name !== 'string') {
        throw new ApiError(400, 'last_name must be a string');
      }

      // if (!nameRegEx.test(last_name)) {
      //   throw new ApiError(400, 'last_name must be in this format \'Lastname\'');
      // }

      // if (gender !== undefined && typeof gender !== 'string') {
      //   throw new ApiError(400, 'gender must be a string');
      // }

      // if (gender !== undefined && gender !== 'male' && gender !== 'female') {
      //   throw new ApiError(400, 'gender value can either be male or female');
      // }

      if (password === undefined) {
        throw new ApiError(400, 'password field is required');
      }

      if (typeof password !== 'string') {
        throw new ApiError(400, 'password must be a string');
      }

      if (address === undefined) {
        throw new ApiError(400, 'address field is required');
      }

      if (typeof address !== 'string') {
        throw new ApiError(400, 'address must be a string');
      }

      // if (!addressRegEx.test(address)) {
      //   throw new ApiError(400, 'address should be in this format \'123 Some Street. Agege Lagos, Nigeria\', \'12 Some Street off Some Street. Ikeja Lagos, NG\'');
      // }

      if (is_admin !== undefined && typeof is_admin !== 'boolean') {
        throw new ApiError(400, 'is_admin must be a boolean');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
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
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static verifyEmail(req, res, next) {
    try {
      kickbox.verify(req.body.email, (err, response) => {
        try {
          if (response.body.result !== 'deliverable') {
            throw new ApiError(400, `Mails to ${req.body.email} won't deliver. Please check your email or use another one`);
          }
          next();
        } catch (error) {
          res.status(error.status || 500)
            .json(new Response(false, error.status || 500, error.message));
        }
      });
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static validatePassword(req, res, next) {
    try {
      const re = /^([a-zA-Z0-9@*#]{8,15})$/;
      if (!re.test(req.body.password)) {
        throw new ApiError(400, 'The password is not valid. password may include alphanumeric characters and must consists of at least 8 characters and not more than 15 characters');
      }

      if (req.body.new_password !== undefined) {
        if (!re.test(req.body.new_password)) {
          throw new ApiError(400, 'The password is not valid. new_password may include alphanumeric characters and must consists of at least 8 characters and not more than 15 characters');
        }
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
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
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static validateLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (email === undefined) {
        throw new ApiError(400, 'email field is required');
      }

      if (typeof email !== 'string') {
        throw new ApiError(400, 'email must be a string');
      }

      if (password === undefined) {
        throw new ApiError(400, 'password field is required');
      }

      if (typeof password !== 'string') {
        throw new ApiError(400, 'password must be a string');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async validateUpdateEmail(req, res, next) {
    try {
      const { email } = req.params;
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!re.test(email)) {
        throw new ApiError(400, `The email: ${email} is not valid`);
      }

      const user = await UserService.findUserByEmail(email);

      if (user.length < 1) {
        throw new ApiError(404, `User with email:${email} does not exist`);
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async validatePasswordChange(req, res, next) {
    try {
      const { password, new_password, TokenUser } = req.body;

      if (password === undefined) {
        throw new ApiError(400, 'password field is required');
      }

      if (typeof password !== 'string') {
        throw new ApiError(400, 'password must be a string');
      }

      if (new_password === undefined) {
        throw new ApiError(400, 'new_password field is required');
      }

      if (typeof new_password !== 'string') {
        throw new ApiError(400, 'new_password must be a string');
      }

      if (TokenUser.email !== req.params.email) {
        throw new ApiError(401, 'Logged in user does not match with the email provided');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }
}
