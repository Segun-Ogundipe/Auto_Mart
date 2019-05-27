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

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getGender() {
    return this.gender;
  }

  getPassword() {
    return this.password;
  }

  getAddress() {
    return this.address;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getRegisteredOn() {
    return this.registeredOn;
  }

  setId(id) {
    this.id = id;
  }

  setEmail(email) {
    this.email = email;
  }

  setFirstName(firstName) {
    this.firstName = firstName;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }

  setGender(gender) {
    this.gender = gender;
  }

  setPassword(password) {
    this.password = password;
  }

  setAddress(address) {
    this.address = address;
  }

  setIsAdmin(isAdmin) {
    this.isAdmin = isAdmin;
  }

  setRegisteredOn(registeredOn) {
    this.registeredOn = registeredOn;
  }
}
