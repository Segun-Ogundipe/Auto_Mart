/* eslint-disable class-methods-use-this */
import { compareSync } from 'bcrypt';

import Response from '../models/ResponseModel';
import UserResponse from '../models/UserResponse';
import Mail from '../models/MailModel';
import TokenGenerator from '../middlewares/TokenMiddleware';
import UserService from '../services/UserService';
import ApiError from '../helpers/ErrorClass';
import PasswordGenerator from '../helpers/PasswordGenerator';
import transporter from '../helpers/nodemailer';

export default class UserController {
  static async create(req, res) {
    try {
      const { body } = req;
      const user = await UserService.createUser(body);

      const token = TokenGenerator.generateToken(user[0].email, user[0].password);

      res.status(201).json(new Response(true, 201, new UserResponse(user[0], token)));
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async signin(req, res) {
    try {
      const { body } = req;
      const user = await UserService.findUserByEmail(body.email);

      if (user.length < 1) {
        throw new ApiError(404, 'The email is not associated with any user');
      }

      if (compareSync(body.password, user[0].password)) {
        const token = TokenGenerator.generateToken(user[0].email, user[0].password);

        res.status(200).json(new Response(true, 200, new UserResponse(user[0], token)));
      } else {
        res.status(401).json(new Response(false, 401, 'The password is incorrect'));
      }
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async updatePassword(req, res) {
    try {
      const { email } = req.params;
      const { password, new_password, TokenUser } = req.body;

      if (compareSync(password, TokenUser.password)) {
        await UserService.updatePassword(email, new_password);

        res.status(204).send();
      } else {
        res.status(401).json(new Response(false, 401, 'The password is incorrect'));
      }
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { email } = req.params;
      const { password, new_password } = req.body;

      if (password === undefined && new_password === undefined) {
        const generatedPassword = PasswordGenerator.generate();
        const mailOptions = new Mail(email, generatedPassword);

        await transporter.sendMail(mailOptions);
        await UserService.updatePassword(email, generatedPassword);
        
        res.status(204).send();
      } else {
        next();
      }
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }
}
