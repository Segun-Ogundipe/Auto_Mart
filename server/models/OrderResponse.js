export default class OrderResponse {
  constructor(isUpdate, Order, Car, oldPrice) {
    this.id = Order.id;
    this.carId = Car.id;
    this.createdOn = new Date().toLocaleString();
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
