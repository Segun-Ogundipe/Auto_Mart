/* eslint-disable class-methods-use-this */
import validators from '../helpers/validators';
import Error from '../models/error';
import OrderQueries from '../queries/orderQueries';
import UserQueries from '../queries/userqueries';
import CarQueries from '../queries/carQueries';
import Success from '../models/success';
import OrderResponse from '../models/orderResponse';

const OrderQuery = new OrderQueries();
const UserQuery = new UserQueries();
const CarQuery = new CarQueries();

export default class OrderController {
  create(req, res) {
    const { body } = req;
    let Order = null;
    let Buyer = null;
    let Car = null;

    if (!validators.isValidOrder(body)) {
      res.status(400).json(new Error(400, 'The request body is malformed'));
    } else {
      Buyer = UserQuery.findUserById(body.buyer);
      Car = CarQuery.findCarById(body.carId);
      if (Buyer === null) {
        res.status(404).json(new Error(404, `Buyer with id: ${body.buyer} does not exist`));
      } else if (Car === null) {
        res.status(404).json(new Error(404, `Car with id: ${body.carId} does not exist`));
      } else {
        Order = OrderQuery.createOrder(body);

        res.status(201).json(new Success(201, new OrderResponse(Order, Car)));
      }
    }
  }
}
