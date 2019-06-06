export default class UserResponse {
  constructor(User, token) {
    this.token = token;
    this.id = User.id;
    this.email = User.email;
    this.firstName = User.firstName;
    this.lastName = User.lastName;
    this.gender = User.gender;
    this.address = User.address;
    this.isAdmin = User.isAdmin;
    this.registeredOn = User.registeredOn;
  }
}
