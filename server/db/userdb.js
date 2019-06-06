import User from '../models/userModel';

const users = [];

const user = new User(1, 'davephenoms@gmail.com', 'Segun', 'Ogundipe', 'Male', 'qwertyuiop1234',
  '12, lagos street, lagos state', true);
users.push(user);

export default users;
