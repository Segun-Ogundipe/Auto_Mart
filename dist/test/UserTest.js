'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default); /* eslint-disable no-undef */
var expect = _chai2.default.expect;


describe('SIGNUP ROUTE', function () {
  describe('POST 400', function () {
    it('should have a status of 400', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').end(function (err, res) {
        expect(res.body.status).to.equal(400);
        done();
      });
    });
  });

  describe('POST 201', function () {
    it('should have a status of 201', function (done) {
      var body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        address: '12, ifelodun',
        gender: 'male',
        isAdmin: true
      };

      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(body).end(function (err, res) {
        expect(res.body.status).to.equal(201);
        expect(res.body).to.be.a('object');
        done();
      });
    });
  });

  describe('POST 400', function () {
    it('should have a status of 400', function (done) {
      var body = {
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        address: '12, ifelodun',
        gender: 'male',
        isAdmin: true
      };

      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(body).end(function (err, res) {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done();
      });
    });
  });

  describe('POST 400', function () {
    it('should have a status of 400', function (done) {
      var body = {
        email: 'davephenom@gmail.com',
        lastName: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        address: '12, ifelodun',
        gender: 'male',
        isAdmin: true
      };

      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(body).end(function (err, res) {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done();
      });
    });
  });

  describe('POST 400', function () {
    it('should have a status of 400', function (done) {
      var body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        password: 'jhfdcthjk24r44',
        address: '12, ifelodun',
        gender: 'male',
        isAdmin: true
      };

      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(body).end(function (err, res) {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done();
      });
    });
  });

  describe('POST 400', function () {
    it('should have a status of 400', function (done) {
      var body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        address: '12, ifelodun',
        gender: 'male',
        isAdmin: true
      };

      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(body).end(function (err, res) {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done();
      });
    });
  });

  describe('POST 400', function () {
    it('should have a status of 400', function (done) {
      var body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        gender: 'male',
        isAdmin: true
      };

      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(body).end(function (err, res) {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done();
      });
    });
  });

  describe('POST 400', function () {
    it('should have a status of 400', function (done) {
      var body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        address: '12, ifelodun',
        isAdmin: true
      };

      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(body).end(function (err, res) {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done();
      });
    });
  });

  describe('POST 400', function () {
    it('should have a status of 400', function (done) {
      var body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        address: '12, ifelodun',
        gender: 'male'
      };

      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(body).end(function (err, res) {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done();
      });
    });
  });

  describe('POST 400', function () {
    it('should have a status of 400', function (done) {
      var body = {
        email: 'davephenomgmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        address: '12, ifelodun',
        gender: 'male',
        isAdmin: true
      };

      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(body).end(function (err, res) {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done();
      });
    });
  });

  describe('POST 400', function () {
    it('should have a status of 400', function (done) {
      var body = {
        email: 'davepheno@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 'jhfdct',
        address: '12, ifelodun',
        gender: 'male',
        isAdmin: true
      };

      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(body).end(function (err, res) {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done();
      });
    });
  });

  describe('POST 409', function () {
    it('should have a status of 409', function (done) {
      var body = {
        email: 'davephenom@gmail.com',
        firstName: 'Segun',
        lastName: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        address: '12, ifelodun',
        gender: 'male',
        isAdmin: true
      };

      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').send(body).end(function (err, res) {
        expect(res.body.status).to.equal(409);
        expect(res.body).to.be.a('object');
        done();
      });
    });
  });
});

describe('SIGNIN ROUTE', function () {
  describe('POST 400', function () {
    it('should have a status of 400', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/signin').end(function (err, res) {
        expect(res.body.status).to.equal(400);
        done();
      });
    });
  });

  describe('POST 400', function () {
    it('should have a status of 400', function (done) {
      var body = {
        email: 'davephengmail.com',
        password: 'jhfdcthjk24r44'
      };
      _chai2.default.request(_index2.default).post('/api/v1/auth/signin').send(body).end(function (err, res) {
        expect(res.body.status).to.equal(400);
        done();
      });
    });
  });

  describe('POST 400', function () {
    it('should have a status of 400', function (done) {
      var body = {
        email: 'davephen@gmail.com',
        password: 'jhfd'
      };
      _chai2.default.request(_index2.default).post('/api/v1/auth/signin').send(body).end(function (err, res) {
        expect(res.body.status).to.equal(400);
        done();
      });
    });
  });

  describe('POST 422', function () {
    it('should have a status of 422', function (done) {
      var body = {
        email: 'davephen@gmail.com',
        password: 'jhfdcthjk24r44'
      };
      _chai2.default.request(_index2.default).post('/api/v1/auth/signin').send(body).end(function (err, res) {
        expect(res.body.status).to.equal(422);
        done();
      });
    });
  });

  describe('POST 422', function () {
    it('should have a status of 422', function (done) {
      var body = {
        email: 'davephen@gmail.com',
        password: 'jhfdcthjk24r44'
      };
      _chai2.default.request(_index2.default).post('/api/v1/auth/signin').send(body).end(function (err, res) {
        expect(res.body.status).to.equal(422);
        done();
      });
    });
  });

  describe('POST 200', function () {
    it('should have a status of 200', function (done) {
      var body = {
        email: 'davephenom@gmail.com',
        password: 'jhfdcthjk24r44'
      };

      _chai2.default.request(_index2.default).post('/api/v1/auth/signin').send(body).end(function (err, res) {
        expect(res.body.status).to.equal(200);
        expect(res.body).to.be.a('object');
        done();
      });
    });
  });

  describe('POST 400', function () {
    it('should have a status of 400', function (done) {
      var body = {
        email: 'davephenom@gmail.com'
      };

      _chai2.default.request(_index2.default).post('/api/v1/auth/signin').send(body).end(function (err, res) {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done();
      });
    });
  });

  describe('POST 422', function () {
    it('should have a status of 422', function (done) {
      var body = {
        email: 'davephenom@gmail.com',
        password: 'jhfdcthjk24r4'
      };

      _chai2.default.request(_index2.default).post('/api/v1/auth/signin').send(body).end(function (err, res) {
        expect(res.body.status).to.equal(422);
        expect(res.body).to.be.a('object');
        done();
      });
    });
  });
});
