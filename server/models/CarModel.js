export default class Car {
  constructor(id, owner, state, price,
    manufacturer, model, bodyType, imageUrl) {
    this.id = id;
    this.owner = owner;
    this.state = state;
    this.status = 'available';
    this.price = price;
    this.manufacturer = manufacturer;
    this.model = model;
    this.bodyType = bodyType;
    this.imageUrl = imageUrl;
    this.createdOn = new Date();
    this.updatedOn = null;
  }

  setCarWithBody(body) {
    this.owner = body.owner;
    this.state = body.state;
    this.status = body.status || 'available';
    this.price = body.price;
    this.manufacturer = body.manufacturer;
    this.model = body.model;
    this.bodyType = body.body_type;
    this.imageUrl = body.image;
  }

  getCarAsArray() {
    return [this.owner, this.state, this.status, this.price, this.manufacturer,
      this.model, this.bodyType, this.imageUrl, this.createdOn];
  }
}
