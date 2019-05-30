export default class Order {
  constructor(id, buyer, carId, amount, status) {
    this.id = id;
    this.buyer = buyer;
    this.createdOn = new Date().toLocaleString();
    this.carId = carId;
    this.amount = amount;
    this.status = status;
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

  setAmount(amount) {
    this.amount = amount;
  }

  setStatus(status) {
    this.status = status;
  }
}
