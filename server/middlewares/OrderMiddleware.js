import ApiError from '../helpers/ErrorClass';
import Response from '../models/ResponseModel';
import OrderService from '../services/OrderService';
import CarService from '../services/CarService';

export default class OrderMiddleware {
  static async validateCreate(req, res, next) {
    try {
      const {
        car_id, amount, TokenUser
      } = req.body;
      if (car_id === undefined) {
        throw new ApiError(400, 'car_id field is required');
      }

      if (typeof car_id !== 'number') {
        throw new ApiError(400, 'car_id must be a number');
      }

      if (amount === undefined) {
        throw new ApiError(400, 'amount field is required');
      }

      if (typeof amount !== 'number') {
        throw new ApiError(400, 'amount must be a number');
      }

      const car = await CarService.findCarById(car_id);

      if (car.length < 1) {
        throw new ApiError(404, `Car with id: ${car_id} does not exist`);
      }

      // if (TokenUser.id === car[0].userId) {
      //   throw new ApiError(400, 'Logged in user can\'t make a purchase order for his/her own AD');
      // }

      req.body.Car = car[0];
      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static validateUpdate(req, res, next) {
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
      console.log(error.message);
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async validateBuyer(req, res, next) {
    try {
      const id = req.params.order_id;
      const { TokenUser } = req.body;
      const number = /^[0-9]+$/;

      if (!number.test(id)) {
        throw new ApiError(400, 'order_id must be a number');
      }
      const Order = await OrderService.findOrderById(id);

      if (Order.length < 1) {
        throw new ApiError(404, `Order with id: ${id} does not exist`);
      }

      if (TokenUser.id !== Order[0].userId) {
        throw new ApiError(401, 'Buyer is not a match with the logged in User');
      }

      if (Order[0].status !== 'pending') {
        throw new ApiError(400, `Order with id: ${id} has either been accepted or rejected, The price cannot be updated`);
      }

      req.body.Order = Order[0];

      next();
    } catch (error) {
      console.log(error.message)
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }
}
