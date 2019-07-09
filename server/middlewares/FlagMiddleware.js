import Response from '../models/ResponseModel';
import ApiError from '../helpers/ErrorClass';
import CarService from '../services/CarService';

export default class FlagMiddleware {
  static async validateFlag(req, res, next) {
    try {
      const { car_id, reason, description } = req.body;

      if (car_id === undefined) {
        throw new ApiError(400, 'car_id field is required');
      }

      if (typeof car_id !== 'number') {
        throw new ApiError(400, 'car_id must be a number');
      }

      if (reason === undefined) {
        throw new ApiError(400, 'reason field is required');
      }

      if (typeof reason !== 'string') {
        throw new ApiError(400, 'reason must be a string');
      }

      if (description === undefined) {
        throw new ApiError(400, 'description field is required');
      }

      if (typeof description !== 'string') {
        throw new ApiError(400, 'description must be a string');
      }

      const Car = await CarService.findCarById(car_id);

      if (Car.length < 1) {
        throw new ApiError(404, `Car with id: ${car_id} does not exist`);
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }
}
