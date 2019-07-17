'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default); /* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
var expect = _chai2.default.expect;


describe('FLAG ROUTE TEST', function () {
  describe('CREATE FLAG', function () {
    it('should ha a status of 201', function (done) {
      var body = {
        carId: 1,
        reason: 'Bad price',
        description: 'The price is too high'
      };

      _chai2.default.request(_index2.default).post('/api/v2/flags').send(body).end(function (err, res) {
        expect(res.status).to.equal(201);
        done();
      });
    });
  });

  describe('CREATE FLAG WITH UNDEFINED CARID FIELD', function () {
    it('should ha a status of 400', function (done) {
      var body = {
        reason: 'Bad price',
        description: 'The price is too high'
      };

      _chai2.default.request(_index2.default).post('/api/v2/flags').send(body).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('CREATE FLAG WITH UNDEFINED CARID FIELD', function () {
    it('should ha a status of 400', function (done) {
      var body = {
        reason: 'Bad price',
        description: 'The price is too high'
      };

      _chai2.default.request(_index2.default).post('/api/v2/flags').send(body).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('CREATE FLAG WITH NON NUMBER CARID FIELD', function () {
    it('should ha a status of 400', function (done) {
      var body = {
        carId: '1',
        reason: 'Bad price',
        description: 'The price is too high'
      };

      _chai2.default.request(_index2.default).post('/api/v2/flags').send(body).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('CREATE FLAG WITH UNDEFINED REASON FIELD', function () {
    it('should ha a status of 400', function (done) {
      var body = {
        carId: 1,
        description: 'The price is too high'
      };

      _chai2.default.request(_index2.default).post('/api/v2/flags').send(body).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('CREATE FLAG WITH NON STRING REASON FIELD', function () {
    it('should ha a status of 400', function (done) {
      var body = {
        carId: '1',
        reason: true,
        description: 'The price is too high'
      };

      _chai2.default.request(_index2.default).post('/api/v2/flags').send(body).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('CREATE FLAG WITH UNDEFINED DESCRIPTION FIELD', function () {
    it('should ha a status of 400', function (done) {
      var body = {
        carId: 1,
        reason: 'Bad price'
      };

      _chai2.default.request(_index2.default).post('/api/v2/flags').send(body).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('CREATE FLAG WITH NON STRING DESCRIPTION FIELD', function () {
    it('should ha a status of 400', function (done) {
      var body = {
        carId: 1,
        reason: 'Bad price',
        description: false
      };

      _chai2.default.request(_index2.default).post('/api/v2/flags').send(body).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('CREATE FLAG WITH NON EXISTENCE CARID', function () {
    it('should ha a status of 404', function (done) {
      var body = {
        carId: 0,
        reason: 'Bad price',
        description: 'The price is too high'
      };

      _chai2.default.request(_index2.default).post('/api/v2/flags').send(body).end(function (err, res) {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
});