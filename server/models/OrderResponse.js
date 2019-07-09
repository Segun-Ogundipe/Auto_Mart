export default class OrderResponse {
  constructor(isUpdate, Order, Car, oldPrice) {
    this.id = Order.id;
    this.car_id = Car.id;
    this.buyer = Order.userId;
    this.status = Order.status;
    this.price = Car.price;
    if (isUpdate === false) {
      this.price_offered = Order.amount;
    } else {
      this.old_price_offered = oldPrice;
      this.new_price_offered = Order.amount;
      this.updated_on = Order.updatedOn;
    }
    this.created_on = Order.createdOn;
  }
}
