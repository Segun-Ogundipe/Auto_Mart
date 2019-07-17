export default class Flag {
  constructor(id, carId, reason, description) {
    this.id = id;
    this.carId = carId;
    this.reason = reason;
    this.description = description;
    this.createdOn = new Date();
  }

  setFlagWithBody(body) {
    this.carId = body.car_id;
    this.reason = body.reason;
    this.description = body.description;
  }

  getFlagAsArray() {
    return [this.carId, this.reason,
      this.description, this.createdOn];
  }
}
