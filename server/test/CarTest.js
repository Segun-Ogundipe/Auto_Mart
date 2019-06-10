/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('CAR ROUTE', () => {
  describe('POST 401', () => {
    it('should have a status of 401', (done) => {
      chai.request(app).post('/api/v1/cars')
        .end((err, res) => {
          expect(res.body.status).to.equal(401);
          done();
        });
    });
  });

  describe('404', () => {
    it('should have a status of 404', (done) => {
      chai.request(app).post('/')
        .end((err, res) => {
          expect(res.body.status).to.equal(404);
          done();
        });
    });
  });

  describe('POST 201', () => {
    it('should have a status of 201', (done) => {
      chai.request(app).post('/api/v1/cars')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU2MDEyNjEyMX0.t2s_XHo67nrPwAPaDjDrxo8ZWoS4LJYLpByKDkkLQ5s')
        .send({
          owner: 1,
          state: 'new',
          price: 5000,
          manufacturer: 'BMW',
          model: 'v9',
          bodyType: 'trucks',
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(201);
          expect(res.body).to.be.a('object');
          expect(err).to.equal(null);
          done();
        });
    }).timeout(0);
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      chai.request(app).post('/api/v1/cars')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU2MDEyNjEyMX0.t2s_XHo67nrPwAPaDjDrxo8ZWoS4LJYLpByKDkkLQ5s')
        .send({
          state: 'new',
          price: 5000,
          manufacturer: 'BMW',
          model: 'v9',
          bodyType: 'trucks',
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(err).to.equal(null);
          done();
        });
    }).timeout(0);
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      chai.request(app).post('/api/v1/cars')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU2MDEyNjEyMX0.t2s_XHo67nrPwAPaDjDrxo8ZWoS4LJYLpByKDkkLQ5s')
        .send({
          owner: 1,
          price: 5000,
          manufacturer: 'BMW',
          model: 'v9',
          bodyType: 'trucks',
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(err).to.equal(null);
          done();
        });
    }).timeout(0);
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      chai.request(app).post('/api/v1/cars')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU2MDEyNjEyMX0.t2s_XHo67nrPwAPaDjDrxo8ZWoS4LJYLpByKDkkLQ5s')
        .send({
          owner: 1,
          state: 'new',
          manufacturer: 'BMW',
          model: 'v9',
          bodyType: 'trucks',
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(err).to.equal(null);
          done();
        });
    }).timeout(0);
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      chai.request(app).post('/api/v1/cars')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU2MDEyNjEyMX0.t2s_XHo67nrPwAPaDjDrxo8ZWoS4LJYLpByKDkkLQ5s')
        .send({
          owner: 1,
          state: 'new',
          price: 5000,
          model: 'v9',
          bodyType: 'trucks',
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(err).to.equal(null);
          done();
        });
    }).timeout(0);
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      chai.request(app).post('/api/v1/cars')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU2MDEyNjEyMX0.t2s_XHo67nrPwAPaDjDrxo8ZWoS4LJYLpByKDkkLQ5s')
        .send({
          owner: 1,
          state: 'new',
          price: 5000,
          manufacturer: 'BMW',
          bodyType: 'trucks',
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(err).to.equal(null);
          done();
        });
    }).timeout(0);
  });

  describe('POST 401', () => {
    it('should have a status of 401', (done) => {
      chai.request(app).post('/api/v1/cars')
        .set('Authorization', 'Bearer JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8')
        .send({
          owner: 1,
          state: 'new',
          price: 5000,
          manufacturer: 'BMW',
          model: 'v9',
          bodyType: 'trucks',
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(401);
          expect(res.body).to.be.a('object');
          expect(err).to.equal(null);
          done();
        });
    }).timeout(0);
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      chai.request(app).post('/api/v1/cars')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU2MDEyNjEyMX0.t2s_XHo67nrPwAPaDjDrxo8ZWoS4LJYLpByKDkkLQ5s')
        .send({
          owner: 1,
          state: 'new',
          price: 5000,
          manufacturer: 'BMW',
          model: 'v9',
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(err).to.equal(null);
          done();
        });
    }).timeout(0);
  });

  describe('POST 404', () => {
    it('should have a status of 404', (done) => {
      chai.request(app).post('/api/v1/cars')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU2MDEyNjEyMX0.t2s_XHo67nrPwAPaDjDrxo8ZWoS4LJYLpByKDkkLQ5s')
        .send({
          owner: 2,
          state: 'new',
          price: 5000,
          manufacturer: 'BMW',
          model: 'v9',
          bodyType: 'trucks',
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(404);
          expect(err).to.equal(null);
          done();
        });
    }).timeout(0);
  });

  describe('PATCH 401', () => {
    it('should have a status of 401', (done) => {
      chai.request(app).patch('/api/v1/cars/1/price')
        .end((err, res) => {
          expect(res.body.status).to.equal(401);
          done();
        });
    });
  });

  describe('PATCH 200', () => {
    it('should have a status of 200', (done) => {
      chai.request(app).patch('/api/v1/cars/1/price')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU2MDEyNjEyMX0.t2s_XHo67nrPwAPaDjDrxo8ZWoS4LJYLpByKDkkLQ5s')
        .send({
          price: 200000,
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          expect(err).to.equal(null);
          done();
        });
    });
  });

  describe('PATCH 200', () => {
    it('should have a status of 200', (done) => {
      chai.request(app).patch('/api/v1/cars/1/status')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU2MDEyNjEyMX0.t2s_XHo67nrPwAPaDjDrxo8ZWoS4LJYLpByKDkkLQ5s')
        .send({
          status: 'available',
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          expect(err).to.equal(null);
          done();
        });
    });
  });

  describe('PATCH 404', () => {
    it('should have a status of 404', (done) => {
      chai.request(app).patch('/api/v1/cars/3/status')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU2MDEyNjEyMX0.t2s_XHo67nrPwAPaDjDrxo8ZWoS4LJYLpByKDkkLQ5s')
        .send({
          status: 'available',
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(404);
          expect(err).to.equal(null);
          done();
        });
    });
  });

  describe('GET 404', () => {
    it('should have a status of 404', (done) => {
      chai.request(app).get('/api/v1/cars/3')
        .end((err, res) => {
          expect(res.body.status).to.equal(404);
          expect(err).to.equal(null);
          done();
        });
    });
  });

  describe('GET 200', () => {
    it('should have a status of 200', (done) => {
      chai.request(app).get('/api/v1/cars/1')
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.status).to.equal(200);
          expect(err).to.equal(null);
          done();
        });
    });
  });

  describe('GET 200', () => {
    it('should have a status of 200', (done) => {
      chai.request(app).get('/api/v1/cars?status=available')
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          expect(err).to.equal(null);
          done();
        });
    });
  });

  describe('GET 200', () => {
    it('should have a status of 200', (done) => {
      chai.request(app).get('/api/v1/cars?status=available&minPrice=1000&maxPrice=2000000')
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          expect(err).to.equal(null);
          done();
        });
    });
  });

  describe('DELETE 401', () => {
    it('should have a status of 401', (done) => {
      chai.request(app).delete('/api/v1/admin/cars/1')
        .end((err, res) => {
          expect(res.body.status).to.equal(401);
          done();
        });
    });
  });

  describe('DELETE 404', () => {
    it('should have a status of 404', (done) => {
      chai.request(app).delete('/api/v1/admin/cars/3')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU2MDEyNjEyMX0.t2s_XHo67nrPwAPaDjDrxo8ZWoS4LJYLpByKDkkLQ5s')
        .end((err, res) => {
          expect(res.body.status).to.equal(404);
          expect(err).to.equal(null);
          done();
        });
    });
  });

  describe('DELETE 200', () => {
    it('should have a status of 200', (done) => {
      chai.request(app).delete('/api/v1/cars/1')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU2MDEyNjEyMX0.t2s_XHo67nrPwAPaDjDrxo8ZWoS4LJYLpByKDkkLQ5s')
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          expect(err).to.equal(null);
          done();
        });
    });
  });

  describe('GET 401', () => {
    it('should have a status of 401', (done) => {
      chai.request(app).get('/api/v1/admin/cars')
        .end((err, res) => {
          expect(res.body.status).to.equal(401);
          done();
        });
    });
  });

  describe('GET 200', () => {
    it('should have a status of 200', (done) => {
      chai.request(app).get('/api/v1/admin/cars')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU2MDEyNjEyMX0.t2s_XHo67nrPwAPaDjDrxo8ZWoS4LJYLpByKDkkLQ5s')
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          expect(err).to.equal(null);
          done();
        });
    });
  });
});
