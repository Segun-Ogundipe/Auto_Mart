import ApiError from '../helpers/ErrorClass';
import Error from '../models/ErrorModel';
import UserService from '../services/UserService';
import CarService from '../services/CarService';

export default class CarMiddleware {
  static validateCreate(req, res, next) {
    try {
      const {
        owner, state, price,
        manufacturer, model,
        bodyType,
      } = req.body;
      if (req.body === undefined) {
        throw new ApiError(400, 'body is required');
      } else if (owner === undefined) {
        throw new ApiError(400, 'owner field is required');
      } else if (typeof owner !== 'number') {
        throw new ApiError(400, 'owner must be a number');
      } else if (state === undefined) {
        throw new ApiError(400, 'state field is required');
      } else if (typeof state !== 'string') {
        throw new ApiError(400, 'state must be a string');
      } else if (state !== 'new' && state !== 'used') {
        throw new ApiError(400, 'state must either be new or used');
      } else if (price === undefined) {
        throw new ApiError(400, 'price field is required');
      } else if (typeof price !== 'number') {
        throw new ApiError(400, 'price must be a number');
      } else if (manufacturer === undefined) {
        throw new ApiError(400, 'manufacturer field is required');
      } else if (typeof manufacturer !== 'string') {
        throw new ApiError(400, 'manufacturer must be a string');
      } else if (model === undefined) {
        throw new ApiError(400, 'model field is required');
      } else if (typeof model !== 'string') {
        throw new ApiError(400, 'model must be a string');
      } else if (bodyType === undefined) {
        throw new ApiError(400, 'bodyType field is required');
      } else if (typeof bodyType !== 'string') {
        throw new ApiError(400, 'bodyType must be a string');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static async validateCarUpdate(req, res, next) {
    try {
      const { carId } = req.params;
      const Car = await CarService.findCarById(carId);

      if (Car.length < 1) {
        throw new ApiError(404, `Car with id: ${carId} does not exist`);
      }

      const User = await UserService.findUserById(Car[0].userId);

      if (User.length < 1) {
        throw new ApiError(404, `User with id: ${Car[0].userId} does not exist`);
      }

      if (req.body.TokenUser.id !== User[0].id) {
        throw new ApiError(401, 'Logged in User is not a match with car owner');
      }

      req.body.Car = Car[0];
      req.body.User = User[0];

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static async validateOwner(req, res, next) {
    try {
      const { owner, TokenUser } = req.body;
      const user = await UserService.findUserById(owner);

      if (user.length < 1) {
        throw new ApiError(404, `User with id: ${owner} does not exist`);
      }

      if (TokenUser.id !== user[0].id) {
        throw new ApiError(401, 'Owner is not a match with the logged in User');
      }

      req.body.User = user[0];

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static validateAdmin(req, res, next) {
    try {
      const { TokenUser } = req.body;

      if (TokenUser.isAdmin !== true) {
        throw new ApiError(401, 'Logged in user is not an Admin');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static validatePriceUpdate(req, res, next) {
    try {
      const { price } = req.body;

      if (price === undefined) {
        throw new ApiError(400, 'price field can\'t be empty');
      } else if (typeof price !== 'number') {
        throw new ApiError(400, 'price must be a number');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static validateStatusUpdate(req, res, next) {
    try {
      const { status } = req.body;

      if (status === undefined) {
        throw new ApiError(400, 'status field can\'t be empty');
      } else if (typeof status !== 'string') {
        throw new ApiError(400, 'status must be a string');
      } else if (status !== 'sold') {
        throw new ApiError(400, 'status must be \'sold\'');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }
}
