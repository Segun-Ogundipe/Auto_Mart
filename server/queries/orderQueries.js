/* eslint-disable class-methods-use-this */
import Order from '../models/orderModel';
import helper from '../helpers/helper';
import orders from '../db/orderdb';

export default class OrderQueries {
  static createOrder(body) {
    const order = new Order();

    order.setId(helper.getNewId(orders));
    order.setBuyer(body.buyer);
    order.setCarId(body.carId);
    order.setAmount(body.amount);

    orders.push(order);

    return order;
  }

  static updateOrder(orderId, price) {
    let order = null;
    order = this.findOrderById(orderId);
    if (order !== null && order.getStatus() === 'pending') {
      order.setAmount(price);
      order.setUpdatedOn(new Date().toLocaleString());

      orders.forEach((value, index) => {
        if (value.getId() === order.getId()) {
          orders.splice(index, 1, order);
        }
      });
    }

    return order;
  }

  static findOrderById(orderId) {
    let order = null;
    orders.forEach((orderObject) => {
      if (orderObject.getId() === parseInt(orderId, 10)) {
        order = orderObject;
      }
    });

    return order;
  }
}
