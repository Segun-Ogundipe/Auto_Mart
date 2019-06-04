/* eslint-disable class-methods-use-this */
import CarQueries from '../queries/carQueries';
import UserQueries from '../queries/userqueries';
import validators from '../helpers/validators';
import Error from '../models/error';
import cars from '../db/cardb';
import Success from '../models/success';
import CarResponse from '../models/carResponse';

const Query = new CarQueries();
const UserQuery = new UserQueries();

export default class CarController {
  create(req, res) {
    const { body } = req;
    let Car = null;
    let User = null;

    if (!validators.isValidCar(body)) {
      res.status(400).json(new Error(400, 'The request body is malformed'));
    } else {
      User = UserQuery.findUserById(body.owner);
      if (User === null) {
        res.status(404).json(new Error(404, `The id: ${body.owner} is not associated with any user`));
      } else {
        Car = Query.createCar(body, cars);
        res.status(201).json(new Success(201, new CarResponse(Car, User)));
      }
    }
  }
}
