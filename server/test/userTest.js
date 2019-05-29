/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('SIGNUP ROUTE', () => {
  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      chai.request(app).post('/api/v1/auth/signup')
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          done();
        });
    });
  });

  describe('POST 201', () => {
    it('should have a status of 201', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        first_name: 'Segun',
        last_name: 'Ogundipe',
        password: 'jhfdcthjk24r44',
        address: '12, ifelodun',
        gender: 'male',
        is_admin: true,
      };

      chai.request(app).post('/api/v1/auth/signup')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(201);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });
});

describe('SIGNIN ROUTE', () => {
  describe('POST 400', () => {
    it('should have a status of 400', (done) => {
      chai.request(app).post('/api/v1/auth/signin')
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          done();
        });
    });
  });

  describe('POST 422', () => {
    it('should have a status of 422', (done) => {
      const body = {
        email: 'davephen@gmail.com',
        password: 'jhfdcthjk24r44',
      };
      chai.request(app).post('/api/v1/auth/signin')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(422);
          done();
        });
    });
  });

  describe('POST 200', () => {
    it('should have a status of 200', (done) => {
      const body = {
        email: 'davephenom@gmail.com',
        password: 'jhfdcthjk24r44',
      };

      chai.request(app).post('/api/v1/auth/signin')
        .send(body)
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });
});
