/* eslint-disable class-methods-use-this */
import Order from '../models/OrderModel';
import orders from '../db/orderdb';
import ApiError from '../helpers/ErrorClass';
import pool from './index';

export default class OrderService {
  static async createOrder(body) {
    if (body === undefined) {
      throw new ApiError(400, 'Body can\'t be empty');
    }
    const query = 'INSERT INTO orders("userId", "carId", amount, status, "createdOn") VALUES($1, $2, $3, $4, $5) RETURNING *';

    const OrderData = new Order();
    OrderData.setOrderWithBody(body);

    const order = await pool.query(query, OrderData.getOrderAsArray());

    return order[0];
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
    if (orderId === undefined) {
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
