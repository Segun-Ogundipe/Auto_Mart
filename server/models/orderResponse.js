export default class OrderResponse {
  constructor(Order, Car) {
    this.id = Order.getId();
    this.carId = Car.getId();
    this.createdOn = Order.getCreatedOn();
    this.status = Order.getStatus();
    this.price = Car.getPrice();
    this.priceOffered = Order.getAmount();
  }

  getId() {
    return this.id;
  }

  getCarId() {
    return this.carId;
  }

  getCreatedOn() {
    return this.createdOn;
  }

  getStatus() {
    return this.status;
  }

  getPrice() {
    return this.price;
  }

  getPriceOffered() {
    return this.priceOffered;
  }

  setId(id) {
    this.id = id;
  }

  setCarId(carId) {
    this.carId = carId;
  }

  setCreatedOn(createdOn) {
    this.createdOn = createdOn;
  }

  setStatus(status) {
    this.status = status;
  }

  setPrice(price) {
    this.price = price;
  }

  setPriceOffered(priceOffered) {
    this.priceOffered = priceOffered;
  }
}
