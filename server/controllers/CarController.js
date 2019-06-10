/* eslint-disable class-methods-use-this */
import CarResponse from '../models/CarResponse';
import CarService from '../services/CarService';
import Error from '../models/ErrorModel';
import Success from '../models/SuccessModel';
import UserService from '../services/UserService';
import ApiError from '../helpers/ErrorClass';

export default class CarController {
  static create(req, res) {
    try {
      const { body } = req;
      let Car = null;
      const { User } = body;

      Car = CarService.createCar(body);

      res.status(201).json(new Success(201, new CarResponse(Car, User)));
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static updatePrice(req, res) {
    try {
      const { carId } = req.params;
      const { body } = req;
      let { Car } = body;
      const { User } = body;

      Car = CarService.updateCar(carId, { price: body.price });

      res.status(200).json(new Success(200, new CarResponse(Car, User)));
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static updateStatus(req, res) {
    try {
      const { carId } = req.params;
      const { body } = req;
      let { Car } = body;
      const { User } = body;

      Car = CarService.updateCar(carId, { status: body.status });

      res.status(200).json(new Success(200, new CarResponse(Car, User)));
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static getCar(req, res) {
    try {
      const id = req.params.carId;

      const Car = CarService.findCarById(id);
      let User = null;

      if (Car === null) {
        throw new ApiError(404, `Car with id: ${id} does not exist`);
      }

      User = UserService.findUserById(Car.owner);

      if (User === null) {
        throw new ApiError(404, `User with id: ${Car.owner} does not exist`);
      }

      res.status(200).json(new Success(200, new CarResponse(Car, User)));
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static getCarsByStatus(req, res) {
    try {
      const { status, minPrice, maxPrice } = req.query;

      let availableCars = [];

      if (status && !minPrice && !maxPrice) {
        availableCars = CarService.findByStatus(status);
      }

      if (status && minPrice && maxPrice) {
        availableCars = CarService.findByStatusAndPriceRange(status, minPrice, maxPrice);
      }

      if (availableCars.length === 0) {
        res.status(200).json(new Success(200, 'No car matches your search parameter[s]'));
      } else {
        res.status(200).json(new Success(200, availableCars));
      }
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static delete(req, res) {
    try {
      const { carId } = req.params;

      CarService.deleteCar(carId);

      res.status(200).json(new Success(200, 'Car AD successfully deleted'));
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static getAll(req, res) {
    try {
      const carsArray = CarService.findAll();

      if (carsArray.length === 0) {
        res.status(200).json(new Success(200, 'There are no sold or available cars'));
      } else {
        res.status(200).json(new Success(200, carsArray));
      }
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }
}
