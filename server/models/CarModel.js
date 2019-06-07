export default class Car {
  constructor(id, owner, state, price,
    manufacturer, model, bodyType, imageUrl) {
    this.id = id;
    this.owner = owner;
    this.createdOn = new Date().toLocaleString();
    this.state = state;
    this.status = 'available';
    this.price = price;
    this.manufacturer = manufacturer;
    this.model = model;
    this.bodyType = bodyType;
    this.imageUrl = imageUrl;
  }
}
