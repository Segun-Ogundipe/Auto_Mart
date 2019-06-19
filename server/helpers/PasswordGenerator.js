export default class PasswordGenerator {
  static generate() {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWSYZ';
    const lower = upper.toLowerCase();
    const digits = '0123456789@*#';
    const alphanumeric = upper + lower + digits;
    let password = '';
    const alphaNumLength = alphanumeric.length;

    const length = Math.floor(Math.random() * (15 - 8) + 8);

    for (let i = 0; i < length; i += 1) {
      password += alphanumeric.charAt(Math.floor(Math.random() * alphaNumLength));
    }

    return password;
  }
}
