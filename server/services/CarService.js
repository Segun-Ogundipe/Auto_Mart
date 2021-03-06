import Car from '../models/CarModel';
import ApiError from '../helpers/ErrorClass';
import pool from './index';

/* eslint-disable class-methods-use-this */
export default class CarService {
  static async createCar(body) {
    if (body === undefined) {
      throw new ApiError(400, 'Body can\'t be empty');
    }
    const query = 'INSERT INTO cars("userId", state, status, price, manufacturer, model, "bodyType", "imageUrl", "createdOn", year, "fuelType", "fuelCap", "transmissionType", "mileage", color, description, doors, ac, "tintedWindows", "armRest", "airBag", "fmRadio", "dvdPlayer") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) RETURNING *';

    const CarData = new Car();

    CarData.setCarWithBody(body);

    const car = await pool.query(query, CarData.getCarAsArray());

    return car[0];
  }

  static async updateStatus(carId, acceptedOrderId) {
    let car;

    if (acceptedOrderId) {
      const carQuery = 'UPDATE cars SET status=$1, "updatedOn"=$2 WHERE id=$3 RETURNING *';
      const updatedOn = new Date();
      car = await pool.query(carQuery, ['sold', updatedOn, carId]);

      const acceptedQuery = 'UPDATE orders SET status=$1 WHERE id=$2';
      pool.query(acceptedQuery, ['accepted', acceptedOrderId]);
    }

    if (!acceptedOrderId) {
      const carQuery = 'UPDATE cars SET status=$1, "updatedOn"=$2 WHERE id=$3 RETURNING *';
      const updatedOn = new Date();
      car = await pool.query(carQuery, ['sold', updatedOn, carId]);
    }

    return car[0];
  }

  static async updatePrice(carId, price) {
    const query = 'UPDATE cars SET price=$1, "updatedOn"=$2 WHERE id=$3 RETURNING *';
    const updatedOn = new Date();

    const car = await pool.query(query, [price, updatedOn, carId]);

    return car[0];
  }

  static async findCarById(id) {
    const query = 'SELECT * FROM cars WHERE id = $1';
    const car = await pool.query(query, [id]);

    return car;
  }

  static async findByStatus(status, {
    min, max, state, manufacturer,
  }) {
    const statusQuery = 'SELECT * FROM cars WHERE status=$1';
    const rangeQuery = 'SELECT * FROM cars WHERE status=$1 AND price BETWEEN $2 AND $3';
    const rangeStateQuery = 'SELECT * FROM cars WHERE status=$1 AND state=$2 AND price BETWEEN $3 AND $4';
    const stateQuery = 'SELECT * FROM cars WHERE status=$1 AND state=$2';
    const minQuery = 'SELECT * FROM cars WHERE status=$1 AND price>=$2';
    const minStateQuery = 'SELECT * FROM cars WHERE status=$1 AND price>=$2 AND state=$3';
    const maxQuery = 'SELECT * FROM cars WHERE status=$1 AND price<=$2';
    const maxStateQuery = 'SELECT * FROM cars WHERE status=$1 AND price<=$2 AND state=$3';
    const makeQuery = 'SELECT * FROM cars WHERE status=$1 AND manufacturer=$2';
    const allQuery = 'SELECT * FROM cars WHERE status=$1 AND state=$2 AND price BETWEEN $3 AND $4 AND manufacturer=$5';
    let CarsByStatus;
    if (!min && !max && !state && !manufacturer) {
      CarsByStatus = await pool.query(statusQuery, [status]);
    } else if (!min && !max && state && !manufacturer) {
      CarsByStatus = await pool.query(stateQuery, [status, state]);
    } else if (min && max && !state && !manufacturer) {
      CarsByStatus = await pool.query(rangeQuery, [status, min, max]);
    } else if (min && !max && !state && !manufacturer) {
      CarsByStatus = await pool.query(minQuery, [status, min]);
    } else if (!min && max && !state && !manufacturer) {
      CarsByStatus = await pool.query(maxQuery, [status, max]);
    } else if (min && max && state && !manufacturer) {
      CarsByStatus = await pool.query(rangeStateQuery, [status, state, min, max]);
    } else if (min && !max && state && !manufacturer) {
      CarsByStatus = await pool.query(minStateQuery, [status, min, state]);
    } else if (!min && max && state && !manufacturer) {
      CarsByStatus = await pool.query(maxStateQuery, [status, max, state]);
    } else if (!min && !max && !state && manufacturer) {
      CarsByStatus = await pool.query(makeQuery, [status, manufacturer]);
    } else if (min && max && state && manufacturer) {
      CarsByStatus = await pool.query(allQuery, [status, state, min, max, manufacturer]);
    }

    return CarsByStatus;
  }

  static async deleteCar(carId) {
    if (carId === undefined) {
      throw new ApiError(400, 'Please provide carID');
    }

    const query = 'DELETE FROM cars WHERE id=$1';
    pool.query(query, [carId]);
  }

  static async findAll() {
    const query = 'SELECT * FROM cars';
    const cars = await pool.query(query);

    return cars;
  }
}
