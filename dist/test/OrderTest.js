'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default); /* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
var expect = _chai2.default.expect;


var orderId = void 0;
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYXZlcGhlbm9tc0BnbWFpbC5jb20iLCJwYXNzIjoiJDJiJDEwJE9oTVlDSkhnSEhxbmZKcDBwSGlRTWVhcEZBc3YzL3RNdDRvTE0zcnFTdUY1ZVFYbnI5V0NLIiwiaWF0IjoxNTYxMjkyOTU3fQ.fnbdbjeC2I-CxNCq7dsV02STHJaYK1U7z292B1WUNBA';

describe('ORDER ROUTE', function () {
  describe('CREATE ORDER', function () {
    describe('CREATE ORDER SUCCESSFULLY', function () {
      it('should have a status of 201', function (done) {
        var body = {
          buyer: 1,
          carId: 2,
          amount: 2650000.87
        };

        _chai2.default.request(_index2.default).post('/api/v2/orders').set('Authorization', token).send(body).end(function (err, res) {
          orderId = res.body.data.id;
          expect(res.body.status).to.equal(201);
          done();
        });
      });
    });

    describe('CREATE ORDER WITH UNDEFINED BUYER FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          carId: 1,
          amount: 2650000.87
        };

        _chai2.default.request(_index2.default).post('/api/v2/orders').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('CREATE ORDER WITH NON NUMBER BUYER', function () {
      it('should have a status of 400', function (done) {
        var body = {
          buyer: '1',
          carId: 1,
          amount: 2650000.87
        };

        _chai2.default.request(_index2.default).post('/api/v2/orders').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('CREATE ORDER WITH UNDEFINED CARID FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          buyer: 1,
          amount: 2650000.87
        };

        _chai2.default.request(_index2.default).post('/api/v2/orders').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('CREATE ORDER WITH NON NUMBER CARID', function () {
      it('should have a status of 400', function (done) {
        var body = {
          buyer: 1,
          carId: '1',
          amount: 2650000.87
        };

        _chai2.default.request(_index2.default).post('/api/v2/orders').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('CREATE ORDER WITH UNDEFINED AMOUNT FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          carId: 1,
          buyer: 1
        };

        _chai2.default.request(_index2.default).post('/api/v2/orders').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('CREATE ORDER WITH NON NUMBER AMOUNT', function () {
      it('should have a status of 400', function (done) {
        var body = {
          buyer: 1,
          carId: 1,
          amount: '2650000.87'
        };

        _chai2.default.request(_index2.default).post('/api/v2/orders').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('CREATE ORDER WITH NON EXISTENCE BUYER', function () {
      it('should have a status of 404', function (done) {
        var body = {
          buyer: 0,
          carId: 2,
          amount: 2650000.87
        };

        _chai2.default.request(_index2.default).post('/api/v2/orders').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('ORDER UPDATE ROUTE', function () {
    describe('UPDATE ORDER', function () {
      it('should have a status of 200', function (done) {
        var body = {
          price: 3650000.87
        };

        _chai2.default.request(_index2.default).patch('/api/v2/orders/' + orderId + '/price').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(200);
          done();
        });
      });
    });

    describe('UPDATE ORDER WITH UNDEFINED PRICE FIELD', function () {
      it('should have a status of 400', function (done) {
        _chai2.default.request(_index2.default).patch('/api/v2/orders/' + orderId + '/price').set('Authorization', token).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('UPDATE ORDER WITH A NON NUMBER PRICE', function () {
      it('should have a status of 400', function (done) {
        var body = {
          price: '3650000.87'
        };

        _chai2.default.request(_index2.default).patch('/api/v2/orders/' + orderId + '/price').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('UPDATE ORDER WITH INVALID ID', function () {
      it('should have a status of 404', function (done) {
        var body = {
          price: 3650000.87
        };

        _chai2.default.request(_index2.default).patch('/api/v2/orders/0/price').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(404);
          done();
        });
      });
    });
  });
});