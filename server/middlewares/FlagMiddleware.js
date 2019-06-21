import Error from '../models/ErrorModel';
import ApiError from '../helpers/ErrorClass';

export default class FlagMiddleware {
  static validateFlag(req, res, next) {
    try {
      const { carId, reason, description } = req.body;

      if (carId === undefined) {
        throw new ApiError(400, 'carId field is required');
      } else if (typeof carId !== 'number') {
        throw new ApiError(400, 'carId must be a number');
      } else if (reason === undefined) {
        throw new ApiError(400, 'reason field is required');
      } else if (typeof reason !== 'string') {
        throw new ApiError(400, 'reason must be a strimg');
      } else if (description === undefined) {
        throw new ApiError(400, 'description field is required');
      } else if (typeof description !== 'string') {
        throw new ApiError(400, 'description must be a strimg');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }
}
