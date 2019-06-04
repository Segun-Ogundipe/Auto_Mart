export default class Order {
  constructor(id, buyer, carId, amount) {
    this.id = id;
    this.buyer = buyer;
    this.createdOn = new Date().toLocaleString();
    this.updatedOn = '';
    this.carId = carId;
    this.amount = amount;
    this.status = 'pending';
  }

  getId() {
    return this.id;
  }

  getBuyer() {
    return this.buyer;
  }

  getCreatedOn() {
    return this.createdOn;
  }

  getUpdatedOn() {
    return this.updatedOn;
  }

  getCarId() {
    return this.carId;
  }

  getAmount() {
    return this.amount;
  }

  getStatus() {
    return this.status;
  }

  setId(id) {
    this.id = id;
  }

  setBuyer(buyer) {
    this.buyer = buyer;
  }

  setCreatedOn(createdOn) {
    this.createdOn = createdOn;
  }

  setUpdatedOn(updatedOn) {
    this.updatedOn = updatedOn;
  }

  setCarId(carId) {
    this.carId = carId;
  }

  setAmount(amount) {
    this.amount = amount;
  }

  setStatus(status) {
    this.status = status;
  }
}
