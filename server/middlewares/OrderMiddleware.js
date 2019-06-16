import ApiError from '../helpers/ErrorClass';
import Error from '../models/ErrorModel';
import OrderService from '../services/OrderService';

export default class OrderMiddleware {
  static validateCreate(req, res, next) {
    try {
      const { buyer, carId, amount } = req.body;
      if (req.body === undefined) {
        throw new ApiError(400, 'body is required');
      } else if (buyer === undefined) {
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
      }

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

  static validateBuyer(req, res, next) {
    try {
      const { orderId } = req.params;
      const { TokenUser } = req.body;
      const Order = OrderService.findOrderById(orderId);

      if (Order === null) {
        throw new ApiError(404, `Order with id: ${orderId} does not exist`);
      }

      if (TokenUser.id !== Order.buyer) {
        throw new ApiError(401, 'Buyer is not a match with the logged in User');
      }

      if (Order.status !== 'pending') {
        throw new ApiError(400, `Order with id: ${orderId} has either been accepted or rejected, The price cannot be updated`);
      }

      req.body.Order = Order;

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }
}
