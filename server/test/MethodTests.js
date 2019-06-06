/* eslint-disable no-undef */
import chai from 'chai';

import helper from '../helpers/helper';
import Car from '../models/carModel';
import User from '../models/userModel';
import CarResponse from '../models/carResponse';
import Error from '../models/error';
import Success from '../models/success';
import UserResponse from '../models/userResponse';

const { expect } = chai;

describe('HELPER', () => {
  it('should return 1', () => {
    const array = [];
    const id = helper.getNewId(array);

    expect(id).to.equal(1);
  });
});

describe('CAR MODEL', () => {
  it('should set date created', () => {
    const car = new Car();
    const date = new Date();
    car.setCreatedOn(date);

    expect(car.getCreatedOn()).to.equal(date);
  });
});

describe('CAR RESPONSE', () => {
  it('should create a car response object', () => {
    const car = new Car(1, 1, 'new', 100000, 'Ford', 'F50', 'Truck');
    const user = new User(1, 'sehbchb@jncj.cocj', 'Segun', 'Oguns', 'Male', 'jggscwww', '10, 20 street', true);
    const response = new CarResponse(car, user);

    expect(response.getId()).to.equal(1);
    expect(response.getEmail()).to.equal('sehbchb@jncj.cocj');
    expect(response.getManufacturer()).to.equal('Ford');
    expect(response.getModel()).to.equal('F50');
    expect(response.getPrice()).to.equal(100000);
    expect(response.getState()).to.equal('new');
    expect(response.getStatus()).to.equal('available');
    expect(response.getBodyType()).to.equal('Truck');
  });
});

describe('USER RESPONSE', () => {
  it('should create a user response object', () => {
    const user = new User(1, 'sehbchb@jncj.cocj', 'Segun', 'Oguns', 'Male', 'jggscwww', '10, 20 street', true);
    const response = new UserResponse(user, 'jhghjkihucikjsnjcbskj');

    expect(response.getToken()).to.equal('jhghjkihucikjsnjcbskj');
    expect(response.getId()).to.equal(1);
    expect(response.getEmail()).to.equal('sehbchb@jncj.cocj');
    expect(response.getFirstName()).to.equal('Segun');
    expect(response.getLastName()).to.equal('Oguns');
    expect(response.getGender()).to.equal('Male');
    expect(response.getAddress()).to.equal('10, 20 street');
    expect(response.getIsAdmin()).to.equal(true);
  });
});

describe('ERROR MODEL', () => {
  it('should create an error object', () => {
    const error = new Error(500, 'Server Error');

    expect(error.getStatus()).to.equal(500);
    expect(error.getMessage()).to.equal('Server Error');
  });
});

describe('SUCCESS MODEL', () => {
  it('should create a success object', () => {
    const success = new Success(200, 'Success');

    expect(success.getStatus()).to.equal(200);
    expect(success.getData()).to.equal('Success');
  });
});
