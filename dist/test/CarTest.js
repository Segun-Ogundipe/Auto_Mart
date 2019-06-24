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


var carId = void 0;
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYXZlcGhlbm9tc0BnbWFpbC5jb20iLCJwYXNzIjoiJDJiJDEwJE9oTVlDSkhnSEhxbmZKcDBwSGlRTWVhcEZBc3YzL3RNdDRvTE0zcnFTdUY1ZVFYbnI5V0NLIiwiaWF0IjoxNTYxMjkyOTU3fQ.fnbdbjeC2I-CxNCq7dsV02STHJaYK1U7z292B1WUNBA';

describe('CAR ROUTE', function () {
  describe('INDEX', function () {
    it('should have a status of 404', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/car').end(function (err, res) {
        expect(res.body.status).to.equal(404);
        done();
      });
    });
  });

  describe('CAR CREATE ROUTE', function () {
    describe('CREATE CAR', function () {
      it('should have a status of 201', function (done) {
        var body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 'Truck'
        };

        _chai2.default.request(_index2.default).post('/api/v2/car').set('Authorization', token).send(body).end(function (err, res) {
          carId = res.body.data.id;
          expect(res.body.status).to.equal(201);
          done();
        });
      });
    });

    describe('CREATE CAR WITH AN UNDEFINED OWNER FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 'Truck'
        };

        _chai2.default.request(_index2.default).post('/api/v2/car').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('CREATE CAR WITH A NON NUMBER OWNER', function () {
      it('should have a status of 400', function (done) {
        var body = {
          owner: '1',
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 'Truck'
        };

        _chai2.default.request(_index2.default).post('/api/v2/car').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('CREATE CAR WITH INVALID OWNER', function () {
      it('should have a status of 404', function (done) {
        var body = {
          owner: 0,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 'Truck'
        };

        _chai2.default.request(_index2.default).post('/api/v2/car').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(404);
          done();
        });
      });
    });

    describe('CREATE CAR WITH AN UNDEFINED STATE FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          owner: 1,
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 'Truck'
        };

        _chai2.default.request(_index2.default).post('/api/v2/car').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('CREATE CAR WITH A NON STRING STATE FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          owner: 1,
          state: true,
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 'Truck'
        };

        _chai2.default.request(_index2.default).post('/api/v2/car').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('CREATE CAR WITH INCORRECT STATE FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          owner: 1,
          state: 'use',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 'Truck'
        };

        _chai2.default.request(_index2.default).post('/api/v2/car').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('CREATE CAR WITH UNDEFINED PRICE FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          owner: 1,
          state: 'new',
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 'Truck'
        };

        _chai2.default.request(_index2.default).post('/api/v2/car').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('CREATE CAR WITH A NON NUMBER PRICE FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          owner: 1,
          state: 'new',
          price: '100000.98',
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 'Truck'
        };

        _chai2.default.request(_index2.default).post('/api/v2/car').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('CREATE CAR WITH UNDEFINED MANUFACTURER FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          model: 'F50',
          bodyType: 'Truck'
        };

        _chai2.default.request(_index2.default).post('/api/v2/car').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('CREATE CAR WITH A NON STRING MANUFACTURER FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          manufacturer: true,
          model: 'F50',
          bodyType: 'Truck'
        };

        _chai2.default.request(_index2.default).post('/api/v2/car').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('CREATE CAR WITH UNDEFINED MODEL FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          bodyType: 'Truck'
        };

        _chai2.default.request(_index2.default).post('/api/v2/car').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('CREATE CAR WITH A NON STRING MODEL FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 50,
          bodyType: 'Truck'
        };

        _chai2.default.request(_index2.default).post('/api/v2/car').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('CREATE CAR WITH UNDEFINED BODYTYPE FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50'
        };

        _chai2.default.request(_index2.default).post('/api/v2/car').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('CREATE CAR WITH A NON STRING BODYTYPE FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 1234
        };

        _chai2.default.request(_index2.default).post('/api/v2/car').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('CAR UPDATE ROUTE', function () {
    describe('UPDATE CAR\'S PRICE', function () {
      it('should have a status of 200', function (done) {
        var body = {
          price: 150000.98
        };

        _chai2.default.request(_index2.default).patch('/api/v2/cars/' + carId + '/price').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(200);
          done();
        });
      });
    });

    describe('UPDATE CAR\'S PRICE WITH UNDEFINED PRICE FIELD', function () {
      it('should have a status of 400', function (done) {
        _chai2.default.request(_index2.default).patch('/api/v2/cars/' + carId + '/price').set('Authorization', token).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('UPDATE CAR\'S PRICE WITH A NON NUMBER PRICE', function () {
      it('should have a status of 400', function (done) {
        var body = {
          price: '23534566'
        };

        _chai2.default.request(_index2.default).patch('/api/v2/cars/' + carId + '/price').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('UPDATE CAR\'S STATUS', function () {
      it('should have a status of 200', function (done) {
        var body = {
          orderId: 1,
          status: 'sold'
        };

        _chai2.default.request(_index2.default).patch('/api/v2/cars/1/status').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(200);
          done();
        });
      });
    });

    describe('UPDATE CAR\'S STATUS WITH WRONG ORDER', function () {
      it('should have a status of 400', function (done) {
        var body = {
          orderId: 1,
          status: 'sold'
        };

        _chai2.default.request(_index2.default).patch('/api/v2/cars/' + carId + '/status').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('UPDATE A SOLD CAR', function () {
      it('should have a status of 400', function (done) {
        var body = {
          orderId: 1,
          status: 'sold'
        };

        _chai2.default.request(_index2.default).patch('/api/v2/cars/1/status').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('UPDATE CAR\'S STATUS WITH UNDEFINED ORDERID FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          status: 'sold'
        };

        _chai2.default.request(_index2.default).patch('/api/v2/cars/' + carId + '/status').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('UPDATE CAR\'S STATUS WITH A NON NUMBER ORDERID', function () {
      it('should have a status of 400', function (done) {
        var body = {
          orderId: '1',
          status: 'sold'
        };

        _chai2.default.request(_index2.default).patch('/api/v2/cars/' + carId + '/status').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('UPDATE CAR\'S STATUS WITH UNDEFINED STATUS FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          orderId: 1
        };

        _chai2.default.request(_index2.default).patch('/api/v2/cars/' + carId + '/status').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('UPDATE CAR\'S STATUS WITH A NON STRING STATUS', function () {
      it('should have a status of 400', function (done) {
        var body = {
          orderId: 1,
          status: true
        };

        _chai2.default.request(_index2.default).patch('/api/v2/cars/' + carId + '/status').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('UPDATE CAR\'S STATUS WITH STATUS OTHER THAN \'SOLD\'', function () {
      it('should have a status of 400', function (done) {
        var body = {
          orderId: 1,
          status: 'available'
        };

        _chai2.default.request(_index2.default).patch('/api/v2/cars/' + carId + '/status').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('UPDATE CAR\'S STATUS WITH STATUS WIH INVALID ID', function () {
      it('should have a status of 404', function (done) {
        var body = {
          orderId: 1,
          status: 'available'
        };

        _chai2.default.request(_index2.default).patch('/api/v2/cars/0/status').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('CAR STATUS ROUTE', function () {
    describe('GET ALL AVAILABLE CARS', function () {
      it('should have a status of 200', function (done) {
        _chai2.default.request(_index2.default).get('/api/v2/cars?status=available').set('Authorization', token).end(function (err, res) {
          expect(res.body.status).to.equal(200);
          done();
        });
      });
    });

    describe('GET ALL AVAILABLE CARS BY MINPRICE', function () {
      it('should have a status of 200', function (done) {
        _chai2.default.request(_index2.default).get('/api/v2/cars?status=available&minPrice=100').set('Authorization', token).end(function (err, res) {
          expect(res.body.status).to.equal(200);
          done();
        });
      });
    });

    describe('GET ALL AVAILABLE CARS BY MAXPRICE', function () {
      it('should have a status of 200', function (done) {
        _chai2.default.request(_index2.default).get('/api/v2/cars?status=available&maxPrice=1000000000').set('Authorization', token).end(function (err, res) {
          expect(res.body.status).to.equal(200);
          done();
        });
      });
    });

    describe('GET ALL AVAILABLE CARS BY STATE', function () {
      it('should have a status of 200', function (done) {
        _chai2.default.request(_index2.default).get('/api/v2/cars?status=available&state=new').set('Authorization', token).end(function (err, res) {
          expect(res.body.status).to.equal(200);
          done();
        });
      });
    });

    describe('GET ALL AVAILABLE CARS BY MANUFACTURER', function () {
      it('should have a status of 200', function (done) {
        _chai2.default.request(_index2.default).get('/api/v2/cars?status=available&manufacturer=Ford').set('Authorization', token).end(function (err, res) {
          expect(res.body.status).to.equal(200);
          done();
        });
      });
    });

    describe('GET ALL AVAILABLE CARS BY RANGE', function () {
      it('should have a status of 200', function (done) {
        _chai2.default.request(_index2.default).get('/api/v2/cars?status=available&minPrice=100&maxPrice=10000000000').set('Authorization', token).end(function (err, res) {
          expect(res.body.status).to.equal(200);
          done();
        });
      });
    });

    describe('GET ALL AVAILABLE CARS BY RANGE AND STATE', function () {
      it('should have a status of 200', function (done) {
        _chai2.default.request(_index2.default).get('/api/v2/cars?status=available&minPrice=100&maxPrice=10000000000&state=new').set('Authorization', token).end(function (err, res) {
          expect(res.body.status).to.equal(200);
          done();
        });
      });
    });

    describe('GET ALL AVAILABLE CARS BY MINPRICE AND STATE', function () {
      it('should have a status of 200', function (done) {
        _chai2.default.request(_index2.default).get('/api/v2/cars?status=available&minPrice=100&state=new').set('Authorization', token).end(function (err, res) {
          expect(res.body.status).to.equal(200);
          done();
        });
      });
    });

    describe('GET ALL AVAILABLE CARS BY MAXPRICE AND STATE', function () {
      it('should have a status of 200', function (done) {
        _chai2.default.request(_index2.default).get('/api/v2/cars?status=available&maxPrice=1000000000&state=new').set('Authorization', token).end(function (err, res) {
          expect(res.body.status).to.equal(200);
          done();
        });
      });
    });

    describe('GET ALL SOLD CARS', function () {
      it('should have a status of 404', function (done) {
        _chai2.default.request(_index2.default).get('/api/v2/cars?status=available&maxPrice=1').set('Authorization', token).end(function (err, res) {
          expect(res.body.status).to.equal(404);
          done();
        });
      });
    });

    describe('GET ALL AVAILABLE CARS WITHOUT STATUS PARAM', function () {
      it('should have a status of 400', function (done) {
        _chai2.default.request(_index2.default).get('/api/v2/cars').set('Authorization', token).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('GET ALL AVAILABLE CARS WITH INCORRECT STATUS PARAM', function () {
      it('should have a status of 400', function (done) {
        _chai2.default.request(_index2.default).get('/api/v2/cars?status=sold').set('Authorization', token).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('GET ALL AVAILABLE CARS WITH INVALID MINPRICE PARAM', function () {
      it('should have a status of 400', function (done) {
        _chai2.default.request(_index2.default).get('/api/v2/cars?status=available&minPrice=we').set('Authorization', token).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('GET ALL AVAILABLE CARS WITH INVALID MAXPRICE PARAM', function () {
      it('should have a status of 400', function (done) {
        _chai2.default.request(_index2.default).get('/api/v2/cars?status=available&maxPrice=we').set('Authorization', token).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });

    describe('GET ALL AVAILABLE CARS WITH INVALID STATE PARAM', function () {
      it('should have a status of 400', function (done) {
        _chai2.default.request(_index2.default).get('/api/v2/cars?status=available&state=we').set('Authorization', token).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('GET CAR ROUTE', function () {
    describe('GET CAR WITH ID', function () {
      it('should have a status of 200', function (done) {
        _chai2.default.request(_index2.default).get('/api/v2/cars/' + carId).set('Authorization', token).end(function (err, res) {
          expect(res.body.status).to.equal(200);
          done();
        });
      });
    });

    describe('GET CAR WITH ID', function () {
      it('should have a status of 404', function (done) {
        _chai2.default.request(_index2.default).get('/api/v2/cars/0').set('Authorization', token).end(function (err, res) {
          expect(res.body.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('CAR ADMIN ROUTE', function () {
    describe('VIEW ALL CARS', function () {
      it('should have a status of 200', function (done) {
        _chai2.default.request(_index2.default).get('/api/v2/admin/cars').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYXZlcGhlbm9tc0BnbWFpbC5jb20iLCJwYXNzIjoiJDJiJDEwJE9oTVlDSkhnSEhxbmZKcDBwSGlRTWVhcEZBc3YzL3RNdDRvTE0zcnFTdUY1ZVFYbnI5V0NLIiwiaWF0IjoxNTYxMjkyOTU3fQ.fnbdbjeC2I-CxNCq7dsV02STHJaYK1U7z292B1WUNBA').end(function (err, res) {
          expect(res.body.status).to.equal(200);
          done();
        });
      });
    });

    describe('DELETE CAR', function () {
      it('should have a status of 204', function (done) {
        _chai2.default.request(_index2.default).delete('/api/v2/admin/cars/' + carId).set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYXZlcGhlbm9tc0BnbWFpbC5jb20iLCJwYXNzIjoiJDJiJDEwJE9oTVlDSkhnSEhxbmZKcDBwSGlRTWVhcEZBc3YzL3RNdDRvTE0zcnFTdUY1ZVFYbnI5V0NLIiwiaWF0IjoxNTYxMjkyOTU3fQ.fnbdbjeC2I-CxNCq7dsV02STHJaYK1U7z292B1WUNBA').end(function (err, res) {
          expect(res.status).to.equal(204);
          done();
        });
      });
    });

    describe('DELETE CAR WITH INVALID ID', function () {
      it('should have a status of 404', function (done) {
        _chai2.default.request(_index2.default).delete('/api/v2/admin/cars/0').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYXZlcGhlbm9tc0BnbWFpbC5jb20iLCJwYXNzIjoiJDJiJDEwJE9oTVlDSkhnSEhxbmZKcDBwSGlRTWVhcEZBc3YzL3RNdDRvTE0zcnFTdUY1ZVFYbnI5V0NLIiwiaWF0IjoxNTYxMjkyOTU3fQ.fnbdbjeC2I-CxNCq7dsV02STHJaYK1U7z292B1WUNBA').end(function (err, res) {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
});