export default class Car {
  constructor(id, owner, state, price,
    manufacturer, model, bodyType, imageUrl,
    year, fuelType, fuelCap,transmissionType,
    mileage, color, description, doors, ac,
    tintedWindows, armRest, airBag, fmRadio, dvdPlayer) {
    this.id = id;
    this.owner = owner;
    this.state = state;
    this.status = 'available';
    this.price = price;
    this.manufacturer = manufacturer;
    this.model = model;
    this.bodyType = bodyType;
    this.imageUrl = imageUrl;
    this.year = year;
    this.fuelType = fuelType;
    this.fuelCap = fuelCap;
    this.transmissionType = transmissionType;
    this.mileage = mileage;
    this.color = color;
    this.description = description;
    this.doors = doors;
    this.ac = ac;
    this.tintedWindows = tintedWindows;
    this.armRest = armRest;
    this.airBag = airBag;
    this.fmRadio = fmRadio;
    this.dvdPlayer = dvdPlayer;
    this.createdOn = new Date();
    this.updatedOn = null;
  }

  setCarWithBody(body) {
    this.owner = body.owner;
    this.state = body.state;
    this.status = body.status || 'available';
    this.price = body.price;
    this.manufacturer = body.manufacturer;
    this.model = body.model;
    this.bodyType = body.body_type;
    this.imageUrl = body.image_url;
    this.year = body.year;
    this.fuelType = body.fuel_type;
    this.fuelCap = body.fuel_cap;
    this.transmissionType = body.transmission_type;
    this.mileage = body.mileage;
    this.color = body.color;
    this.description = body.description;
    this.doors = body.doors;
    this.ac = body.ac;
    this.tintedWindows = body.tinted_windows;
    this.armRest = body.arm_rest;
    this.airBag = body.air_bag;
    this.fmRadio = body.fm_radio;
    this.dvdPlayer = body.dvd_player;
  }

  getCarAsArray() {
    return [this.owner, this.state, this.status, this.price, this.manufacturer,
      this.model, this.bodyType, this.imageUrl, this.createdOn, this.year,
      this.fuelType, this.fuelCap, this.transmissionType, this.mileage,
      this.color, this.description, this.doors, this.ac, this.tintedWindows,
      this.armRest, this.airBag, this.fmRadio, this.dvdPlayer];
  }
}
