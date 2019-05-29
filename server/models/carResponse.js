export default class CarResponse {
  constructor(Car, User) {
    this.id = Car.getId();
    this.email = User.getEmail();
    this.createdOn = Car.getCreatedOn();
    this.manufacturer = Car.getManufacturer();
    this.model = Car.getModel();
    this.price = Car.getPrice();
    this.state = Car.getState();
    this.status = Car.getStatus();
    this.bodyType = Car.getBodyType();
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getCreatedOn() {
    return this.createdOn;
  }

  getManufacturer() {
    return this.manufacturer;
  }

  getModel() {
    return this.model;
  }

  getPrice() {
    return this.price;
  }

  getState() {
    return this.state;
  }

  getStatus() {
    return this.status;
  }

  getBodyType() {
    return this.bodyType;
  }

  setId(id) {
    this.id = id;
  }

  setEmail(email) {
    this.email = email;
  }

  setCreatedOn(createdOn) {
    this.createdOn = createdOn;
  }

  setManufacturer(manufacturer) {
    this.manufacturer = manufacturer;
  }

  setModel(model) {
    this.model = model;
  }

  setPrice(price) {
    this.price = price;
  }

  setState(state) {
    this.state = state;
  }

  setStatus(status) {
    this.status = status;
  }

  setBodyType(bodyType) {
    this.bodyType = bodyType;
  }
}
