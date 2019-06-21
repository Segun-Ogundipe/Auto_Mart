import Error from '../models/ErrorModel';
import ApiError from '../helpers/ErrorClass';
import CarService from '../services/CarService';

export default class FlagMiddleware {
  static async validateFlag(req, res, next) {
    try {
      const { carId, reason, description } = req.body;
      const Car = await CarService.findCarById(carId);

      if (carId === undefined) {
        throw new ApiError(400, 'carId field is required');
      } else if (typeof carId !== 'number') {
        throw new ApiError(400, 'carId must be a number');
      } else if (Car.length < 1) {
        throw new ApiError(404, `Car with carId: ${carId} does not exist`);
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
