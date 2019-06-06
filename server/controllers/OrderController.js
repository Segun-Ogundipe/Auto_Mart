/* eslint-disable class-methods-use-this */
import Error from '../models/ErrorModel';
import OrderService from '../services/OrderService';
import UserService from '../services/UserService';
import CarService from '../services/CarService';
import Success from '../models/SuccessModel';
import OrderResponse from '../models/OrderResponse';

export default class OrderController {
  static create(req, res) {
    try {
      const { body } = req;
      let Order = null;
      const Buyer = UserService.findUserById(body.buyer);
      const Car = CarService.findCarById(body.carId);

      if (Buyer === null) {
        res.status(404).json(new Error(404, `Buyer with id: ${body.buyer} does not exist`));
      } else if (Car === null) {
        res.status(404).json(new Error(404, `Car with id: ${body.carId} does not exist`));
      } else {
        Order = OrderService.createOrder(body);

        res.status(201).json(new Success(201, new OrderResponse(false, Order, Car)));
      }
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static updateOrder(req, res) {
    const id = req.params.orderId;
    const { body } = req;

    let Order = null;
    Order = OrderService.findOrderById(id);

    if (Order === null) {
      res.status(404).json(new Error(404, `Order with id: ${id} does not exist`));
    } else if (Order.status !== 'pending') {
      res.status(400).json(new Error(400, `Order with id: ${id} has either been accepted or rejected. The price can not be updated`));
    } else {
      const oldPrice = Order.amount;
      const Car = CarService.findCarById(Order.carId);
      Order = OrderService.updateOrder(id, body.price);
      res.status(200).json(new Success(200, new OrderResponse(true, Order, Car, oldPrice)));
    }
  }
}
