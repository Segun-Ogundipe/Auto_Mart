import ApiError from '../helpers/ErrorClass';
import Error from '../models/ErrorModel';

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
}
