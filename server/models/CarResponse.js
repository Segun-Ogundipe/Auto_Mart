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
  static setResponseFromCarArray(cars) {
    const response = [];
    let User;

    cars.forEach(async (value) => {
      User = await UserService.findUserById(value.userId);
      response.push(new CarResponse(true, value, User));
    });
    return response;
  }
}
