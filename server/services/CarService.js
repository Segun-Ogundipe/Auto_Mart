import Car from '../models/CarModel';
import cars from '../db/cardb';
import ApiError from '../helpers/ErrorClass';
import pool from './index';

/* eslint-disable class-methods-use-this */
export default class CarService {
  static async createCar(body) {
    if (body === undefined) {
      throw new ApiError(400, 'Body can\'t be empty');
    }
    const query = 'INSERT INTO cars("userId", state, status, price, manufacturer, model, "bodyType", "imageUrl", "createdOn") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';

    const CarData = new Car();

    CarData.setUserWithBody(body);

    const car = await pool.query(query, CarData.getCarAsArray());

    return car[0];
  }

  static async updateCar(carId, { carStatus, acceptedOrderId, carPrice }) {
    let car;
    if (carStatus) {
      const carQuery = 'UPDATE cars SET status=$1, "updatedOn"=$2 WHERE id=$3 RETURNING *';
      const updatedOn = new Date();
      car = await pool.query(carQuery, [carStatus, updatedOn, carId]);

      const acceptedQuery = 'UPDATE orders SET status=$1 WHERE id=$2';
      await pool.query(acceptedQuery, ['accepted', acceptedOrderId]);
    }

    if (carPrice) {
      const query = 'UPDATE cars SET price=$1, "updatedOn"=$2 WHERE id=$3 RETURNING *';
      const updatedOn = new Date();
      car = await pool.query(query, [carPrice, updatedOn, carId]);
    }

    return car[0];
  }

  static async findCarById(id) {
    if (id === undefined) {
      throw new ApiError(400, 'Please provide a valid id');
    }
    const query = 'SELECT * FROM cars WHERE id = $1';
    const car = await pool.query(query, [id]);

    return car;
  }

  static async findByStatus(status, { min, max }) {
    const query = 'SELECT * FROM cars WHERE status=$1';
    const rangeQuery = 'SELECT * FROM cars WHERE status=$1 AND price BETWEEN $2 AND $3';
    let CarsByStatus;

    if (!min && !max) {
      CarsByStatus = await pool.query(query, [status]);
    } else {
      CarsByStatus = await pool.query(rangeQuery, [status, min, max]);
    }
    return CarsByStatus;
  }

  static deleteCar(carId) {
    if (carId === undefined) {
      throw new ApiError(400, 'Please provide carID');
    }

    const car = this.findCarById(carId);

    if (car === null) {
      throw new ApiError(404, `Car with id: ${carId} does not exist`);
    }

    cars.forEach((value, index) => {
      if (value.id === car.id) {
        cars.splice(index, 1);
      }
    });
  }

  static findAll() {
    return cars;
  }
}
