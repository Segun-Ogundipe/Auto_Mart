/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

let orderId;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYXZlcGhlbm9tc0BnbWFpbC5jb20iLCJwYXNzIjoiJDJiJDEwJE9oTVlDSkhnSEhxbmZKcDBwSGlRTWVhcEZBc3YzL3RNdDRvTE0zcnFTdUY1ZVFYbnI5V0NLIiwiaWF0IjoxNTYxMjkyOTU3fQ.fnbdbjeC2I-CxNCq7dsV02STHJaYK1U7z292B1WUNBA';

describe('ORDER ROUTE', () => {
  describe('CREATE ORDER', () => {
    describe('CREATE ORDER SUCCESSFULLY', () => {
      it('should have a status of 201', (done) => {
        const body = {
          buyer: 1,
          carId: 2,
          amount: 2650000.87,
        };

        chai.request(app).post('/api/v2/orders')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            orderId = res.body.data.id;
            expect(res.body.status).to.equal(201);
            done();
          });
      });
    });

    describe('CREATE ORDER WITH UNDEFINED BUYER FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          carId: 1,
          amount: 2650000.87,
        };

        chai.request(app).post('/api/v2/orders')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('CREATE ORDER WITH NON NUMBER BUYER', () => {
      it('should have a status of 400', (done) => {
        const body = {
          buyer: '1',
          carId: 1,
          amount: 2650000.87,
        };

        chai.request(app).post('/api/v2/orders')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('CREATE ORDER WITH UNDEFINED CARID FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          buyer: 1,
          amount: 2650000.87,
        };

        chai.request(app).post('/api/v2/orders')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('CREATE ORDER WITH NON NUMBER CARID', () => {
      it('should have a status of 400', (done) => {
        const body = {
          buyer: 1,
          carId: '1',
          amount: 2650000.87,
        };

        chai.request(app).post('/api/v2/orders')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('CREATE ORDER WITH UNDEFINED AMOUNT FIELD', () => {
      it('should have a status of 400', (done) => {
        const body = {
          carId: 1,
          buyer: 1,
        };

        chai.request(app).post('/api/v2/orders')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('CREATE ORDER WITH NON NUMBER AMOUNT', () => {
      it('should have a status of 400', (done) => {
        const body = {
          buyer: 1,
          carId: 1,
          amount: '2650000.87',
        };

        chai.request(app).post('/api/v2/orders')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('CREATE ORDER WITH NON EXISTENCE BUYER', () => {
      it('should have a status of 404', (done) => {
        const body = {
          buyer: 0,
          carId: 2,
          amount: 2650000.87,
        };

        chai.request(app).post('/api/v2/orders')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(404);
            done();
          });
      });
    });
  });

  describe('ORDER UPDATE ROUTE', () => {
    describe('UPDATE ORDER', () => {
      it('should have a status of 200', (done) => {
        const body = {
          price: 3650000.87,
        };

        chai.request(app).patch(`/api/v2/orders/${orderId}/price`)
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          });
      });
    });

    describe('UPDATE ORDER WITH UNDEFINED PRICE FIELD', () => {
      it('should have a status of 400', (done) => {
        chai.request(app).patch(`/api/v2/orders/${orderId}/price`)
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('UPDATE ORDER WITH A NON NUMBER PRICE', () => {
      it('should have a status of 400', (done) => {
        const body = {
          price: '3650000.87',
        };

        chai.request(app).patch(`/api/v2/orders/${orderId}/price`)
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            done();
          });
      });
    });

    describe('UPDATE ORDER WITH INVALID ID', () => {
      it('should have a status of 404', (done) => {
        const body = {
          price: 3650000.87,
        };

        chai.request(app).patch('/api/v2/orders/0/price')
          .set('Authorization', token)
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(404);
            done();
          });
      });
    });
  });
});
