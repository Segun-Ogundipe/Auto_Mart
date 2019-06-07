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
}
