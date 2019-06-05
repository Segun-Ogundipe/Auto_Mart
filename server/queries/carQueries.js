import helper from '../helpers/helper';
import Car from '../models/carModel';
import cars from '../db/cardb';

/* eslint-disable class-methods-use-this */
export default class CarQueries {
  static createCar(body) {
    const car = new Car();

    car.setId(helper.getNewId(cars));
    car.setOwner(body.owner);
    car.setState(body.state);
    car.setPrice(body.price);
    car.setManufacturer(body.manufacturer);
    car.setModel(body.model);
    car.setBodyType(body.bodyType);
    car.setImageUrl(body.image);

    cars.push(car);

    return car;
  }

  static updateCar(carId, { status, price }) {
    const car = this.findCarById(carId);

    if (status) {
      if (car !== null && car.getStatus() === 'available') {
        car.setStatus(status);

        cars.forEach((value, index) => {
          if (value.getId() === car.getId()) {
            cars.splice(index, 1, car);
          }
        });
      }
    }

    if (price) {
      if (car !== null) {
        car.setPrice(price);

        cars.forEach((value, index) => {
          if (value.getId() === car.getId()) {
            cars.splice(index, 1, car);
          }
        });
      }
    }

    return car;
  }

  static findCarById(id) {
    let car = null;

    cars.forEach((value) => {
      if (value.getId() === parseInt(id, 10)) {
        car = value;
      }
    });

    return car;
  }

  static findByStatus(status) {
    const carsArray = cars.filter(value => value.getStatus() === status);

    return carsArray;
  }

  static findByStatusAndPrice(status, minPrice, maxPrice) {
    const carsArray = cars.filter(value => value.getStatus() === status && value.getPrice() >= minPrice
      && value.getPrice() <= maxPrice);

    return carsArray;
  }
}
