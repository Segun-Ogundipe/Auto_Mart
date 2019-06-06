import helper from '../helpers/helper';
import Car from '../models/CarModel';
import cars from '../db/cardb';
import ApiError from '../helpers/ErrorClass';

/* eslint-disable class-methods-use-this */
export default class CarService {
  static createCar(body) {
    if (!body) {
      throw new ApiError(400, 'Body can\'t be empty');
    }
    const car = new Car();

    car.id = helper.getNewId(cars);
    car.owner = body.owner;
    car.state = body.state;
    car.price = body.price;
    car.manufacturer = body.manufacturer;
    car.model = body.model;
    car.bodyType = body.bodyType;
    car.imageUrl = body.image;

    cars.push(car);

    return car;
  }

  static updateCar(carId, { status, price }) {
    if (!carId) {
      throw new ApiError(400, 'Please provide carID');
    }

    const car = this.findCarById(carId);

    if (status) {
      if (car !== null && car.status === 'available') {
        car.status = status;

        cars.forEach((value, index) => {
          if (value.id === car.id) {
            cars.splice(index, 1, car);
          }
        });
      }
    }

    if (price) {
      if (car !== null) {
        car.price = price;

        cars.forEach((value, index) => {
          if (value.id === car.id) {
            cars.splice(index, 1, car);
          }
        });
      }
    }

    return car;
  }

  static findCarById(id) {
    if (!id) {
      throw new ApiError(400, 'Please provide a valid id');
    }
    let car = null;

    cars.forEach((value) => {
      if (value.id === parseInt(id, 10)) {
        car = value;
      }
    });

    return car;
  }

  static findByStatus(status) {
    const carsArray = cars.filter(value => value.status === status);

    return carsArray;
  }

  static findByStatusAndPriceRange(status, minPrice, maxPrice) {
    const carsArray = cars.filter(value => value.status === status && value.price
      >= minPrice && value.price <= maxPrice);

    return carsArray;
  }

  static deleteCar(carId) {
    if (!carId) {
      throw new ApiError(400, 'Please provide carID');
    }

    const car = this.findCarById(carId);

    if (car === null) {
      return false;
    }
    cars.forEach((value, index) => {
      if (value.id === car.id) {
        cars.splice(index, 1);
      }
    });
    return true;
  }

  static findAll() {
    return cars;
  }
}
