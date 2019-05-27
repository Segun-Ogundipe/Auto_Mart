export default class Error {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status) {
    this.status = status;
  }

  getMessage() {
    return this.message;
  }

  setMessage(message) {
    this.message = message;
  }
}
