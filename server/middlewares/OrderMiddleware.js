import ApiError from '../helpers/ErrorClass';
import Error from '../models/ErrorModel';

export default class OrderMiddleware {
  static validateCreate(req, res, next) {
    try {
      if (!req.body) {
        throw new ApiError(400, 'body is required');
      } else if (!req.body.buyer) {
        throw new ApiError(400, 'buyer field is required');
      } else if (!req.body.carId) {
        throw new ApiError(400, 'carId field is required');
      } else if (!req.body.amount) {
        throw new ApiError(400, 'amount field is required');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }
}
