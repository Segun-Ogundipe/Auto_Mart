export default class OrderResponse {
  constructor(isUpdate, Order, Car, oldPrice) {
    this.id = Order.id;
    this.carId = Car.id;
    this.buyer = Order.buyer;
    this.createdOn = Order.createdOn;
    this.status = Order.status;
    this.price = Car.price;
    if (isUpdate === false) {
      this.priceOffered = Order.amount;
    } else {
      this.oldPriceOffered = oldPrice;
      this.newPriceOffered = Order.amount;
      this.updatedOn = Order.updatedOn;
    }
  }
}
