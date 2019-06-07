export default class CarResponse {
  constructor(Car, User) {
    this.id = Car.id;
    this.email = User.email;
    this.createdOn = Car.createdOn;
    this.manufacturer = Car.manufacturer;
    this.model = Car.model;
    this.price = Car.price;
    this.state = Car.state;
    this.status = Car.status;
    this.bodyType = Car.bodyType;
    this.imageUrl = Car.imageUrl;
  }
}
