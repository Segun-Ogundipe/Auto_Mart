export default class Order {
  constructor(id, buyer, carId, amount) {
    this.id = id;
    this.buyer = buyer;
    this.carId = carId;
    this.amount = amount;
    this.status = 'pending';
    this.createdOn = new Date();
    this.updatedOn = null;
  }

  setOrderWithBody(body) {
    this.buyer = body.buyer;
    this.carId = body.car_id;
    this.amount = body.amount;
  }

  getOrderAsArray() {
    return [this.buyer, this.carId, this.amount,
      this.status, this.createdOn];
  }
}
