/* eslint-disable class-methods-use-this */
import CarResponse from '../models/CarResponse';
import CarService from '../services/CarService';
import Error from '../models/ErrorModel';
import Success from '../models/SuccessModel';
import UserService from '../services/UserService';
import ApiError from '../helpers/ErrorClass';

export default class CarController {
  static async create(req, res) {
    try {
      const { body } = req;
      const { User } = body;
      const Car = await CarService.createCar(body);

      res.status(201).json(new Success(201, new CarResponse(false, Car, User)));
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static async updatePrice(req, res) {
    try {
      const { carId } = req.params;
      const { body } = req;
      const { User, price } = body;

      const Car = await CarService.updateCar(carId, { carPrice: price });

      res.status(200).json(new Success(200, new CarResponse(true, Car, User)));
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static async updateStatus(req, res) {
    try {
      const { body } = req;
      let { Car } = body;
      const { User, status, orderId } = body;

      if (Car.status === 'sold') {
        throw new ApiError(400, 'Car has already been sold');
      }

      Car = await CarService.updateCar(Car.id, { carStatus: status, acceptedOrderId: orderId });

      res.status(200).json(new Success(200, new CarResponse(true, Car, User)));
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static async getCar(req, res) {
    try {
      const { carId } = req.params;

      const Car = await CarService.findCarById(carId);

      if (Car.length < 1) {
        throw new ApiError(404, `Car with id: ${carId} does not exist`);
      }

      const User = await UserService.findUserById(Car[0].userId);

      if (User.length < 1) {
        throw new ApiError(404, `User with id: ${Car[0].userId} does not exist`);
      }

      res.status(200).json(new Success(200, new CarResponse(true, Car[0], User[0])));
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static async getCarsByStatus(req, res) {
    try {
      const {
        status, minPrice, maxPrice,
        state, manufacturer,
      } = req.query;
      let availableCars = [];

      if (status !== undefined) {
        if (minPrice === undefined && maxPrice === undefined
          && state === undefined && manufacturer === undefined) {
          availableCars = await CarService.findByStatus(status, {});
        } else if (minPrice !== undefined && maxPrice !== undefined
          && state === undefined && manufacturer === undefined) {
          availableCars = await CarService.findByStatus(status, { min: minPrice, max: maxPrice });
        } else if (minPrice === undefined && maxPrice === undefined
          && state !== undefined && manufacturer === undefined) {
          availableCars = await CarService.findByStatus(status, { state });
        } else if (minPrice !== undefined && maxPrice === undefined
          && state === undefined && manufacturer === undefined) {
          availableCars = await CarService.findByStatus(status, { min: minPrice });
        } else if (minPrice === undefined && maxPrice !== undefined
          && state === undefined && manufacturer === undefined) {
          availableCars = await CarService.findByStatus(status, { max: maxPrice });
        } else if (minPrice !== undefined && maxPrice !== undefined
          && state !== undefined && manufacturer === undefined) {
          availableCars = await CarService.findByStatus(status,
            { min: minPrice, max: maxPrice, state });
        } else if (minPrice !== undefined && maxPrice === undefined
          && state !== undefined && manufacturer === undefined) {
          availableCars = await CarService.findByStatus(status, { min: minPrice, state });
        } else if (minPrice === undefined && maxPrice !== undefined
          && state !== undefined && manufacturer === undefined) {
          availableCars = await CarService.findByStatus(status, { max: maxPrice, state });
        } else if (minPrice === undefined && maxPrice === undefined
          && state === undefined && manufacturer !== undefined) {
          availableCars = await CarService.findByStatus(status, { manufacturer });
        }
      }

      if (availableCars.length < 1) {
        throw new ApiError(404, 'No car matches your search parameter[s]');
      }

      res.status(200).json(new Success(200,
        await CarResponse.setResponseFromCarArray(availableCars)));
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static async delete(req, res) {
    try {
      const { carId } = req.params;
      const car = await CarService.findCarById(carId);

      if (car.length < 1) {
        throw new ApiError(404, `Car with id: ${carId} does not exist`);
      }

      CarService.deleteCar(carId);

      res.status(204).send();
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static async getAll(req, res) {
    try {
      const carsArray = await CarService.findAll();

      if (carsArray.length < 1) {
        res.status(200).json(new Success(200, 'There are no sold or available cars'));
      } else {
        res.status(200).json(new Success(200,
          await CarResponse.setResponseFromCarArray(carsArray)));
      }
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }
}
