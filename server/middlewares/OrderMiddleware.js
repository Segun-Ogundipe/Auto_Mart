import ApiError from '../helpers/ErrorClass';
import Error from '../models/ErrorModel';
import OrderService from '../services/OrderService';
import CarService from '../services/CarService';

export default class OrderMiddleware {
  static async validateCreate(req, res, next) {
    try {
      const { buyer, carId, amount, TokenUser } = req.body;
      const car = await CarService.findCarById(carId);

      if (buyer === undefined) {
        throw new ApiError(400, 'buyer field is required');
      } else if (typeof buyer !== 'number') {
        throw new ApiError(400, 'buyer must be a number');
      } else if (carId === undefined) {
        throw new ApiError(400, 'carId field is required');
      } else if (typeof carId !== 'number') {
        throw new ApiError(400, 'carId must be a number');
      } else if (amount === undefined) {
        throw new ApiError(400, 'amount field is required');
      } else if (typeof amount !== 'number') {
        throw new ApiError(400, 'amount must be a number');
      } else if (car.length < 1) {
        throw new ApiError(404, `Car with id: ${carId} does not exist`);
      } else if (TokenUser.id !== buyer) {
        throw new ApiError(400, 'Logged in user must be the buyer');
      } else if (TokenUser.id === car[0].userId) {
        throw new ApiError(400, 'Logged in user can\'t make a purhase order for his/her own AD');
      }

      req.body.Car = car[0];
      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static validateUpdate(req, res, next) {
    try {
      const { price } = req.body;

      if (price === undefined) {
        throw new ApiError(400, 'price field is required');
      } else if (typeof price !== 'number') {
        throw new ApiError(400, 'price must be a number');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static async validateBuyer(req, res, next) {
    try {
      const id = parseInt(req.params.orderId, 10);
      const { TokenUser } = req.body;

      if (isNaN(id)) {
        throw new ApiError(400, 'OrderId must be a number');
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
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }
}
