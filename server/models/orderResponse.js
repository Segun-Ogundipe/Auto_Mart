export default class OrderResponse {
  constructor(isUpdate, Order, Car, oldPrice) {
    this.id = Order.id;
    this.carId = Car.id;
    this.createdOn = Order.id;
    this.updatedOn = Order.updatedOn;
    this.status = Order.status;
    this.price = Car.price;
    if (isUpdate === false) {
      this.priceOffered = Order.amount;
    } else {
      this.oldPriceOffered = oldPrice;
      this.newPriceOffered = Order.amount;
    }
  }
}
