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


describe('CAR ROUTE', function () {
  describe('POST 401', function () {
    it('should have a status of 401', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/car/').end(function (err, res) {
        expect(res.body.status).to.equal(401);
        done();
      });
    });
  });

  describe('POST 201', function () {
    it('should have a status of 201', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/car/').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').send({
        owner: 1,
        state: 'new',
        price: 5000,
        manufacturer: 'BMW',
        model: 'v9',
        bodyType: 'trucks'
      }).end(function (err, res) {
        expect(res.body.status).to.equal(201);
        expect(res.body).to.be.a('object');
        expect(err).to.equal(null);
        done();
      });
    }).timeout(0);
  });

  describe('POST 401', function () {
    it('should have a status of 401', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/car/').set('Authorization', 'Bearer JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').send({
        owner: 1,
        state: 'new',
        price: 5000,
        manufacturer: 'BMW',
        model: 'v9',
        bodyType: 'trucks'
      }).end(function (err, res) {
        expect(res.body.status).to.equal(401);
        expect(res.body).to.be.a('object');
        expect(err).to.equal(null);
        done();
      });
    }).timeout(0);
  });

  describe('POST 400', function () {
    it('should have a status of 400', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/car/').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').send({
        owner: 1,
        state: 'new',
        price: 5000,
        manufacturer: 'BMW',
        model: 'v9'
      }).end(function (err, res) {
        expect(res.body.status).to.equal(400);
        expect(err).to.equal(null);
        done();
      });
    }).timeout(0);
  });

  describe('POST 404', function () {
    it('should have a status of 404', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/car/').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').send({
        owner: 2,
        state: 'new',
        price: 5000,
        manufacturer: 'BMW',
        model: 'v9',
        bodyType: 'trucks'
      }).end(function (err, res) {
        expect(res.body.status).to.equal(404);
        expect(err).to.equal(null);
        done();
      });
    }).timeout(0);
  });

  describe('PATCH 401', function () {
    it('should have a status of 401', function (done) {
      _chai2.default.request(_index2.default).patch('/api/v1/car/1').end(function (err, res) {
        expect(res.body.status).to.equal(401);
        done();
      });
    });
  });

  describe('PATCH 200', function () {
    it('should have a status of 200', function (done) {
      _chai2.default.request(_index2.default).patch('/api/v1/car/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').send({
        price: 200000
      }).end(function (err, res) {
        expect(res.body.status).to.equal(200);
        expect(err).to.equal(null);
        done();
      });
    });
  });

  describe('PATCH 200', function () {
    it('should have a status of 200', function (done) {
      _chai2.default.request(_index2.default).patch('/api/v1/car/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').send({
        status: 'available'
      }).end(function (err, res) {
        expect(res.body.status).to.equal(200);
        expect(err).to.equal(null);
        done();
      });
    });
  });

  describe('PATCH 404', function () {
    it('should have a status of 404', function (done) {
      _chai2.default.request(_index2.default).patch('/api/v1/car/3').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').send({
        status: 'available'
      }).end(function (err, res) {
        expect(res.body.status).to.equal(404);
        expect(err).to.equal(null);
        done();
      });
    });
  });

  describe('GET 401', function () {
    it('should have a status of 401', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/car/1').end(function (err, res) {
        expect(res.body.status).to.equal(401);
        done();
      });
    });
  });

  describe('GET 404', function () {
    it('should have a status of 404', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/car/3').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').end(function (err, res) {
        expect(res.body.status).to.equal(404);
        expect(err).to.equal(null);
        done();
      });
    });
  });

  describe('GET 200', function () {
    it('should have a status of 200', function (done) {
      _chai2.default.request(_index2.default).patch('/api/v1/car/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').end(function (err, res) {
        expect(res.body).to.be.a('object');
        expect(res.body.status).to.equal(200);
        expect(err).to.equal(null);
        done();
      });
    });
  });

  describe('GET 401', function () {
    it('should have a status of 401', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/car?status=available').end(function (err, res) {
        expect(res.body.status).to.equal(401);
        done();
      });
    });
  });

  describe('GET 200', function () {
    it('should have a status of 200', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/car?status=available').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').end(function (err, res) {
        expect(res.body.status).to.equal(200);
        expect(err).to.equal(null);
        done();
      });
    });
  });

  describe('GET 200', function () {
    it('should have a status of 200', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/car?status=sold').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').end(function (err, res) {
        expect(res.body.status).to.equal(200);
        expect(err).to.equal(null);
        done();
      });
    });
  });

  describe('GET 200', function () {
    it('should have a status of 200', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/car?status=available&minPrice=1000&maxPrice=2000000').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').end(function (err, res) {
        expect(res.body.status).to.equal(200);
        expect(err).to.equal(null);
        done();
      });
    });
  });

  describe('DELETE 401', function () {
    it('should have a status of 401', function (done) {
      _chai2.default.request(_index2.default).delete('/api/v1/car/1').end(function (err, res) {
        expect(res.body.status).to.equal(401);
        done();
      });
    });
  });

  describe('DELETE 404', function () {
    it('should have a status of 404', function (done) {
      _chai2.default.request(_index2.default).delete('/api/v1/car/3').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').end(function (err, res) {
        expect(res.body.status).to.equal(404);
        expect(err).to.equal(null);
        done();
      });
    });
  });

  describe('DELETE 200', function () {
    it('should have a status of 200', function (done) {
      _chai2.default.request(_index2.default).delete('/api/v1/car/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').end(function (err, res) {
        expect(res.body.status).to.equal(200);
        expect(err).to.equal(null);
        done();
      });
    });
  });

  describe('GET 401', function () {
    it('should have a status of 401', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/cars').end(function (err, res) {
        expect(res.body.status).to.equal(401);
        done();
      });
    });
  });

  describe('GET 200', function () {
    it('should have a status of 200', function (done) {
      _chai2.default.request(_index2.default).get('/api/v1/cars').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8').end(function (err, res) {
        expect(res.body.status).to.equal(200);
        expect(err).to.equal(null);
        done();
      });
    });
  });
});