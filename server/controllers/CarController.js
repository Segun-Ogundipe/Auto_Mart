/* eslint-disable class-methods-use-this */
import CarResponse from '../models/CarResponse';
import CarService from '../services/CarService';
import Error from '../models/ErrorModel';
import Success from '../models/SuccessModel';
import UserService from '../services/UserService';

export default class CarController {
  static create(req, res) {
    try {
      const { body } = req;
      let Car = null;
      let User = null;

      User = UserService.findUserById(body.owner);
      if (User === null) {
        res.status(404).json(new Error(404, `User with id: ${body.owner} does not exist`));
      } else {
        Car = CarService.createCar(body);
        res.status(201).json(new Success(201, new CarResponse(Car, User)));
      }
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static update(req, res) {
    try {
      const { carId } = req.params;
      const { body } = req;
      let Car = CarService.findCarById(carId);
      let User = null;

      if (Car === null) {
        res.status(404).json(new Error(404, `Car with id: ${carId} does not exist`));
      } else {
        User = UserService.findUserById(Car.owner);

        if (User === null) {
          res.status(404).json(new Error(404, `User with id: ${Car.owner} does not exist`));
        } else {
          if (body.status) {
            Car = CarService.updateCar(carId, { status: body.status });
          }

          if (body.price) {
            Car = CarService.updateCar(carId, { price: body.price });
          }
          res.status(200).json(new Success(200, new CarResponse(Car, User)));
        }
      }
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
        res.status(404).json(new Error(404, `Car with id: ${id} does not exist`));
      } else {
        User = UserService.findUserById(Car.owner);

        if (User === null) {
          res.status(404).json(new Error(404, `User with id: ${Car.owner} does not exist`));
        } else {
          res.status(200).json(new Success(200, new CarResponse(Car, User)));
        }
      }
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
      const success = CarService.deleteCar(carId);

      if (success) {
        res.status(200).json(new Success(200, 'Car AD successfully deleted'));
      } else {
        res.status(404).json(new Error(404, `Car with id: ${carId} does not exist`));
      }
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
