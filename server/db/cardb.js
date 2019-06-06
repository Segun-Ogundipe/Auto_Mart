import Car from '../models/CarModel';

const cars = [];

const car = new Car(1, 1, 'new', 100000, 'Toyota', 'Z60', 'Truck',
  'http://res.cloudinary.com/phenom/image/upload/v1559766698/AutoMart/2019-06-05T20:32:05.292Z.jpg');
cars.push(car);

export default cars;
