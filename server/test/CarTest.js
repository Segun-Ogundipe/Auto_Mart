/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

let carId;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYXZlcGhlbm9tc0BnbWFpbC5jb20iLCJwYXNzIjoiJDJiJDEwJE9oTVlDSkhnSEhxbmZKcDBwSGlRTWVhcEZBc3YzL3RNdDRvTE0zcnFTdUY1ZVFYbnI5V0NLIiwiaWF0IjoxNTYxMjkyOTU3fQ.fnbdbjeC2I-CxNCq7dsV02STHJaYK1U7z292B1WUNBA'

describe('CAR ROUTE', () => {
  describe('INDEX', () => {
    it('should have a status of 404', (done) => {
      chai.request(app).post('/api/v1/car')
        .end((err, res) => {
          expect(res.body.status).to.equal(404);
          done();
        });
    });
  });

  describe('CAR CREATE ROUTE', () => {
    describe('CREATE CAR', () => {
      it('should have a status of 201', (done) => {
        const body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 'Truck',
        };

        chai.request(app).post('/api/v2/car')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            carId = res.body.data.id;
            expect(res.body.status).to.equal(201);
            done();
          });
      });
    });

    describe('CREATE CAR WITH AN UNDEFINED OWNER FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 'Truck',
        };

        chai.request(app).post('/api/v2/car')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('CREATE CAR WITH A NON NUMBER OWNER', () => {
      it('should have a status of 400', (done) => {
        const body = {
          owner: '1',
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 'Truck',
        };

        chai.request(app).post('/api/v2/car')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('CREATE CAR WITH INVALID OWNER', () => {
      it('should have a status of 404', (done) => {
        const body = {
          owner: 0,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 'Truck',
        };

        chai.request(app).post('/api/v2/car')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(404);
            done();
          });
      });
    });

    describe('CREATE CAR WITH AN UNDEFINED STATE FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          owner: 1,
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 'Truck',
        };

        chai.request(app).post('/api/v2/car')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('CREATE CAR WITH A NON STRING STATE FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          owner: 1,
          state: true,
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 'Truck',
        };

        chai.request(app).post('/api/v2/car')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('CREATE CAR WITH INCORRECT STATE FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          owner: 1,
          state: 'use',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 'Truck',
        };

        chai.request(app).post('/api/v2/car')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('CREATE CAR WITH UNDEFINED PRICE FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          owner: 1,
          state: 'new',
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 'Truck',
        };

        chai.request(app).post('/api/v2/car')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('CREATE CAR WITH A NON NUMBER PRICE FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          owner: 1,
          state: 'new',
          price: '100000.98',
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 'Truck',
        };

        chai.request(app).post('/api/v2/car')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('CREATE CAR WITH UNDEFINED MANUFACTURER FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          model: 'F50',
          bodyType: 'Truck',
        };

        chai.request(app).post('/api/v2/car')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('CREATE CAR WITH A NON STRING MANUFACTURER FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          manufacturer: true,
          model: 'F50',
          bodyType: 'Truck',
        };

        chai.request(app).post('/api/v2/car')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('CREATE CAR WITH UNDEFINED MODEL FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          bodyType: 'Truck',
        };

        chai.request(app).post('/api/v2/car')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('CREATE CAR WITH A NON STRING MODEL FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 50,
          bodyType: 'Truck',
        };

        chai.request(app).post('/api/v2/car')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('CREATE CAR WITH UNDEFINED BODYTYPE FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
        };

        chai.request(app).post('/api/v2/car')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('CREATE CAR WITH A NON STRING BODYTYPE FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          bodyType: 1234,
        };

        chai.request(app).post('/api/v2/car')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });
  });

  describe('CAR UPDATE ROUTE', () => {
    describe('UPDATE CAR\'S PRICE', () => {
      it('should have a status of 200', (done) => {
        const body = {
          price: 150000.98,
        };

        chai.request(app).patch(`/api/v2/cars/${carId}/price`)
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });
    });

    describe('UPDATE CAR\'S PRICE WITH UNDEFINED PRICE FIELD', () => {
      it('should have a status of 400', (done) => {
        chai.request(app).patch(`/api/v2/cars/${carId}/price`)
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('UPDATE CAR\'S PRICE WITH A NON NUMBER PRICE', () => {
      it('should have a status of 400', (done) => {
        const body = {
          price: '23534566',
        };

        chai.request(app).patch(`/api/v2/cars/${carId}/price`)
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('UPDATE CAR\'S STATUS', () => {
      it('should have a status of 200', (done) => {
        const body = {
          orderId: 1,
          status: 'sold',
        };

        chai.request(app).patch('/api/v2/cars/1/status')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });
    });

    describe('UPDATE CAR\'S STATUS WITH WRONG ORDER', () => {
      it('should have a status of 400', (done) => {
        const body = {
          orderId: 1,
          status: 'sold',
        };

        chai.request(app).patch(`/api/v2/cars/${carId}/status`)
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('UPDATE A SOLD CAR', () => {
      it('should have a status of 400', (done) => {
        const body = {
          orderId: 1,
          status: 'sold',
        };

        chai.request(app).patch('/api/v2/cars/1/status')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('UPDATE CAR\'S STATUS WITH UNDEFINED ORDERID FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          status: 'sold',
        };

        chai.request(app).patch(`/api/v2/cars/${carId}/status`)
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('UPDATE CAR\'S STATUS WITH A NON NUMBER ORDERID', () => {
      it('should have a status of 400', (done) => {
        const body = {
          orderId: '1',
          status: 'sold',
        };

        chai.request(app).patch(`/api/v2/cars/${carId}/status`)
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('UPDATE CAR\'S STATUS WITH UNDEFINED STATUS FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          orderId: 1,
        };

        chai.request(app).patch(`/api/v2/cars/${carId}/status`)
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('UPDATE CAR\'S STATUS WITH A NON STRING STATUS', () => {
      it('should have a status of 400', (done) => {
        const body = {
          orderId: 1,
          status: true,
        };

        chai.request(app).patch(`/api/v2/cars/${carId}/status`)
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('UPDATE CAR\'S STATUS WITH STATUS OTHER THAN \'SOLD\'', () => {
      it('should have a status of 400', (done) => {
        const body = {
          orderId: 1,
          status: 'available',
        };

        chai.request(app).patch(`/api/v2/cars/${carId}/status`)
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('UPDATE CAR\'S STATUS WITH STATUS WIH INVALID ID', () => {
      it('should have a status of 404', (done) => {
        const body = {
          orderId: 1,
          status: 'available',
        };

        chai.request(app).patch('/api/v2/cars/0/status')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(404);
            done();
          });
      });
    });
  });

  describe('CAR STATUS ROUTE', () => {
    describe('GET ALL AVAILABLE CARS', () => {
      it('should have a status of 200', (done) => {
        chai.request(app).get('/api/v2/cars?status=available')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });
    });

    describe('GET ALL AVAILABLE CARS BY MINPRICE', () => {
      it('should have a status of 200', (done) => {
        chai.request(app).get('/api/v2/cars?status=available&minPrice=100')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });
    });

    describe('GET ALL AVAILABLE CARS BY MAXPRICE', () => {
      it('should have a status of 200', (done) => {
        chai.request(app).get('/api/v2/cars?status=available&maxPrice=1000000000')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });
    });

    describe('GET ALL AVAILABLE CARS BY STATE', () => {
      it('should have a status of 200', (done) => {
        chai.request(app).get('/api/v2/cars?status=available&state=new')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });
    });

    describe('GET ALL AVAILABLE CARS BY MANUFACTURER', () => {
      it('should have a status of 200', (done) => {
        chai.request(app).get('/api/v2/cars?status=available&manufacturer=Ford')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });
    });

    describe('GET ALL AVAILABLE CARS BY RANGE', () => {
      it('should have a status of 200', (done) => {
        chai.request(app).get('/api/v2/cars?status=available&minPrice=100&maxPrice=10000000000')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });
    });

    describe('GET ALL AVAILABLE CARS BY RANGE AND STATE', () => {
      it('should have a status of 200', (done) => {
        chai.request(app).get('/api/v2/cars?status=available&minPrice=100&maxPrice=10000000000&state=new')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });
    });

    describe('GET ALL AVAILABLE CARS BY MINPRICE AND STATE', () => {
      it('should have a status of 200', (done) => {
        chai.request(app).get('/api/v2/cars?status=available&minPrice=100&state=new')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });
    });

    describe('GET ALL AVAILABLE CARS BY MAXPRICE AND STATE', () => {
      it('should have a status of 200', (done) => {
        chai.request(app).get('/api/v2/cars?status=available&maxPrice=1000000000&state=new')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });
    });

    describe('GET ALL SOLD CARS', () => {
      it('should have a status of 404', (done) => {
        chai.request(app).get('/api/v2/cars?status=available&maxPrice=1')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.equal(404);
            done();
          });
      });
    });

    describe('GET ALL AVAILABLE CARS WITHOUT STATUS PARAM', () => {
      it('should have a status of 400', (done) => {
        chai.request(app).get('/api/v2/cars')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('GET ALL AVAILABLE CARS WITH INCORRECT STATUS PARAM', () => {
      it('should have a status of 400', (done) => {
        chai.request(app).get('/api/v2/cars?status=sold')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('GET ALL AVAILABLE CARS WITH INVALID MINPRICE PARAM', () => {
      it('should have a status of 400', (done) => {
        chai.request(app).get('/api/v2/cars?status=available&minPrice=we')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('GET ALL AVAILABLE CARS WITH INVALID MAXPRICE PARAM', () => {
      it('should have a status of 400', (done) => {
        chai.request(app).get('/api/v2/cars?status=available&maxPrice=we')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('GET ALL AVAILABLE CARS WITH INVALID STATE PARAM', () => {
      it('should have a status of 400', (done) => {
        chai.request(app).get('/api/v2/cars?status=available&state=we')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });
  });

  describe('GET CAR ROUTE', () => {
    describe('GET CAR WITH ID', () => {
      it('should have a status of 200', (done) => {
        chai.request(app).get(`/api/v2/cars/${carId}`)
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });
    });

    describe('GET CAR WITH ID', () => {
      it('should have a status of 404', (done) => {
        chai.request(app).get('/api/v2/cars/0')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.equal(404);
            done();
          });
      });
    });
  });

  describe('CAR ADMIN ROUTE', () => {
    describe('VIEW ALL CARS', () => {
      it('should have a status of 200', (done) => {
        chai.request(app).get('/api/v2/admin/cars')
          .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYXZlcGhlbm9tc0BnbWFpbC5jb20iLCJwYXNzIjoiJDJiJDEwJE9oTVlDSkhnSEhxbmZKcDBwSGlRTWVhcEZBc3YzL3RNdDRvTE0zcnFTdUY1ZVFYbnI5V0NLIiwiaWF0IjoxNTYxMjkyOTU3fQ.fnbdbjeC2I-CxNCq7dsV02STHJaYK1U7z292B1WUNBA')
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });
    });
  
    describe('DELETE CAR', () => {
      it('should have a status of 204', (done) => {
        chai.request(app).delete(`/api/v2/admin/cars/${carId}`)
          .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYXZlcGhlbm9tc0BnbWFpbC5jb20iLCJwYXNzIjoiJDJiJDEwJE9oTVlDSkhnSEhxbmZKcDBwSGlRTWVhcEZBc3YzL3RNdDRvTE0zcnFTdUY1ZVFYbnI5V0NLIiwiaWF0IjoxNTYxMjkyOTU3fQ.fnbdbjeC2I-CxNCq7dsV02STHJaYK1U7z292B1WUNBA')
          .end((err, res) => {
            expect(res.status).to.equal(204);
            done();
          });
      });
    });
  
    describe('DELETE CAR WITH INVALID ID', () => {
      it('should have a status of 404', (done) => {
        chai.request(app).delete('/api/v2/admin/cars/0')
          .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYXZlcGhlbm9tc0BnbWFpbC5jb20iLCJwYXNzIjoiJDJiJDEwJE9oTVlDSkhnSEhxbmZKcDBwSGlRTWVhcEZBc3YzL3RNdDRvTE0zcnFTdUY1ZVFYbnI5V0NLIiwiaWF0IjoxNTYxMjkyOTU3fQ.fnbdbjeC2I-CxNCq7dsV02STHJaYK1U7z292B1WUNBA')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
    });
  });
});
