/* eslint-disable class-methods-use-this */
import validators from '../helpers/validators';
import Error from '../models/error';
import OrderQueries from '../queries/orderQueries';
import UserQueries from '../queries/userqueries';
import CarQueries from '../queries/carQueries';
import Success from '../models/success';
import OrderResponse from '../models/orderResponse';

const UserQuery = new UserQueries();

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
      Car = CarQueries.findCarById(body.carId);
      if (Buyer === null) {
        res.status(404).json(new Error(404, `Buyer with id: ${body.buyer} does not exist`));
      } else if (Car === null) {
        res.status(404).json(new Error(404, `Car with id: ${body.carId} does not exist`));
      } else {
        Order = OrderQueries.createOrder(body);

        res.status(201).json(new Success(201, new OrderResponse(false, Order, Car)));
      }
    }
  }

  updateOrder(req, res) {
    const id = req.params.orderId;
    const { body } = req;

    let Order = null;
    Order = OrderQueries.findOrderById(id);

    if (Order === null) {
      res.status(404).json(new Error(404, `Order with id: ${id} does not exist`));
    } else if (Order.getStatus() !== 'pending') {
      res.status(400).json(new Error(400, `Order with id: ${id} has either been accepted or rejected. The price can not be updated`));
    } else {
      const oldPrice = Order.getAmount();
      const Car = CarQueries.findCarById(Order.getCarId());
      Order = OrderQueries.updateOrder(id, body.price);
      res.status(200).json(new Success(200, new OrderResponse(true, Order, Car, oldPrice)));
    }
  }
}
