import helper from '../helpers/helper';
import Car from '../models/carModel';
import cars from '../db/cardb';

/* eslint-disable class-methods-use-this */
export default class CarQueries {
  createCar(body) {
    const car = new Car();

    car.setId(helper.getNewId(cars));
    car.setOwner(body.owner);
    car.setState(body.state);
    car.setStatus(body.status);
    car.setPrice(body.price);
    car.setManufacturer(body.manufacturer);
    car.setModel(body.model);
    car.setBodyType(body.bodyType);
    car.setImageUrl(body.image);

    cars.push(car);

    return car;
  }
}
