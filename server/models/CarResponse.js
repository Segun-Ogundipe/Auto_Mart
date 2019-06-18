import UserService from '../services/UserService';

export default class CarResponse {
  constructor(isUpdate, Car, User) {
    this.id = Car.id;
    this.owner = User.email;
    this.manufacturer = Car.manufacturer;
    this.model = Car.model;
    this.price = Car.price;
    this.state = Car.state;
    this.status = Car.status;
    this.bodyType = Car.bodyType;
    this.imageUrl = Car.imageUrl;
    this.createdOn = Car.createdOn;
    if (isUpdate === true) {
      this.updatedOn = Car.updatedOn;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  static async setResponseFromCarArray(cars) {
    const response = [];

    for (let i = 0; i < cars.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const User = await UserService.findUserById(cars[i].userId);
      response.push(new CarResponse(true, cars[i], User[0]));
    }
    return response;
  }
}
