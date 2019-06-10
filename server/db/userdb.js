import User from '../models/UserModel';

const user = new User(1, 'davephenoms@gmail.com', 'Segun', 'Ogundipe', 'MALE', '$2b$10$8Qi80.8iUQH6kvexWti7t.TclJ7OwdDIwFwUFJ/5HM345NS6rSjXG',
  '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria', true);

const users = [user];

export default users;
