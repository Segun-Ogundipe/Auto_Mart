/* eslint-disable class-methods-use-this */
import Order from '../models/OrderModel';
import helper from '../helpers/helper';
import orders from '../db/orderdb';
import ApiError from '../helpers/ErrorClass';

export default class OrderService {
  static createOrder(body) {
    if (!body) {
      throw new ApiError(400, 'Body can\'t be empty');
    }

    const order = new Order();

    order.id = helper.getNewId(orders);
    order.buyer = body.buyer;
    order.carId = body.carId;
    order.amount = body.amount;

    orders.push(order);

    return order;
  }

  static updateOrder(orderId, price) {
    let order = null;
    order = this.findOrderById(orderId);
    if (order !== null && order.status === 'pending') {
      order.amount = price;
      order.updatedOn = new Date().toLocaleString();

      orders.forEach((value, index) => {
        if (value.id === order.id) {
          orders.splice(index, 1, order);
        }
      });
    }

    return order;
  }

  static findOrderById(orderId) {
    if (!orderId) {
      throw new ApiError(400, 'Please provide a valid orderId');
    }
    let order = null;
    orders.forEach((orderObject) => {
      if (orderObject.id === parseInt(orderId, 10)) {
        order = orderObject;
      }
    });

    return order;
  }
}
