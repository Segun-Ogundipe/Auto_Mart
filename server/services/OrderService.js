/* eslint-disable class-methods-use-this */
import Order from '../models/OrderModel';
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

  static async updateOrder(OrderObject, price) {
    const query = 'UPDATE orders SET amount=$1, "updatedOn"=$2 WHERE id=$3 RETURNING *';
    const updatedOn = new Date();
    const order = await pool.query(query, [price, updatedOn, OrderObject.id]);

    return order[0];
  }

  static async findOrderById(orderId) {
    if (orderId === undefined) {
      throw new ApiError(400, 'Please provide a valid orderId');
    }
    const query = 'SELECT * FROM orders WHERE id = $1';
    const order = await pool.query(query, [orderId]);
    return order;
  }
}
