import ApiError from '../helpers/ErrorClass';
import UserService from '../services/UserService';
import CarService from '../services/CarService';
import OrderService from '../services/OrderService';
import Response from '../models/ResponseModel';

export default class CarMiddleware {
  static validateCreate(req, res, next) {
    try {
      const {
        owner, state, price,
        manufacturer, model,
        body_type,
      } = req.body;
      if (owner === undefined) {
        throw new ApiError(400, 'owner field is required');
      }

      if (typeof owner !== 'number') {
        throw new ApiError(400, 'owner must be a number');
      }

      if (state === undefined) {
        throw new ApiError(400, 'state field is required');
      }

      if (typeof state !== 'string') {
        throw new ApiError(400, 'state must be a string');
      }

      if (state !== 'new' && state !== 'used') {
        throw new ApiError(400, 'state must either be new or used');
      }

      if (price === undefined) {
        throw new ApiError(400, 'price field is required');
      }

      if (typeof price !== 'number') {
        throw new ApiError(400, 'price must be a number');
      }

      if (manufacturer === undefined) {
        throw new ApiError(400, 'manufacturer field is required');
      }

      if (typeof manufacturer !== 'string') {
        throw new ApiError(400, 'manufacturer must be a string');
      }

      if (model === undefined) {
        throw new ApiError(400, 'model field is required');
      }

      if (typeof model !== 'string') {
        throw new ApiError(400, 'model must be a string');
      }

      if (body_type === undefined) {
        throw new ApiError(400, 'body_type field is required');
      }

      if (typeof body_type !== 'string') {
        throw new ApiError(400, 'body_type must be a string');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static validateParam(req, res, next) {
    try {
      const number = /^[0-9]+$/;

      if (!number.test(req.params.car_id)) {
        throw new ApiError(400, 'car_id must be a number');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async validateCarUpdate(req, res, next) {
    try {
      const { car_id } = req.params;
      const Car = await CarService.findCarById(car_id);

      if (Car.length < 1) {
        throw new ApiError(404, `Car with id: ${car_id} does not exist`);
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
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
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
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
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
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static validatePriceUpdate(req, res, next) {
    try {
      const { price } = req.body;

      if (price === undefined) {
        throw new ApiError(400, 'price field is required');
      }

      if (typeof price !== 'number') {
        throw new ApiError(400, 'price must be a number');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async validateStatusUpdate(req, res, next) {
    try {
      const { status, order_id } = req.body;

      if (status === undefined) {
        throw new ApiError(400, 'status field is required');
      }

      if (typeof status !== 'string') {
        throw new ApiError(400, 'status must be a string');
      }

      if (status !== 'sold') {
        throw new ApiError(400, 'status must be \'sold\'');
      }

      if (order_id === undefined) {
        throw new ApiError(400, 'order_id field is required');
      }

      if (typeof order_id !== 'number') {
        throw new ApiError(400, 'order_id must be a number');
      }
      
      const order = await OrderService.findOrderById(order_id);
      const carId = parseInt(req.params.car_id, 10);
      
      if (order.length < 1) {
        throw new ApiError(404, `Order with id: ${order_id} does not exist`);
      }

      if (order[0].carId !== carId) {
        throw new ApiError(400, 'The accepted order was not made for this car');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static validateStatus(req, res, next) {
    try {
      const { status, min_price, max_price, state } = req.query;
      const number = /^[0-9]+$/;

      if (status === undefined) {
        throw new ApiError(400, 'Query param status is required');
      }

      if (status !== 'available') {
        throw new ApiError(400, 'status must be \'available\'');
      }

      if (min_price !== undefined && !number.test(min_price)) {
        throw new ApiError(400, 'min_price must be a number');
      }

      if (max_price !== undefined && !number.test(max_price)) {
        throw new ApiError(400, 'max_price must be a number');
      }

      if (state !== undefined && (state !== 'new' && state !== 'used')) {
        throw new ApiError(400, 'state must either be \'new\' or \'used\'');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }
}
