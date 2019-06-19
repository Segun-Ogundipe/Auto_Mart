export default class Mail {
  constructor(to, text) {
    this.from = process.env.email;
    this.to = to;
    this.subject = 'Your new Password';
    this.text = `Your new password is: ${text}`;
  }
}
