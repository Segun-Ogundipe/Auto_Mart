/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('ORDER POST ROUTE', () => {
  describe('POST 401', () => {
    it('should have a status of 401', (done) => {
      chai.request(app).post('/api/v1/orders')
        .end((err, res) => {
          expect(res.body.status).to.equal(401);
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      chai.request(app).post('/api/v1/orders')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
        .send({})
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          done();
        });
    });
  });

  describe('POST 404', () => {
    it('should have a status of 404', (done) => {
      chai.request(app).post('/api/v1/orders')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
        .send({
          buyer: 3,
          carId: 1,
          amount: 120000,
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(404);
          done();
        });
    });
  });

  describe('POST 404', () => {
    it('should have a status of 404', (done) => {
      chai.request(app).post('/api/v1/orders')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
        .send({
          buyer: 1,
          carId: 3,
          amount: 120000,
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(404);
          done();
        });
    });
  });

  describe('POST 201', () => {
    it('should have a status of 201', (done) => {
      chai.request(app).post('/api/v1/orders')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
        .send({
          buyer: 1,
          carId: 2,
          amount: 120000,
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(201);
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      chai.request(app).post('/api/v1/orders')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
        .send({
          buyer: 1,
          amount: 120000,
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      chai.request(app).post('/api/v1/orders')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
        .send({
          buyer: 1,
          carId: 2,
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          done();
        });
    });
  });
});

describe('ORDER PATCH ROUTE', () => {
  describe('PATCH 401', () => {
    it('should have a status of 401', (done) => {
      chai.request(app).patch('/api/v1/orders/1/price')
        .end((err, res) => {
          expect(res.body.status).to.equal(401);
          done();
        });
    });
  });

  describe('PATCH 404', () => {
    it('should have a status of 404', (done) => {
      chai.request(app).patch('/api/v1/orders/3')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
        .send({
          price: 1000000,
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(404);
          done();
        });
    });
  });

  describe('PATCH 200', () => {
    it('should have a status of 200', (done) => {
      chai.request(app).patch('/api/v1/orders/2/price')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
        .send({
          price: 1000000,
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          done();
        });
    });
  });

  describe('DELETE 200', () => {
    it('should have a status of 200', (done) => {
      chai.request(app).delete('/api/v1/admin/cars/2')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          expect(err).to.equal(null);
          done();
        });
    });
  });

  describe('GET 200', () => {
    it('should have a status of 200', (done) => {
      chai.request(app).get('/api/v1/admin/cars')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2MDE1MDk0OX0.EollyOnzZIc9BA8Gq1Jk_XcC9y7ygWSZRUXB534Ik-c')
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.status).to.equal(200);
          expect(err).to.equal(null);
          done();
        });
    });
  });
});
