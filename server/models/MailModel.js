export default class Mail {
  constructor(to, text) {
    this.from = 'password@automart.com';
    this.to = to;
    this.subject = 'Your new Password';
    this.text = `Your new password is: ${text}`;
  }
}
