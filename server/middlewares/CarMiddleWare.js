import ApiError from '../helpers/ErrorClass';
import Error from '../models/ErrorModel';

export default class CarMiddleware {
  static validateCreate(req, res, next) {
    try {
      if (!req.body) {
        throw new ApiError(400, 'body is required');
      } else if (!req.body.owner) {
        throw new ApiError(400, 'owner field is required');
      } else if (!req.body.state) {
        throw new ApiError(400, 'state field is required');
      } else if (!req.body.price) {
        throw new ApiError(400, 'price field is required');
      } else if (!req.body.manufacturer) {
        throw new ApiError(400, 'manufacturer field is required');
      } else if (!req.body.model) {
        throw new ApiError(400, 'model field is required');
      } else if (!req.body.bodyType) {
        throw new ApiError(400, 'bodyType field is required');
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }
}
