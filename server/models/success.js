export default class Success {
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status) {
    this.status = status;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }
}
