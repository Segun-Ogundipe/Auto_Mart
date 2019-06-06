/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('ORDER POST ROUTE', () => {
  describe('POST 401', () => {
    it('should have a status of 401', (done) => {
      chai.request(app).post('/api/v1/order/')
        .end((err, res) => {
          expect(res.body.status).to.equal(401);
          done();
        });
    });
  });

  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      chai.request(app).post('/api/v1/order/')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8')
        .send({})
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          done();
        });
    });
  });

  describe('POST 404', () => {
    it('should have a status of 404', (done) => {
      chai.request(app).post('/api/v1/order/')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8')
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
      chai.request(app).post('/api/v1/order/')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8')
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
      chai.request(app).post('/api/v1/order/')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8')
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
});

describe('ORDER PATCH ROUTE', () => {
  describe('PATCH 401', () => {
    it('should have a status of 401', (done) => {
      chai.request(app).patch('/api/v1/order/1')
        .end((err, res) => {
          expect(res.body.status).to.equal(401);
          done();
        });
    });
  });

  describe('PATCH 404', () => {
    it('should have a status of 404', (done) => {
      chai.request(app).patch('/api/v1/order/3')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8')
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
      chai.request(app).patch('/api/v1/order/2')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdmVwaGVub21AZ21haWwuY29tIiwiaWF0IjoxNTU5NzgwMzE2fQ.TdQgS2gNpIJKQoZT3e72eg_gSGTGjiVOB1FIfTjbSp8')
        .send({
          price: 1000000,
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          done();
        });
    });
  });
});
