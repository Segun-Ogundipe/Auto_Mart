export default class Mail {
  constructor(to, text) {
    this.from = 'AutoMart:';
    this.to = to;
    this.subject = 'Your new Password';
    this.text = `Your new password is: ${text}`;
  }
}
