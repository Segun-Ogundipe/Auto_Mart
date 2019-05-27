export default class UserResponse {
  constructor(User, token) {
    this.token = token;
    this.id = User.getId();
    this.email = User.getEmail();
    this.firstName = User.getFirstName();
    this.lastName = User.getLastName();
    this.gender = User.getGender();
    this.address = User.getAddress();
    this.isAdmin = User.getIsAdmin();
    this.registeredOn = User.getRegisteredOn();
  }

  getToken() {
    return this.token;
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

  getAddress() {
    return this.address;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getRegisteredOn() {
    return this.registeredOn;
  }

  setToken(token) {
    this.token = token;
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
