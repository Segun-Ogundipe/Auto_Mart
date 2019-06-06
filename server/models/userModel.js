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
}
