export default class FlagResponse {
  constructor(Flag) {
    this.id = Flag.id;
    this.carId = Flag.carId;
    this.reason = Flag.reason;
    this.description = Flag.description;
    this.createdOn = Flag.createdOn;
  }
}
