import { hashSync, genSaltSync } from 'bcrypt';

export default class User {
  constructor(id, email, firstName, lastName,
    gender, password, address, isAdmin) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.password = password;
    this.address = address;
    this.isAdmin = isAdmin;
    this.registeredOn = new Date().toLocaleString();
  }

  setUserWithBody(body) {
    this.email = body.email;
    this.firstName = body.firstName;
    this.lastName = body.lastName;
    this.gender = body.gender;
    this.password = hashSync(body.password, genSaltSync(10));
    this.address = body.address;
    this.isAdmin = body.isAdmin;
  }

  getUserAsArray() {
    return [this.email, this.firstName, this.lastName, this.address,
      this.password, this.gender, this.isAdmin, this.registeredOn];
  }
}
