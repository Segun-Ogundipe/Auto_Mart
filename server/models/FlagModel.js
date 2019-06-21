export default class Flag {
  constructor(id, carId, reason, description, createdOn) {
    this.id = id;
    this.carId = carId;
    this.reason = reason;
    this.description = description;
    this.createdOn = createdOn;
  }

  setFlagWithBody(body) {
    this.carId = body.carId;
    this.reason = body.reason;
    this.description = body.description;
    this.createdOn = body.createdOn;
  }

  getFlagAsArray() {
    return [this.carId, this.reason,
      this.description, this.createdOn];
  }
}
