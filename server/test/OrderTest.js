/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

let orderId;

describe('ORDER ROUTE', () => {
  describe('CREATE ORDER', () => {
    describe('CREATE ORDER SUCCESSFULLY', () => {
      it('should have a status of 201', (done) => {
        const body = {
          buyer: 1,
          carId: 1,
          amount: 2650000.87,
        };

        chai.request(app).post('/api/v2/orders')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
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
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
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
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
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
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
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
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
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
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
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
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
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
          carId: 1,
          amount: 2650000.87,
        };

        chai.request(app).post('/api/v2/orders')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
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
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
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
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
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
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
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
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
          .send(body)
          .end((err, res) => {
            expect(res.body.status).to.equal(404);
            done();
          });
      });
    });
  });
});
