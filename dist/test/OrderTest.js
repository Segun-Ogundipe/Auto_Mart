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


describe('ORDER POST ROUTE', function () {
  describe('POST 401', function () {
    it('should have a status of 401', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/order/').end(function (err, res) {
        expect(res.body.status).to.equal(401);
        done();
      });
    });
  });

  describe('POST 400', function () {
    it('should have a status of 400', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/order/').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').send({}).end(function (err, res) {
        expect(res.body.status).to.equal(400);
        done();
      });
    });
  });

  describe('POST 404', function () {
    it('should have a status of 404', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/order/').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').send({
        buyer: 3,
        carId: 1,
        amount: 120000
      }).end(function (err, res) {
        expect(res.body.status).to.equal(404);
        done();
      });
    });
  });

  describe('POST 404', function () {
    it('should have a status of 404', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/order/').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').send({
        buyer: 1,
        carId: 3,
        amount: 120000
      }).end(function (err, res) {
        expect(res.body.status).to.equal(404);
        done();
      });
    });
  });

  describe('POST 201', function () {
    it('should have a status of 201', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/order/').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').send({
        buyer: 1,
        carId: 2,
        amount: 120000
      }).end(function (err, res) {
        expect(res.body.status).to.equal(201);
        done();
      });
    });
  });
});

describe('ORDER PATCH ROUTE', function () {
  describe('PATCH 401', function () {
    it('should have a status of 401', function (done) {
      _chai2.default.request(_index2.default).patch('/api/v1/order/1').end(function (err, res) {
        expect(res.body.status).to.equal(401);
        done();
      });
    });
  });

  describe('PATCH 404', function () {
    it('should have a status of 404', function (done) {
      _chai2.default.request(_index2.default).patch('/api/v1/order/3').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').send({
        price: 1000000
      }).end(function (err, res) {
        expect(res.body.status).to.equal(404);
        done();
      });
    });
  });

  describe('PATCH 200', function () {
    it('should have a status of 200', function (done) {
      _chai2.default.request(_index2.default).patch('/api/v1/order/2').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').send({
        price: 1000000
      }).end(function (err, res) {
        expect(res.body.status).to.equal(200);
        done();
      });
    });
  });
});