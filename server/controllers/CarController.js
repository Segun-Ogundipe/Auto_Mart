/* eslint-disable class-methods-use-this */
import CarResponse from '../models/CarResponse';
import CarService from '../services/CarService';
import Response from '../models/ResponseModel';
import UserService from '../services/UserService';
import ApiError from '../helpers/ErrorClass';

export default class CarController {
  static async create(req, res) {
    try {
      const { body } = req;
      const { TokenUser } = body;

      const Car = await CarService.createCar(body);

      res.status(201).json(new Response(true, 201, new CarResponse(false, Car, TokenUser)));
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async updatePrice(req, res) {
    try {
      const { car_id } = req.params;
      const { body } = req;
      const { TokenUser, price } = body;

      const Car = await CarService.updateCar(false, car_id, { carPrice: price });

      res.status(200).json(new Response(true, 200, new CarResponse(true, Car, TokenUser)));
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async updateStatus(req, res) {
    try {
      const { body } = req;
      let { Car } = body;
      const { TokenUser, status, order_id } = body;

      if (Car.status === 'sold') {
        throw new ApiError(400, 'Car has already been sold');
      }

      Car = await CarService.updateCar(true, Car.id, { carStatus: status, acceptedOrderId: order_id });

      res.status(200).json(new Response(true, 200, new CarResponse(true, Car, TokenUser)));
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async getCar(req, res) {
    try {
      const { car_id } = req.params;

      const Car = await CarService.findCarById(car_id);

      if (Car.length < 1) {
        throw new ApiError(404, `Car with id: ${car_id} does not exist`);
      }

      const User = await UserService.findUserById(Car[0].userId);

      if (User.length < 1) {
        throw new ApiError(404, `User with id: ${Car[0].userId} does not exist`);
      }

      res.status(200).json(new Response(true, 200, new CarResponse(true, Car[0], User[0])));
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async getCarsByStatus(req, res) {
    try {
      const {
        status, min_price, max_price,
        state, manufacturer,
      } = req.query;
      let availableCars = [];

      if (status !== undefined) {
        if (min_price === undefined && max_price === undefined
          && state === undefined && manufacturer === undefined) {
          availableCars = await CarService.findByStatus(status, {});
        } else if (min_price !== undefined && max_price !== undefined
          && state === undefined && manufacturer === undefined) {
          availableCars = await CarService.findByStatus(status, { min: min_price, max: max_price });
        } else if (min_price === undefined && max_price === undefined
          && state !== undefined && manufacturer === undefined) {
          availableCars = await CarService.findByStatus(status, { state });
        } else if (min_price !== undefined && max_price === undefined
          && state === undefined && manufacturer === undefined) {
          availableCars = await CarService.findByStatus(status, { min: min_price });
        } else if (min_price === undefined && max_price !== undefined
          && state === undefined && manufacturer === undefined) {
          availableCars = await CarService.findByStatus(status, { max: max_price });
        } else if (min_price !== undefined && max_price !== undefined
          && state !== undefined && manufacturer === undefined) {
          availableCars = await CarService.findByStatus(status,
            { min: min_price, max: max_price, state });
        } else if (min_price !== undefined && max_price === undefined
          && state !== undefined && manufacturer === undefined) {
          availableCars = await CarService.findByStatus(status, { min: min_price, state });
        } else if (min_price === undefined && max_price !== undefined
          && state !== undefined && manufacturer === undefined) {
          availableCars = await CarService.findByStatus(status, { max: max_price, state });
        } else if (min_price === undefined && max_price === undefined
          && state === undefined && manufacturer !== undefined) {
          availableCars = await CarService.findByStatus(status, { manufacturer });
        }
      }

      if (availableCars.length < 1) {
        throw new ApiError(404, 'No car matches your search parameter[s]');
      }

      res.status(200).json(new Response(true, 200,
        await CarResponse.setResponseFromCarArray(availableCars)));
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async delete(req, res) {
    try {
      const { car_id } = req.params;
      const car = await CarService.findCarById(car_id);

      if (car.length < 1) {
        throw new ApiError(404, `Car with id: ${car_id} does not exist`);
      }

      CarService.deleteCar(car_id);

      res.status(204).send();
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async getAll(req, res, next) {
    try {

      if (req.body.TokenUser.isAdmin === true) {
        const carsArray = await CarService.findAll();

        if (carsArray.length < 1) {
          res.status(404).json(new Response(true, 404, 'There are no sold or available cars'));
        } else {
          res.status(200).json(new Response(true, 200,
            await CarResponse.setResponseFromCarArray(carsArray)));
        }
      } else {
        next();
      }
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }
}
