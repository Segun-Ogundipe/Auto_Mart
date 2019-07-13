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
    this.body_type = Car.bodyType;
    this.image_url = Car.imageUrl;
    this.year = Car.year;
    this.fuelType = Car.fuelType;
    this.fuelCap = Car.fuelCap;
    this.transmissionType = Car.transmissionType;
    this.mileage = Car.mileage;
    this.color = Car.color;
    this.ac = Car.ac;
    this.tintedWindows = Car.tintedWindows;
    this.armRest = Car.armRest;
    this.airBag = Car.airBag;
    this.fmRadio = Car.fmRadio;
    this.dvdPlayer = Car.dvdPlayer;
    this.created_on = Car.createdOn;
    if (isUpdate === true) {
      this.updated_on = Car.updatedOn;
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
