/* eslint-disable class-methods-use-this */
import OrderService from '../services/OrderService';
import CarService from '../services/CarService';
import Response from '../models/ResponseModel';
import OrderResponse from '../models/OrderResponse';

export default class OrderController {
  static async create(req, res) {
    try {
      const { body } = req;
      let Order = null;

      Order = await OrderService.createOrder(body);

      res.status(201).json(new Response(true, 201, new OrderResponse(false, Order, body.Car)));
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }

  static async updateOrder(req, res) {
    try {
      const { body } = req;
      let { Order } = body;
      const oldPrice = Order.amount;
      const Car = await CarService.findCarById(Order.carId);

      Order = await OrderService.updateOrder(Order, body.price);

      res.status(200).json(new Response(true, 200, new OrderResponse(true, Order, Car[0], oldPrice)));
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }
}
