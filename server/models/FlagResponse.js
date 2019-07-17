export default class FlagResponse {
  constructor(Flag) {
    this.id = Flag.id;
    this.car_id = Flag.carId;
    this.reason = Flag.reason;
    this.description = Flag.description;
    this.created_on = Flag.createdOn;
  }
}
