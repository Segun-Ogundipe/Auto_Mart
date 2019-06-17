/* eslint-disable class-methods-use-this */
import Error from '../models/ErrorModel';
import OrderService from '../services/OrderService';
import UserService from '../services/UserService';
import CarService from '../services/CarService';
import Success from '../models/SuccessModel';
import OrderResponse from '../models/OrderResponse';
import ApiError from '../helpers/ErrorClass';

export default class OrderController {
  static async create(req, res) {
    try {
      const { body } = req;
      let Order = null;
      const Buyer = await UserService.findUserById(body.buyer);
      const Car = await CarService.findCarById(body.carId);

      if (Buyer.length < 1) {
        throw new ApiError(404, `Buyer with id: ${body.buyer} does not exist`);
      }

      if (Car.length < 1) {
        throw new ApiError(404, `Car with id: ${body.carId} does not exist`);
      }

      Order = await OrderService.createOrder(body);

      res.status(201).json(new Success(201, new OrderResponse(false, Order, Car)));
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }

  static updateOrder(req, res) {
    try {
      const { body } = req;
      let { Order } = body;
      const oldPrice = Order.amount;
      const Car = CarService.findCarById(Order.carId);

      Order = OrderService.updateOrder(Order, body.price);

      res.status(200).json(new Success(200, new OrderResponse(true, Order, Car, oldPrice)));
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }
}
