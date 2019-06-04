/* eslint-disable class-methods-use-this */
import CarQueries from '../queries/carQueries';
import UserQueries from '../queries/userqueries';
import validators from '../helpers/validators';
import Error from '../models/error';
import cars from '../db/cardb';
import Success from '../models/success';
import CarResponse from '../models/carResponse'

const UserQuery = new UserQueries();

export default class CarController {
  static create(req, res) {
    const { body } = req;
    let Car = null;
    let User = null;

    if (!validators.isValidCar(body)) {
      res.status(400).json(new Error(400, 'The request body is malformed'));
    } else {
      User = UserQuery.findUserById(body.owner);
      if (User === null) {
        res.status(404).json(new Error(404, `User with id: ${body.owner} does not exist`));
      } else {
        Car = CarQueries.createCar(body, cars);
        res.status(201).json(new Success(201, new CarResponse(Car, User)));
      }
    }
  }

  static update(req, res) {
    const { carId } = req.params;
    const { body } = req;
    let Car = CarQueries.findCarById(carId);
    let User = null;

    if (Car === null) {
      res.status(404).json(new Error(404, `Car with id: ${carId} does not exist`));
    } else {
      User = UserQuery.findUserById(Car.getOwner());

      if (User === null) {
        res.status(404).json(new Error(404, `User with id: ${Car.getOwner()} does not exist`));
      } else {
        Car = CarQueries.updateCar(carId, body.status);

        res.status(200).json(new Success(200, new CarResponse(Car, User)));
      }
    }
  }
}
