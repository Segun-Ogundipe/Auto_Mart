/* eslint-disable class-methods-use-this */
import Order from '../models/orderModel';
import helper from '../helpers/helper';
import orders from '../db/orderdb';

export default class OrderQueries {
  createOrder(body) {
    const order = new Order();

    order.setId(helper.getNewId(orders));
    order.setBuyer(body.buyer);
    order.setCarId(body.carId);
    order.setAmount(body.amount);

    orders.push(order);

    return order;
  }
}
