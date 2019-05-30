export default class Car {
  constructor(id, owner, state, status, price,
    manufacturer, model, bodyType, imageUrl) {
    this.id = id;
    this.owner = owner;
    this.createdOn = new Date().toLocaleString();
    this.state = state;
    this.status = status;
    this.price = price;
    this.manufacturer = manufacturer;
    this.model = model;
    this.bodyType = bodyType;
    this.imageUrl = imageUrl;
  }

  getId() {
    return this.id;
  }

  getOwner() {
    return this.owner;
  }

  getCreatedOn() {
    return this.createdOn;
  }

  getState() {
    return this.state;
  }

  getStatus() {
    return this.status;
  }

  getPrice() {
    return this.price;
  }

  getManufacturer() {
    return this.manufacturer;
  }

  getModel() {
    return this.model;
  }

  getBodyType() {
    return this.bodyType;
  }

  getImageUrl() {
    return this.imageUrl;
  }

  setId(id) {
    this.id = id;
  }

  setOwner(owner) {
    this.owner = owner;
  }

  setCreatedOn(createdOn) {
    this.createdOn = createdOn;
  }

  setState(state) {
    this.state = state;
  }

  setStatus(status) {
    this.status = status;
  }

  setPrice(price) {
    this.price = price;
  }

  setManufacturer(manufacturer) {
    this.manufacturer = manufacturer;
  }

  setModel(model) {
    this.model = model;
  }

  setBodyType(bodyType) {
    this.bodyType = bodyType;
  }

  setImageUrl(imageUrl) {
    this.imageUrl = imageUrl;
  }
}
