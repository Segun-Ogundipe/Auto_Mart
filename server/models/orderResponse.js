export default class OrderResponse {
  constructor(isUpdate, Order, Car, oldPrice) {
    this.id = Order.getId();
    this.carId = Car.getId();
    this.createdOn = Order.getCreatedOn();
    this.updatedOn = Order.getUpdatedOn();
    this.status = Order.getStatus();
    this.price = Car.getPrice();
    if (isUpdate === false) {
      this.priceOffered = Order.getAmount();
    } else {
      this.oldPriceOffered = oldPrice;
      this.newPriceOffered = Order.getAmount();
    }
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

  getUpdatedOn() {
    return this.updatedOn;
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

  getOldPriceOffered() {
    return this.oldPriceOffered;
  }

  getNewPriceOffered() {
    return this.newPriceOffered;
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

  setUpdatedOn(updatedOn) {
    this.updatedOn = updatedOn;
  }

  setStatus(status) {
    this.status = status;
  }

  setPrice(price) {
    this.price = price;
  }

  setNewPriceOffered(newPriceOffered) {
    this.newPriceOffered = newPriceOffered;
  }

  setPriceOffered(priceOffered) {
    this.priceOffered = priceOffered;
  }

  setOldPriceOffered(oldPriceOffered) {
    this.oldPriceOffered = oldPriceOffered;
  }
}
