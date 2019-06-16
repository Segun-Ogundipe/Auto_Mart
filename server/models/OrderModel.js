export default class Order {
  constructor(id, buyer, carId, amount) {
    this.id = id;
    this.buyer = buyer;
    this.createdOn = new Date();
    this.updatedOn = null;
    this.carId = carId;
    this.amount = amount;
    this.status = 'pending';
  }

  setOrderWithBody(body) {
    this.buyer = body.buyer;
    this.carId = body.carId;
    this.amount = body.amount;
  }
}
