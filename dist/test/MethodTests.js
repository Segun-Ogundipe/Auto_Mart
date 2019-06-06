'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _helper = require('../helpers/helper');

var _helper2 = _interopRequireDefault(_helper);

var _CarModel = require('../models/CarModel');

var _CarModel2 = _interopRequireDefault(_CarModel);

var _UserModel = require('../models/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _CarResponse = require('../models/CarResponse');

var _CarResponse2 = _interopRequireDefault(_CarResponse);

var _ErrorModel = require('../models/ErrorModel');

var _ErrorModel2 = _interopRequireDefault(_ErrorModel);

var _SuccessModel = require('../models/SuccessModel');

var _SuccessModel2 = _interopRequireDefault(_SuccessModel);

var _UserResponse = require('../models/UserResponse');

var _UserResponse2 = _interopRequireDefault(_UserResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
var expect = _chai2.default.expect;


describe('HELPER', function () {
  it('should return 1', function () {
    var array = [];
    var id = _helper2.default.getNewId(array);

    expect(id).to.equal(1);
  });
});

describe('CAR MODEL', function () {
  it('should set date created', function () {
    var car = new _CarModel2.default();
    var date = new Date();
    car.setCreatedOn(date);

    expect(car.getCreatedOn()).to.equal(date);
  });
});

describe('CAR RESPONSE', function () {
  it('should create a car response object', function () {
    var car = new _CarModel2.default(1, 1, 'new', 100000, 'Ford', 'F50', 'Truck');
    var user = new _UserModel2.default(1, 'sehbchb@jncj.cocj', 'Segun', 'Oguns', 'Male', 'jggscwww', '10, 20 street', true);
    var response = new _CarResponse2.default(car, user);

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

describe('USER RESPONSE', function () {
  it('should create a user response object', function () {
    var user = new _UserModel2.default(1, 'sehbchb@jncj.cocj', 'Segun', 'Oguns', 'Male', 'jggscwww', '10, 20 street', true);
    var response = new _UserResponse2.default(user, 'jhghjkihucikjsnjcbskj');

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

describe('ERROR MODEL', function () {
  it('should create an error object', function () {
    var error = new _ErrorModel2.default(500, 'Server Error');

    expect(error.getStatus()).to.equal(500);
    expect(error.getMessage()).to.equal('Server Error');
  });
});

describe('SUCCESS MODEL', function () {
  it('should create a success object', function () {
    var success = new _SuccessModel2.default(200, 'Success');

    expect(success.getStatus()).to.equal(200);
    expect(success.getData()).to.equal('Success');
  });
});